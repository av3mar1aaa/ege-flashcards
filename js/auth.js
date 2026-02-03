/**
 * Модуль авторизации Firebase
 * Google Sign-In + Email/Password
 * @module Auth
 */

const Auth = {
    /** @type {Object|null} Текущий пользователь Firebase */
    currentUser: null,

    /** @type {boolean} Firebase инициализирован */
    initialized: false,

    /**
     * Инициализирует авторизацию
     */
    init() {
        if (!initFirebase()) {
            this.updateUI(null);
            return;
        }

        this.initialized = true;

        firebase.auth().onAuthStateChanged((user) => {
            this.currentUser = user;
            this.updateUI(user);

            if (user) {
                CloudStorage.syncOnLogin();
            }
        });
    },

    /**
     * Вход через Google
     */
    async loginWithGoogle() {
        if (!this.initialized) {
            alert('Firebase не настроен. Заполните конфиг в js/firebase-config.js');
            return;
        }

        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            this.closeLoginOverlay();
        } catch (e) {
            if (e.code !== 'auth/popup-closed-by-user') {
                this.showError(e.message);
            }
        }
    },

    /**
     * Вход через Email/Password
     * @param {string} email
     * @param {string} password
     */
    async loginWithEmail(email, password) {
        if (!this.initialized) {
            alert('Firebase не настроен. Заполните конфиг в js/firebase-config.js');
            return;
        }

        if (!email || !password) {
            this.showError('Введите email и пароль');
            return;
        }

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            this.closeLoginOverlay();
        } catch (e) {
            if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
                this.showError('Неверный email или пароль');
            } else if (e.code === 'auth/invalid-email') {
                this.showError('Некорректный email');
            } else {
                this.showError(e.message);
            }
        }
    },

    /**
     * Регистрация через Email/Password
     * @param {string} email
     * @param {string} password
     */
    async registerWithEmail(email, password) {
        if (!this.initialized) {
            alert('Firebase не настроен. Заполните конфиг в js/firebase-config.js');
            return;
        }

        if (!email || !password) {
            this.showError('Введите email и пароль');
            return;
        }

        if (password.length < 6) {
            this.showError('Пароль должен быть не менее 6 символов');
            return;
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            this.closeLoginOverlay();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                this.showError('Этот email уже зарегистрирован');
            } else if (e.code === 'auth/weak-password') {
                this.showError('Слишком простой пароль');
            } else if (e.code === 'auth/invalid-email') {
                this.showError('Некорректный email');
            } else {
                this.showError(e.message);
            }
        }
    },

    /**
     * Выход из аккаунта
     */
    async logout() {
        if (!this.initialized) return;

        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.error('Ошибка выхода:', e);
        }
    },

    /**
     * Обновляет UI в зависимости от состояния авторизации
     * @param {Object|null} user
     */
    updateUI(user) {
        const loginBtn = document.getElementById('auth-login-btn');
        const logoutSection = document.getElementById('auth-logged-in');
        const userEmail = document.getElementById('auth-user-email');
        const syncStatus = document.getElementById('auth-sync-status');

        if (!loginBtn || !logoutSection) return;

        if (user) {
            loginBtn.classList.add('hidden');
            logoutSection.classList.remove('hidden');
            if (userEmail) {
                userEmail.textContent = user.email || user.displayName || 'Пользователь';
            }
            if (syncStatus) {
                syncStatus.textContent = 'Синхронизировано';
            }
        } else {
            loginBtn.classList.remove('hidden');
            logoutSection.classList.add('hidden');
        }

        // Обновить подсказку на главной
        const authHint = document.getElementById('auth-hint');
        if (authHint) {
            authHint.style.display = user ? 'none' : 'block';
        }
    },

    /**
     * Открывает overlay входа
     */
    openLoginOverlay() {
        const overlay = document.getElementById('login-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            this.clearError();
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        }
    },

    /**
     * Закрывает overlay входа
     */
    closeLoginOverlay() {
        const overlay = document.getElementById('login-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            this.clearError();
        }
    },

    /**
     * Показывает ошибку в login overlay
     * @param {string} message
     */
    showError(message) {
        const errorEl = document.getElementById('login-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
        }
    },

    /**
     * Скрывает ошибку
     */
    clearError() {
        const errorEl = document.getElementById('login-error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
        }
    },

    /**
     * Проверяет, авторизован ли пользователь
     * @returns {boolean}
     */
    isLoggedIn() {
        return this.initialized && this.currentUser !== null;
    },

    /**
     * Возвращает UID текущего пользователя
     * @returns {string|null}
     */
    getUID() {
        return this.currentUser ? this.currentUser.uid : null;
    }
};
