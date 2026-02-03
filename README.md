# EGE Flashcards / ЕГЭ Карточки

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Deploy](https://github.com/ave/ege-flashcards/actions/workflows/deploy.yml/badge.svg)](https://github.com/ave/ege-flashcards/actions/workflows/deploy.yml)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?logo=pwa&logoColor=white)

> Интерактивное веб-приложение для подготовки к ЕГЭ с использованием метода интервального повторения (SM-2).
>
> Interactive web app for Russian EGE exam preparation using spaced repetition (SM-2 algorithm).

**[Live Demo](https://ave.github.io/ege-flashcards)** — попробуйте прямо сейчас

<!--
![Main Screen](docs/screenshots/main.png)
-->

---

## Возможности

### Предметы

- **Математика** — тригонометрия (61 формула), алгебра, планиметрия, стереометрия
- **Русский язык** — теория по 26 заданиям ЕГЭ, материалы Рустьюторс, литература для сочинений
- **Информатика** — справочник по 27 заданиям ЕГЭ, формулы, шаблоны кода Python

### Режимы обучения

- **Карточки** — интервальное повторение по алгоритму SM-2
- **Тренажёр** — практика с подсказками и объяснениями
- **Экзамен** — симуляция ЕГЭ с разбором результатов

### Инструменты

- **Калькулятор** — обычный и инженерный (тригонометрия, логарифмы)
- **Таймер Помодоро** — управление учебными сессиями
- **Режим фокуса** — дыхательные упражнения, цитаты, фоновая музыка
- **Редактор кода** — Python IDE с подсветкой синтаксиса

### Прочее

- **Тёмная тема** с автоопределением системных настроек
- **PWA** — установка на телефон, офлайн-доступ
- **Облачная синхронизация** — Firebase Auth + Firestore
- **Глобальный поиск** (Ctrl+K) по всем разделам
- **Статистика** — дашборд с тепловой картой, графиками, прогрессом
- **Адаптивный дизайн** — мобильные, планшеты, десктоп

---

## Быстрый старт

```bash
git clone https://github.com/ave/ege-flashcards.git
cd ege-flashcards
npm install
npm run dev
```

Или откройте [Live Demo](https://ave.github.io/ege-flashcards) в браузере.

### Разработка стилей

```bash
npm run watch:css   # авто-сборка SCSS при изменениях
npm run build:css   # разовая сборка
```

---

## Технологии

| Технология | Описание |
|------------|----------|
| **JavaScript ES6+** | Vanilla JS, без фреймворков |
| **Sass** | Модульная система стилей (30 SCSS-файлов) |
| **KaTeX** | Рендеринг LaTeX-формул |
| **Firebase** | Аутентификация и облачное хранилище |
| **Service Worker** | Офлайн-режим и кеширование |
| **GitHub Actions** | CI/CD деплой на GitHub Pages |

---

## Структура проекта

```
ege-flashcards/
├── index.html              # Одностраничное приложение
├── sw.js                   # Service Worker (PWA)
├── manifest.json           # PWA-манифест
├── css/
│   ├── style.css           # Скомпилированные стили
│   └── src/                # SCSS-исходники
│       ├── main.scss       # Точка входа
│       ├── _variables.scss # Переменные, reset
│       ├── _base.scss      # Базовые стили
│       ├── _cards.scss     # Карточки
│       ├── _settings.scss  # Настройки
│       ├── _responsive.scss# Мобильная адаптация
│       └── ...             # Ещё 25 модулей
├── js/
│   ├── app.js              # Главный модуль приложения
│   ├── sm2.js              # Алгоритм SM-2
│   ├── storage.js          # LocalStorage
│   ├── auth.js             # Авторизация
│   ├── cloud-storage.js    # Firebase Firestore
│   ├── trainer.js          # Тренажёр
│   ├── exam.js             # Режим экзамена
│   ├── calculator.js       # Калькулятор
│   ├── pomodoro.js         # Таймер Помодоро
│   ├── focus.js            # Режим фокуса
│   ├── ide.js              # Редактор кода
│   ├── search.js           # Глобальный поиск
│   ├── dashboard.js        # Дашборд статистики
│   ├── cards.js            # Данные тригонометрии
│   ├── russian-data.js     # Теория русского языка
│   ├── cs-data.js          # Справочник информатики
│   ├── ege-math-data.js    # ЕГЭ математика
│   ├── ege-cs-data.js      # ЕГЭ информатика
│   └── ...                 # Остальные модули
├── .github/
│   └── workflows/
│       └── deploy.yml      # Деплой на GitHub Pages
├── package.json
├── LICENSE
└── README.md
```

---

## Алгоритм SM-2

Приложение использует алгоритм **SuperMemo 2** для оптимального запоминания:

1. После каждой карточки вы оцениваете сложность (1–4)
2. Алгоритм рассчитывает оптимальный интервал повторения
3. Карточки сортируются по приоритету
4. Сложные показываются чаще, лёгкие — реже

---

## Вклад в проект

Pull Request'ы приветствуются!

1. Форкните репозиторий
2. Создайте ветку (`git checkout -b feature/my-feature`)
3. Закоммитьте (`git commit -m 'feat: add my feature'`)
4. Пуш (`git push origin feature/my-feature`)
5. Откройте Pull Request

---

## Лицензия

MIT License. См. [LICENSE](LICENSE).

---

<p align="center">
  <b>ave</b> — <a href="https://github.com/ave">@ave</a>
</p>
