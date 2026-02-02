# EGE Flashcards / ЕГЭ Карточки

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> 🇷🇺 Интерактивное веб-приложение для подготовки к ЕГЭ с использованием метода интервального повторения (SM-2)
>
> 🇬🇧 Interactive web application for Russian EGE exam preparation using spaced repetition (SM-2 algorithm)

## 🌐 Demo / Демо

[**Live Demo**](https://ave.github.io/ege-flashcards) ← Попробуйте прямо сейчас!

<!--
![Main Screen](docs/screenshots/main.png)
-->

---

## ✨ Возможности / Features

### 🇷🇺 Русский

- 📐 **Тригонометрия** — 61 формула с интерактивными карточками
- 📝 **Русский язык** — полная теория по 26 заданиям ЕГЭ + материалы Рустьюторс
- 💻 **Информатика** — справочник по 27 заданиям ЕГЭ
- 🧠 **Алгоритм SM-2** — научно обоснованный метод интервального повторения
- 📊 **Отслеживание прогресса** — сохранение в браузере
- 📱 **Адаптивный дизайн** — работает на любых устройствах
- ⚡ **Без установки** — просто откройте в браузере

### 🇬🇧 English

- 📐 **Trigonometry** — 61 formulas with interactive flashcards
- 📝 **Russian Language** — complete theory for 26 EGE tasks
- 💻 **Computer Science** — reference for 27 EGE tasks
- 🧠 **SM-2 Algorithm** — scientifically proven spaced repetition method
- 📊 **Progress Tracking** — saves to browser localStorage
- 📱 **Responsive Design** — works on any device
- ⚡ **No Installation** — just open in browser

---

## 🚀 Быстрый старт / Quick Start

### Локально / Locally

```bash
# Клонируйте репозиторий / Clone the repository
git clone https://github.com/ave/ege-flashcards.git

# Перейдите в папку / Navigate to folder
cd ege-flashcards

# Откройте index.html в браузере или запустите локальный сервер:
# Open index.html in browser or start local server:
npx serve .
```

### Онлайн / Online

Просто перейдите на / Just go to: [ave.github.io/ege-flashcards](https://ave.github.io/ege-flashcards)

---

## 🛠 Технологии / Tech Stack

| Технология | Описание |
|------------|----------|
| **JavaScript** | Vanilla ES6+ (без фреймворков) |
| **CSS3** | CSS Variables, Flexbox, Grid |
| **KaTeX** | Рендеринг математических формул LaTeX |
| **SM-2** | Алгоритм интервального повторения SuperMemo |
| **LocalStorage** | Локальное хранение прогресса |

---

## 📁 Структура проекта / Project Structure

```
ege-flashcards/
├── index.html          # Главная страница
├── css/
│   └── style.css       # Стили приложения
├── js/
│   ├── app.js          # Основная логика приложения
│   ├── cards.js        # Данные карточек тригонометрии
│   ├── russian-data.js # Теория русского языка (26 заданий)
│   ├── cs-data.js      # Справочник информатики (27 заданий)
│   ├── sm2.js          # Алгоритм SM-2
│   ├── storage.js      # Работа с LocalStorage
│   └── decorations.js  # Декоративные элементы фона
├── docs/
│   └── screenshots/    # Скриншоты для README
├── .github/
│   └── workflows/      # GitHub Actions
├── package.json
├── LICENSE
└── README.md
```

---

## 📖 Как это работает / How It Works

### Алгоритм SM-2

Приложение использует алгоритм **SuperMemo 2 (SM-2)** для оптимального запоминания:

1. После каждой карточки вы оцениваете сложность (1-4)
2. Алгоритм рассчитывает оптимальный интервал повторения
3. Карточки автоматически сортируются по приоритету
4. Сложные карточки показываются чаще, лёгкие — реже

---

## 🗺 Roadmap

- [ ] 📐 Добавить раздел геометрии
- [ ] ➕ Добавить раздел алгебры
- [ ] 💾 Экспорт/импорт прогресса
- [ ] 📱 PWA поддержка (офлайн-режим)
- [ ] 🌙 Тёмная тема
- [ ] 📊 Статистика обучения

---

## 🤝 Вклад / Contributing

Приветствуются Pull Request'ы! / Pull requests are welcome!

1. Форкните репозиторий / Fork the repo
2. Создайте ветку / Create branch (`git checkout -b feature/amazing-feature`)
3. Закоммитьте / Commit (`git commit -m 'feat: add amazing feature'`)
4. Пуш / Push (`git push origin feature/amazing-feature`)
5. Откройте PR / Open a Pull Request

---

## 📄 Лицензия / License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

Распространяется под лицензией MIT. См. файл [LICENSE](LICENSE).

---

## 👤 Автор / Author

**ave** — [@ave](https://github.com/ave)

---

<p align="center">
  Сделано с ❤️ для подготовки к ЕГЭ<br>
  Made with ❤️ for EGE exam preparation
</p>
