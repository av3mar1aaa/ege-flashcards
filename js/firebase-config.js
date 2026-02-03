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
    apiKey: "AIzaSyDrx6MQQAEEMzm7LaHpLj9c4nIsC39NHnU",
    authDomain: "ege-ave.firebaseapp.com",
    projectId: "ege-ave",
    storageBucket: "ege-ave.firebasestorage.app",
    messagingSenderId: "424888407072",
    appId: "1:424888407072:web:4f43480047bf029279d845"
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
