/**
 * Синхронизация данных с Firestore
 * Offline-first: localStorage — основное хранилище, Firestore — облачный бэкап
 * @module CloudStorage
 */

const CloudStorage = {
    /** @type {boolean} Идёт ли синхронизация */
    _syncing: false,

    /** @type {number} Таймер для debounce */
    _syncTimer: null,

    /**
     * Сохраняет все данные в Firestore
     * Вызывается автоматически при изменении данных (с debounce)
     */
    saveToCloud() {
        if (!Auth.isLoggedIn()) return;

        // Debounce: не чаще раза в 3 секунды
        clearTimeout(this._syncTimer);
        this._syncTimer = setTimeout(() => {
            this._doSave();
        }, 3000);
    },

    /**
     * Немедленное сохранение в Firestore
     */
    async _doSave() {
        if (!Auth.isLoggedIn() || this._syncing) return;

        this._syncing = true;
        try {
            const db = firebase.firestore();
            const uid = Auth.getUID();

            await db.collection('users').doc(uid).set({
                cardStates: Storage.loadCardStates() || [],
                preferences: Storage.loadPreferences(),
                activityLog: Stats.getLog(),
                lastSync: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            this._updateSyncStatus('Синхронизировано');
        } catch (e) {
            console.error('Ошибка сохранения в облако:', e);
            this._updateSyncStatus('Ошибка синхр.');
        } finally {
            this._syncing = false;
        }
    },

    /**
     * Загружает данные из Firestore
     * @returns {Object|null} Данные из облака
     */
    async loadFromCloud() {
        if (!Auth.isLoggedIn()) return null;

        try {
            const db = firebase.firestore();
            const uid = Auth.getUID();
            const doc = await db.collection('users').doc(uid).get();

            if (doc.exists) {
                return doc.data();
            }
        } catch (e) {
            console.error('Ошибка загрузки из облака:', e);
        }
        return null;
    },

    /**
     * Синхронизация при входе в аккаунт
     * Стратегия: сравниваем данные и берём более полные
     */
    async syncOnLogin() {
        if (!Auth.isLoggedIn()) return;

        this._updateSyncStatus('Синхронизация...');

        const cloudData = await this.loadFromCloud();

        if (!cloudData) {
            // В облаке пусто — выгружаем локальные данные
            await this._doSave();
            return;
        }

        // Сравниваем по количеству данных и свежести
        const localLog = Stats.getLog();
        const cloudLog = cloudData.activityLog || [];

        const localTotal = localLog.reduce((s, e) => s + e.correct + e.wrong, 0);
        const cloudTotal = cloudLog.reduce((s, e) => s + e.correct + e.wrong, 0);

        if (cloudTotal > localTotal) {
            // Облачные данные более полные — восстанавливаем
            this._restoreFromCloud(cloudData);
        } else if (localTotal > cloudTotal) {
            // Локальные данные более полные — выгружаем
            await this._doSave();
        } else {
            // Данные равны, объединяем activity log
            this._mergeActivityLogs(localLog, cloudLog);
            await this._doSave();
        }

        this._updateSyncStatus('Синхронизировано');
    },

    /**
     * Восстанавливает данные из облака в localStorage
     * @param {Object} cloudData
     */
    _restoreFromCloud(cloudData) {
        if (cloudData.cardStates && Array.isArray(cloudData.cardStates)) {
            Storage.saveCardStates(cloudData.cardStates);
        }
        if (cloudData.preferences && typeof cloudData.preferences === 'object') {
            Object.entries(cloudData.preferences).forEach(([key, value]) => {
                Storage.savePreference(key, value);
            });
        }
        if (cloudData.activityLog && Array.isArray(cloudData.activityLog)) {
            localStorage.setItem('ege_activity_log', JSON.stringify(cloudData.activityLog));
        }

        // Перезагружаем данные в приложении
        App.loadData();
        App.updateStats();
        App.initTheme();
    },

    /**
     * Объединяет два activity log
     * @param {Array} local
     * @param {Array} cloud
     */
    _mergeActivityLogs(local, cloud) {
        const merged = {};

        // Индексируем по дате
        [...local, ...cloud].forEach(entry => {
            const existing = merged[entry.date];
            if (!existing || (entry.correct + entry.wrong) > (existing.correct + existing.wrong)) {
                merged[entry.date] = entry;
            }
        });

        const result = Object.values(merged).sort((a, b) => a.date.localeCompare(b.date));
        localStorage.setItem('ege_activity_log', JSON.stringify(result));
    },

    /**
     * Удаляет данные пользователя из Firestore
     */
    async deleteCloudData() {
        if (!Auth.isLoggedIn()) return;

        try {
            const db = firebase.firestore();
            const uid = Auth.getUID();
            await db.collection('users').doc(uid).delete();
        } catch (e) {
            console.error('Ошибка удаления облачных данных:', e);
        }
    },

    /**
     * Обновляет статус синхронизации в UI
     * @param {string} status
     */
    _updateSyncStatus(status) {
        const el = document.getElementById('auth-sync-status');
        if (el) el.textContent = status;
    }
};
