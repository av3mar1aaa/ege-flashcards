/**
 * Конфигурация Firebase
 *
 * ИНСТРУКЦИЯ:
 * 1. Создайте проект на https://console.firebase.google.com
 * 2. Включите Authentication → Sign-in method → Google + Email/Password
 * 3. Создайте Firestore Database (production mode)
 * 4. Перейдите в Project Settings → General → Your apps → Web app
 * 5. Скопируйте конфиг ниже
 * 6. В Authentication → Settings → Authorized domains добавьте ваш домен GitHub Pages
 *
 * @module FirebaseConfig
 */

const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

/**
 * Проверяет, настроен ли Firebase
 * @returns {boolean}
 */
function isFirebaseConfigured() {
    return FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY' &&
           typeof firebase !== 'undefined';
}

/**
 * Инициализирует Firebase, если настроен
 */
function initFirebase() {
    if (!isFirebaseConfigured()) return false;

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }
        return true;
    } catch (e) {
        console.error('Ошибка инициализации Firebase:', e);
        return false;
    }
}
