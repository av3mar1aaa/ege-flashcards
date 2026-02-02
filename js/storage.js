/**
 * Модуль для работы с LocalStorage
 * Сохраняет и загружает прогресс обучения пользователя
 * @module Storage
 */

/** @type {string} Ключ для хранения данных в LocalStorage */
const STORAGE_KEY = 'trig_flashcards_progress';

const Storage = {
    /**
     * Загружает все состояния карточек из LocalStorage
     * @returns {CardState[]|null} Массив состояний или null при ошибке
     */
    loadCardStates() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
        return null;
    },

    /**
     * Сохраняет все состояния карточек в LocalStorage
     * @param {CardState[]} cardStates - Массив состояний для сохранения
     * @returns {boolean} true при успехе, false при ошибке
     */
    saveCardStates(cardStates) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cardStates));
            return true;
        } catch (e) {
            console.error('Ошибка сохранения данных:', e);
            return false;
        }
    },

    /**
     * Инициализирует состояния для всех карточек
     * Загружает существующие или создаёт новые
     * @returns {CardState[]} Массив состояний карточек
     */
    initializeCardStates() {
        const existing = this.loadCardStates();

        if (existing && existing.length > 0) {
            // Проверяем, есть ли новые карточки
            const existingIds = new Set(existing.map(s => s.cardId));
            const newStates = [];

            for (const card of TRIG_CARDS) {
                if (!existingIds.has(card.id)) {
                    newStates.push(SM2.createCardState(card.id));
                }
            }

            if (newStates.length > 0) {
                const updated = [...existing, ...newStates];
                this.saveCardStates(updated);
                return updated;
            }

            return existing;
        }

        // Создаём новые состояния для всех карточек
        const newStates = TRIG_CARDS.map(card => SM2.createCardState(card.id));
        this.saveCardStates(newStates);
        return newStates;
    },

    /**
     * Обновляет состояние одной карточки
     * @param {CardState} cardState - Обновлённое состояние карточки
     */
    updateCardState(cardState) {
        const allStates = this.loadCardStates() || [];
        const index = allStates.findIndex(s => s.cardId === cardState.cardId);

        if (index >= 0) {
            allStates[index] = cardState;
        } else {
            allStates.push(cardState);
        }

        this.saveCardStates(allStates);
    },

    /**
     * Сбрасывает весь прогресс обучения
     * @returns {CardState[]} Новый массив состояний карточек
     */
    resetProgress() {
        localStorage.removeItem(STORAGE_KEY);
        return this.initializeCardStates();
    },

    /**
     * Экспортирует данные для резервного копирования
     * @returns {string} JSON-строка с данными
     */
    exportData() {
        const data = this.loadCardStates();
        return JSON.stringify(data, null, 2);
    },

    /**
     * Импортирует данные из JSON-строки
     * @param {string} jsonString - JSON-строка с данными
     * @returns {boolean} true при успехе, false при ошибке
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (Array.isArray(data)) {
                this.saveCardStates(data);
                return true;
            }
        } catch (e) {
            console.error('Ошибка импорта данных:', e);
        }
        return false;
    }
};
