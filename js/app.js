/**
 * Главный модуль приложения EGE Flashcards
 * Управляет навигацией, состоянием и взаимодействием с пользователем
 * @module App
 */

const App = {
    /** @type {'formula-to-name'|'name-to-formula'} Текущий режим обучения */
    mode: 'formula-to-name',
    cardStates: [],
    dueCards: [],
    currentIndex: 0,
    currentCard: null,
    currentCardState: null,
    wasCorrect: false,
    userAnswer: '',

    // Статистика сессии
    sessionCorrect: 0,
    sessionWrong: 0,

    /** @type {Object.<string, HTMLElement>} Кэш экранов */
    screens: {},

    /** @type {Object.<string, HTMLElement>} Кэш DOM-элементов */
    elements: {},

    /**
     * Инициализирует приложение
     * Кэширует DOM-элементы, привязывает события, загружает данные
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.bindRussianEvents();
        this.bindCSEvents();
        this.loadData();
        this.updateStats();

        // Показать главный экран с декорациями
        this.showScreen('main');
    },

    // Для навигации по пустым экранам
    emptyBackTo: 'main',
    emptyDecorationType: 'main',

    // Кэшировать DOM элементы
    cacheElements() {
        this.screens = {
            main: document.getElementById('main-screen'),
            math: document.getElementById('math-screen'),
            empty: document.getElementById('empty-screen'),
            home: document.getElementById('home-screen'),
            formulas: document.getElementById('formulas-screen'),
            card: document.getElementById('card-screen'),
            result: document.getElementById('result-screen'),
            complete: document.getElementById('complete-screen'),
            // Русский язык
            russian: document.getElementById('russian-screen'),
            russianEge: document.getElementById('russian-ege-screen'),
            russianTask: document.getElementById('russian-task-screen'),
            russianTheory: document.getElementById('russian-theory-screen'),
            russianCard: document.getElementById('russian-card-screen'),
            russianResult: document.getElementById('russian-result-screen'),
            russianComplete: document.getElementById('russian-complete-screen'),
            // Литература для сочинений
            literature: document.getElementById('literature-screen'),
            literatureWork: document.getElementById('literature-work-screen'),
            // Информатика
            cs: document.getElementById('cs-screen'),
            csTask: document.getElementById('cs-task-screen'),
            // Алгебра
            algebra: document.getElementById('algebra-screen'),
            algebraFormulas: document.getElementById('algebra-formulas-screen'),
            // Геометрия
            geometry: document.getElementById('geometry-screen'),
            planimetry: document.getElementById('planimetry-screen'),
            stereometry: document.getElementById('stereometry-screen')
        };

        this.elements = {
            // Навигация по разделам
            mathBackBtn: document.getElementById('math-back-btn'),
            emptyBackBtn: document.getElementById('empty-back-btn'),
            trigBackBtn: document.getElementById('trig-back-btn'),
            emptyTitle: document.getElementById('empty-title'),

            // Тригонометрия
            cardsToday: document.getElementById('cards-today'),
            cardsLearned: document.getElementById('cards-learned'),
            startBtn: document.getElementById('start-btn'),
            resetBtn: document.getElementById('reset-btn'),
            backBtn: document.getElementById('back-btn'),
            homeBtn: document.getElementById('home-btn'),

            progressFill: document.getElementById('progress-fill'),
            currentCard: document.getElementById('current-card'),
            totalCards: document.getElementById('total-cards'),

            flashcard: document.getElementById('flashcard'),
            cardQuestion: document.getElementById('card-question'),

            textInputMode: document.getElementById('text-input-mode'),
            textAnswer: document.getElementById('text-answer'),
            checkTextBtn: document.getElementById('check-text-btn'),

            choiceMode: document.getElementById('choice-mode'),
            choices: document.getElementById('choices'),

            resultCard: document.getElementById('result-card'),
            resultIcon: document.getElementById('result-icon'),
            resultTitle: document.getElementById('result-title'),
            yourAnswerLabel: document.getElementById('your-answer-label'),
            userAnswer: document.getElementById('user-answer'),
            correctAnswerLabel: document.getElementById('correct-answer-label'),
            correctAnswer: document.getElementById('correct-answer'),

            sessionCorrect: document.getElementById('session-correct'),
            sessionWrong: document.getElementById('session-wrong'),

            formulasBtn: document.getElementById('formulas-btn'),
            formulasCount: document.getElementById('formulas-count'),
            formulasTitle: document.getElementById('formulas-title'),
            formulasContent: document.getElementById('formulas-content'),
            formulasBackBtn: document.getElementById('formulas-back-btn'),

            // Русский язык
            russianEgeBtn: document.getElementById('russian-ege-btn'),
            russianLiteratureBtn: document.getElementById('russian-literature-btn'),
            russianTasksList: document.getElementById('russian-tasks-list'),
            russianBackBtn: document.getElementById('russian-back-btn'),
            russianEgeBackBtn: document.getElementById('russian-ege-back-btn'),
            // Литература для сочинений
            literatureList: document.getElementById('literature-list'),
            literatureBackBtn: document.getElementById('literature-back-btn'),
            literatureWorkTitle: document.getElementById('literature-work-title'),
            literatureWorkAuthor: document.getElementById('literature-work-author'),
            literatureThemes: document.getElementById('literature-themes'),
            literatureContent: document.getElementById('literature-content'),
            literatureWorkBackBtn: document.getElementById('literature-work-back-btn'),
            russianTaskTitle: document.getElementById('russian-task-title'),
            russianTaskSubtitle: document.getElementById('russian-task-subtitle'),
            russianCardsTotal: document.getElementById('russian-cards-total'),
            russianCardsLearned: document.getElementById('russian-cards-learned'),
            theoryBtn: document.getElementById('theory-btn'),
            rulesBtn: document.getElementById('rules-btn'),
            russianTaskBackBtn: document.getElementById('russian-task-back-btn'),
            theoryTitle: document.getElementById('theory-title'),
            theoryContent: document.getElementById('theory-content'),
            theoryBackBtn: document.getElementById('theory-back-btn'),
            russianProgressFill: document.getElementById('russian-progress-fill'),
            russianCurrentCard: document.getElementById('russian-current-card'),
            russianTotalCards: document.getElementById('russian-total-cards'),
            russianCardQuestion: document.getElementById('russian-card-question'),
            russianTextInputMode: document.getElementById('russian-text-input-mode'),
            russianTextAnswer: document.getElementById('russian-text-answer'),
            russianCheckTextBtn: document.getElementById('russian-check-text-btn'),
            russianChoiceMode: document.getElementById('russian-choice-mode'),
            russianChoices: document.getElementById('russian-choices'),
            russianCardBackBtn: document.getElementById('russian-card-back-btn'),
            russianResultCard: document.getElementById('russian-result-card'),
            russianResultIcon: document.getElementById('russian-result-icon'),
            russianResultTitle: document.getElementById('russian-result-title'),
            russianUserAnswer: document.getElementById('russian-user-answer'),
            russianCorrectAnswer: document.getElementById('russian-correct-answer'),
            russianDiffButtons: document.getElementById('russian-diff-buttons'),
            russianSessionCorrect: document.getElementById('russian-session-correct'),
            russianSessionWrong: document.getElementById('russian-session-wrong'),
            russianCompleteBtn: document.getElementById('russian-complete-btn'),

            // Информатика
            csTasksList: document.getElementById('cs-tasks-list'),
            csBackBtn: document.getElementById('cs-back-btn'),
            csTaskTitle: document.getElementById('cs-task-title'),
            csTaskSubtitle: document.getElementById('cs-task-subtitle'),
            csTaskBackBtn: document.getElementById('cs-task-back-btn'),
            csTheoryContent: document.getElementById('cs-theory-content'),

            // Алгебра
            algebraFormulasBtn: document.getElementById('algebra-formulas-btn'),
            algebraFormulasCount: document.getElementById('algebra-formulas-count'),
            algebraBackBtn: document.getElementById('algebra-back-btn'),
            algebraFormulasNav: document.getElementById('algebra-formulas-nav'),
            algebraFormulasContent: document.getElementById('algebra-formulas-content'),
            algebraFormulasBackBtn: document.getElementById('algebra-formulas-back-btn'),

            // Геометрия
            planimetryBtn: document.getElementById('planimetry-btn'),
            stereometryBtn: document.getElementById('stereometry-btn'),
            planimetryCount: document.getElementById('planimetry-count'),
            stereometryCount: document.getElementById('stereometry-count'),
            geometryBackBtn: document.getElementById('geometry-back-btn'),
            planimetryNav: document.getElementById('planimetry-nav'),
            planimetryContent: document.getElementById('planimetry-content'),
            planimetryBackBtn: document.getElementById('planimetry-back-btn'),
            stereometryNav: document.getElementById('stereometry-nav'),
            stereometryContent: document.getElementById('stereometry-content'),
            stereometryBackBtn: document.getElementById('stereometry-back-btn')
        };
    },

    // Привязать обработчики событий
    bindEvents() {
        // Навигация по разделам на главной
        document.querySelectorAll('#main-screen .section-card').forEach(card => {
            card.addEventListener('click', () => {
                const section = card.dataset.section;
                if (section === 'math') {
                    this.showScreen('math');
                } else if (section === 'cs') {
                    this.showCSTasks();
                } else if (section === 'russian') {
                    this.showScreen('russian');
                }
            });
        });

        // Навигация по подразделам Математики
        document.querySelectorAll('#math-screen .section-card').forEach(card => {
            card.addEventListener('click', () => {
                const subsection = card.dataset.subsection;
                if (subsection === 'trig') {
                    this.showScreen('home');
                } else if (subsection === 'algebra') {
                    this.showAlgebraScreen();
                } else if (subsection === 'geometry') {
                    this.showGeometryScreen();
                }
            });
        });

        // Кнопки "Назад" для навигации
        this.elements.mathBackBtn.addEventListener('click', () => this.showScreen('main'));
        this.elements.emptyBackBtn.addEventListener('click', () => this.goBackFromEmpty());
        this.elements.trigBackBtn.addEventListener('click', () => this.showScreen('math'));

        // Экран Тригонометрии
        this.elements.startBtn.addEventListener('click', () => this.startSession());
        this.elements.resetBtn.addEventListener('click', () => this.resetProgress());
        this.elements.backBtn.addEventListener('click', () => this.goHome());
        this.elements.homeBtn.addEventListener('click', () => this.goHome());
        this.elements.formulasBtn.addEventListener('click', () => this.showAllFormulas());
        this.elements.formulasBackBtn.addEventListener('click', () => this.goHome());

        // Экран Алгебры
        this.elements.algebraBackBtn.addEventListener('click', () => this.showScreen('math'));
        this.elements.algebraFormulasBtn.addEventListener('click', () => this.showAlgebraFormulas());
        this.elements.algebraFormulasBackBtn.addEventListener('click', () => this.showAlgebraScreen());

        // Экран Геометрии
        this.elements.geometryBackBtn.addEventListener('click', () => this.showScreen('math'));
        this.elements.planimetryBtn.addEventListener('click', () => this.showPlanimetryFormulas());
        this.elements.stereometryBtn.addEventListener('click', () => this.showStereometryFormulas());
        this.elements.planimetryBackBtn.addEventListener('click', () => this.showGeometryScreen());
        this.elements.stereometryBackBtn.addEventListener('click', () => this.showGeometryScreen());

        // Выбор режима
        document.querySelectorAll('input[name="mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.mode = e.target.value;
            });
        });

        // Проверка ответа (текст)
        this.elements.checkTextBtn.addEventListener('click', () => this.checkTextAnswer());
        this.elements.textAnswer.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkTextAnswer();
        });

        // Оценка сложности
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const quality = parseInt(e.target.dataset.quality);
                this.rateAndNext(quality);
            });
        });
    },

    // Загрузить данные
    loadData() {
        this.cardStates = Storage.initializeCardStates();
    },

    // Обновить статистику на главном экране
    updateStats() {
        const stats = SM2.getStats(this.cardStates);
        this.elements.cardsToday.textContent = TRIG_CARDS.length;
        this.elements.cardsLearned.textContent = stats.learned;
        this.elements.formulasCount.textContent = TRIG_CARDS.length;
    },

    // Получить формулы сгруппированные по категориям (в правильном порядке)
    getGroupedFormulas() {
        const grouped = {};

        // Инициализируем категории в правильном порядке
        CATEGORIES_ORDER.forEach(cat => {
            grouped[cat] = [];
        });

        // Распределяем формулы по категориям
        TRIG_CARDS.forEach(card => {
            if (grouped[card.category]) {
                grouped[card.category].push(card);
            }
        });

        return grouped;
    },

    // Показать все формулы
    showAllFormulas() {
        const grouped = this.getGroupedFormulas();

        this.elements.formulasTitle.textContent = 'Все формулы';

        let html = '';
        for (const [category, cards] of Object.entries(grouped)) {
            if (cards.length === 0) continue;

            html += `<div class="formulas-category">
                <div class="formulas-category-title">${category}</div>
                <div class="formulas-category-list">`;

            cards.forEach(card => {
                html += `<div class="formula-item">
                    <div class="formula-name">${card.name}</div>
                    <div class="formula-math">$$${card.formula}$$</div>
                </div>`;
            });

            html += '</div></div>';
        }

        this.elements.formulasContent.innerHTML = html;
        this.showScreen('formulas');
        this.renderMath();
    },

    // Показать экран
    showScreen(screenName, decorationType = null) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.screens[screenName].classList.add('active');

        // Обновить декорации
        const decType = decorationType || screenName;
        if (typeof updateDecorations === 'function') {
            updateDecorations(decType);
        }
    },

    // Показать пустой экран
    showEmptyScreen(title, backTo, decorationType) {
        this.elements.emptyTitle.textContent = title;
        this.emptyBackTo = backTo;
        this.emptyDecorationType = decorationType;

        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.screens.empty.classList.add('active');

        // Обновить декорации для пустого экрана
        if (typeof updateDecorations === 'function') {
            updateDecorations(decorationType);
        }
    },

    // Вернуться из пустого экрана
    goBackFromEmpty() {
        this.showScreen(this.emptyBackTo);
    },

    // Начать сессию
    startSession() {
        // Берём все карточки и перемешиваем в случайном порядке
        this.dueCards = this.cardStates.slice().sort(() => Math.random() - 0.5);

        this.currentIndex = 0;
        this.sessionCorrect = 0;
        this.sessionWrong = 0;

        this.elements.totalCards.textContent = this.dueCards.length;
        this.showCard();
        this.showScreen('card');
    },

    // Показать карточку
    showCard() {
        if (this.currentIndex >= this.dueCards.length) {
            this.showComplete();
            return;
        }

        this.currentCardState = this.dueCards[this.currentIndex];
        this.currentCard = TRIG_CARDS.find(c => c.id === this.currentCardState.cardId);

        // Обновить прогресс
        this.elements.currentCard.textContent = this.currentIndex + 1;
        const progress = ((this.currentIndex) / this.dueCards.length) * 100;
        this.elements.progressFill.style.width = progress + '%';

        // Показать вопрос в зависимости от режима
        if (this.mode === 'formula-to-name') {
            this.showFormulaToName();
        } else {
            this.showNameToFormula();
        }
    },

    // Режим: Формула → Название
    showFormulaToName() {
        this.elements.cardQuestion.innerHTML = `<span class="formula">$$${this.currentCard.formula}$$</span>`;
        this.renderMath();

        this.elements.textInputMode.classList.remove('hidden');
        this.elements.choiceMode.classList.add('hidden');
        this.elements.textAnswer.value = '';
        this.elements.textAnswer.focus();
    },

    // Режим: Название → Формула
    showNameToFormula() {
        this.elements.cardQuestion.innerHTML = `<strong>${this.currentCard.name}</strong>`;

        this.elements.textInputMode.classList.add('hidden');
        this.elements.choiceMode.classList.remove('hidden');

        // Получить варианты ответа
        const choices = getRandomChoices(this.currentCard.id, 4);
        this.elements.choices.innerHTML = '';

        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `$$${choice.formula}$$`;
            btn.dataset.cardId = choice.id;
            btn.addEventListener('click', () => this.checkChoiceAnswer(choice.id, btn));
            this.elements.choices.appendChild(btn);
        });

        this.renderMath();
    },

    // Проверить текстовый ответ
    checkTextAnswer() {
        const answer = this.elements.textAnswer.value.trim();
        if (!answer) return;

        this.userAnswer = answer;
        this.wasCorrect = checkAnswer(this.currentCard.id, answer);

        if (this.wasCorrect) {
            this.sessionCorrect++;
        } else {
            this.sessionWrong++;
        }

        this.showResult();
    },

    // Проверить ответ с выбором
    checkChoiceAnswer(selectedId, btn) {
        // Отключаем все кнопки
        document.querySelectorAll('.choice-btn').forEach(b => {
            b.style.pointerEvents = 'none';
        });

        this.wasCorrect = selectedId === this.currentCard.id;

        // Подсветить ответы
        if (this.wasCorrect) {
            btn.classList.add('correct');
            this.sessionCorrect++;
        } else {
            btn.classList.add('wrong');
            // Показать правильный ответ
            document.querySelectorAll('.choice-btn').forEach(b => {
                if (parseInt(b.dataset.cardId) === this.currentCard.id) {
                    b.classList.add('correct');
                }
            });
            this.sessionWrong++;
        }

        // Найти выбранную формулу для отображения
        const selectedCard = TRIG_CARDS.find(c => c.id === selectedId);
        this.userAnswer = selectedCard ? selectedCard.name : 'Неизвестно';

        setTimeout(() => this.showResult(), 800);
    },

    // Показать результат
    showResult() {
        const card = this.elements.resultCard;

        if (this.wasCorrect) {
            card.classList.remove('wrong');
            card.classList.add('correct');
            this.elements.resultIcon.textContent = '✓';
            this.elements.resultTitle.textContent = 'Правильно!';
        } else {
            card.classList.remove('correct');
            card.classList.add('wrong');
            this.elements.resultIcon.textContent = '✗';
            this.elements.resultTitle.textContent = 'Неправильно';
        }

        // Показать ответы в зависимости от режима
        if (this.mode === 'formula-to-name') {
            this.elements.yourAnswerLabel.textContent = 'Ваш ответ:';
            this.elements.userAnswer.textContent = this.userAnswer;
            this.elements.correctAnswerLabel.textContent = 'Правильный ответ:';
            this.elements.correctAnswer.textContent = this.currentCard.name;
        } else {
            this.elements.yourAnswerLabel.textContent = 'Вы выбрали:';
            this.elements.userAnswer.textContent = this.userAnswer;
            this.elements.correctAnswerLabel.textContent = 'Правильная формула:';
            this.elements.correctAnswer.innerHTML = `$$${this.currentCard.formula}$$`;
            this.renderMath();
        }

        this.showScreen('result');
    },

    // Оценить и перейти к следующей карточке
    rateAndNext(quality) {
        // Обновить состояние карточки
        SM2.updateCardState(this.currentCardState, quality, this.wasCorrect);
        Storage.updateCardState(this.currentCardState);

        // Если ответ неправильный, добавить карточку в конец очереди для повторения
        if (!this.wasCorrect) {
            // Создаём копию состояния для повторного показа
            this.dueCards.push(this.currentCardState);
            this.elements.totalCards.textContent = this.dueCards.length;
        }

        this.currentIndex++;
        this.showCard();
        this.showScreen('card');
    },

    // Показать экран завершения
    showComplete() {
        this.elements.sessionCorrect.textContent = this.sessionCorrect;
        this.elements.sessionWrong.textContent = this.sessionWrong;
        this.showScreen('complete');
    },

    // Вернуться на главную
    goHome() {
        this.loadData();
        this.updateStats();
        this.showScreen('home');
    },

    // Сбросить прогресс
    resetProgress() {
        if (confirm('Вы уверены? Весь прогресс будет удалён!')) {
            this.cardStates = Storage.resetProgress();
            this.updateStats();
        }
    },

    // Рендеринг математических формул
    renderMath() {
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(document.body, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        }
    },

    // ===== РУССКИЙ ЯЗЫК =====

    // Текущее задание русского языка
    currentRussianTask: null,
    russianMode: 'rule-to-example', // или 'example-to-rule'
    russianCardStates: [],
    russianDueCards: [],
    russianCurrentIndex: 0,
    russianCurrentCard: null,
    russianWasCorrect: false,
    russianUserAnswer: '',
    russianSessionCorrect: 0,
    russianSessionWrong: 0,

    // Показать список заданий ЕГЭ
    showRussianTasks() {
        let html = '';
        RUSSIAN_TASKS.forEach(task => {
            html += `
                <div class="task-item" data-task-id="${task.id}">
                    <span class="task-number">${task.id}</span>
                    <span class="task-title">${task.title}</span>
                    <span class="task-cards-count">${task.cards.length} карточек</span>
                </div>
            `;
        });
        this.elements.russianTasksList.innerHTML = html;

        // Привязать клики по заданиям
        document.querySelectorAll('[data-task-id]').forEach(item => {
            item.addEventListener('click', () => {
                const taskId = parseInt(item.dataset.taskId);
                this.openRussianTask(taskId);
            });
        });

        this.showScreen('russianEge');
    },

    // Открыть конкретное задание
    openRussianTask(taskId) {
        this.currentRussianTask = getRussianTask(taskId);
        if (!this.currentRussianTask) return;

        this.elements.russianTaskTitle.textContent = `Задание ${taskId}`;
        this.elements.russianTaskSubtitle.textContent = this.currentRussianTask.title;
        this.elements.russianCardsTotal.textContent = this.currentRussianTask.cards.length;
        this.elements.russianCardsLearned.textContent = '0'; // TODO: из storage

        this.showScreen('russianTask', 'russian');
    },

    // Показать теорию
    showRussianTheory() {
        if (!this.currentRussianTask) return;

        this.elements.theoryTitle.textContent = `Задание ${this.currentRussianTask.id}. ${this.currentRussianTask.title}`;
        this.elements.theoryContent.innerHTML = this.currentRussianTask.theory;

        this.showScreen('russianTheory', 'russian');
    },

    // Начать карточки русского языка
    startRussianCards() {
        if (!this.currentRussianTask || this.currentRussianTask.cards.length === 0) {
            alert('В этом задании пока нет карточек');
            return;
        }

        // Перемешиваем карточки
        this.russianDueCards = this.currentRussianTask.cards.slice().sort(() => Math.random() - 0.5);
        this.russianCurrentIndex = 0;
        this.russianSessionCorrect = 0;
        this.russianSessionWrong = 0;

        this.elements.russianTotalCards.textContent = this.russianDueCards.length;
        this.showRussianCard();
        this.showScreen('russianCard', 'russian');
    },

    // Показать карточку русского языка
    showRussianCard() {
        if (this.russianCurrentIndex >= this.russianDueCards.length) {
            this.showRussianComplete();
            return;
        }

        this.russianCurrentCard = this.russianDueCards[this.russianCurrentIndex];

        // Обновить прогресс
        this.elements.russianCurrentCard.textContent = this.russianCurrentIndex + 1;
        const progress = (this.russianCurrentIndex / this.russianDueCards.length) * 100;
        this.elements.russianProgressFill.style.width = progress + '%';

        // Показать правило (режим: Правило → Пример)
        this.elements.russianCardQuestion.innerHTML = `
            <div class="rule-text">${this.russianCurrentCard.rule}</div>
            ${this.russianCurrentCard.type ? `<div class="rule-type">${this.russianCurrentCard.type}</div>` : ''}
        `;

        // Показать варианты ответа
        this.elements.russianTextInputMode.classList.add('hidden');
        this.elements.russianChoiceMode.classList.remove('hidden');

        const choices = getRandomRussianChoices(this.russianCurrentCard.id, 4, this.currentRussianTask.id);
        this.elements.russianChoices.innerHTML = '';

        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = choice.example;
            btn.dataset.cardId = choice.id;
            btn.addEventListener('click', () => this.checkRussianChoiceAnswer(choice.id, btn));
            this.elements.russianChoices.appendChild(btn);
        });
    },

    // Проверить ответ русского языка
    checkRussianChoiceAnswer(selectedId, btn) {
        // Отключаем все кнопки
        this.elements.russianChoices.querySelectorAll('.choice-btn').forEach(b => {
            b.style.pointerEvents = 'none';
        });

        this.russianWasCorrect = selectedId === this.russianCurrentCard.id;

        if (this.russianWasCorrect) {
            btn.classList.add('correct');
            this.russianSessionCorrect++;
        } else {
            btn.classList.add('wrong');
            // Показать правильный ответ
            this.elements.russianChoices.querySelectorAll('.choice-btn').forEach(b => {
                if (parseInt(b.dataset.cardId) === this.russianCurrentCard.id) {
                    b.classList.add('correct');
                }
            });
            this.russianSessionWrong++;
        }

        const selectedCard = this.russianDueCards.find(c => c.id === selectedId);
        this.russianUserAnswer = selectedCard ? selectedCard.example : 'Неизвестно';

        setTimeout(() => this.showRussianResult(), 800);
    },

    // Показать результат (русский)
    showRussianResult() {
        const card = this.elements.russianResultCard;

        if (this.russianWasCorrect) {
            card.classList.remove('wrong');
            card.classList.add('correct');
            this.elements.russianResultIcon.textContent = '✓';
            this.elements.russianResultTitle.textContent = 'Правильно!';
        } else {
            card.classList.remove('correct');
            card.classList.add('wrong');
            this.elements.russianResultIcon.textContent = '✗';
            this.elements.russianResultTitle.textContent = 'Неправильно';
        }

        this.elements.russianUserAnswer.textContent = this.russianUserAnswer;
        this.elements.russianCorrectAnswer.textContent = this.russianCurrentCard.example;

        this.showScreen('russianResult', 'russian');
    },

    // Оценить и следующая карточка (русский)
    rateAndNextRussian(quality) {
        if (!this.russianWasCorrect) {
            this.russianDueCards.push(this.russianCurrentCard);
            this.elements.russianTotalCards.textContent = this.russianDueCards.length;
        }

        this.russianCurrentIndex++;
        this.showRussianCard();
        this.showScreen('russianCard', 'russian');
    },

    // Показать завершение (русский)
    showRussianComplete() {
        this.elements.russianSessionCorrect.textContent = this.russianSessionCorrect;
        this.elements.russianSessionWrong.textContent = this.russianSessionWrong;
        this.showScreen('russianComplete', 'russian');
    },

    // Привязать события русского языка
    bindRussianEvents() {
        // Навигация русского языка
        this.elements.russianBackBtn.addEventListener('click', () => this.showScreen('main'));
        this.elements.russianEgeBtn.addEventListener('click', () => this.showRussianTasks());
        this.elements.russianLiteratureBtn.addEventListener('click', () => this.showLiteratureList());
        this.elements.russianEgeBackBtn.addEventListener('click', () => this.showScreen('russian'));

        // Навигация заданий ЕГЭ
        this.elements.russianTaskBackBtn.addEventListener('click', () => this.showRussianTasks());
        this.elements.theoryBtn.addEventListener('click', () => this.showRussianTheory());
        this.elements.rulesBtn.addEventListener('click', () => this.startRussianCards());
        this.elements.theoryBackBtn.addEventListener('click', () => this.openRussianTask(this.currentRussianTask.id));
        this.elements.russianCardBackBtn.addEventListener('click', () => this.openRussianTask(this.currentRussianTask.id));
        this.elements.russianCompleteBtn.addEventListener('click', () => this.openRussianTask(this.currentRussianTask.id));

        // Литература для сочинений — навигация
        this.elements.literatureBackBtn.addEventListener('click', () => this.showScreen('russian'));
        this.elements.literatureWorkBackBtn.addEventListener('click', () => this.showLiteratureList());

        // Кнопки сложности для русского
        this.elements.russianDiffButtons.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const quality = parseInt(e.target.dataset.quality);
                this.rateAndNextRussian(quality);
            });
        });
    },

    // ===== ЛИТЕРАТУРА ДЛЯ СОЧИНЕНИЙ =====

    currentLiteratureWork: null,

    // Показать список произведений
    showLiteratureList() {
        let html = '';
        LITERATURE_DATA.forEach(work => {
            html += `
                <div class="task-item literature-item" data-literature-id="${work.id}">
                    <span class="task-number">${work.id}</span>
                    <div class="literature-info">
                        <span class="task-title">${work.title}</span>
                        <span class="literature-author">${work.author}</span>
                    </div>
                </div>
            `;
        });
        this.elements.literatureList.innerHTML = html;

        // Привязать клики по произведениям
        document.querySelectorAll('[data-literature-id]').forEach(item => {
            item.addEventListener('click', () => {
                const workId = parseInt(item.dataset.literatureId);
                this.openLiteratureWork(workId);
            });
        });

        this.showScreen('literature');
    },

    // Открыть произведение
    openLiteratureWork(workId) {
        const work = getLiteratureWork(workId);
        if (!work) return;

        this.currentLiteratureWork = work;

        this.elements.literatureWorkTitle.textContent = work.title;
        this.elements.literatureWorkAuthor.textContent = `${work.author}, ${work.year}`;

        // Показать темы
        const themesHtml = work.themes.map(theme =>
            `<span class="theme-tag">${theme}</span>`
        ).join('');
        this.elements.literatureThemes.innerHTML = `<div class="themes-container">${themesHtml}</div>`;

        // Показать контент (пока пусто)
        if (work.content) {
            this.elements.literatureContent.innerHTML = work.content;
        } else {
            this.elements.literatureContent.innerHTML = `
                <div class="empty-content">
                    <p class="subtitle">Содержание будет добавлено позже</p>
                </div>
            `;
        }

        this.showScreen('literatureWork');
    },

    // ===== ИНФОРМАТИКА =====

    currentCSTask: null,

    // Показать список заданий информатики
    showCSTasks() {
        let html = '';
        CS_TASKS.forEach(task => {
            html += `
                <div class="task-item" data-cs-task-id="${task.id}">
                    <span class="task-number">${task.id}</span>
                    <span class="task-title">${task.title}</span>
                </div>
            `;
        });
        this.elements.csTasksList.innerHTML = html;

        // Привязать клики по заданиям
        document.querySelectorAll('[data-cs-task-id]').forEach(item => {
            item.addEventListener('click', () => {
                const taskId = parseInt(item.dataset.csTaskId);
                this.openCSTask(taskId);
            });
        });

        this.showScreen('cs');
    },

    // Открыть задание информатики (сразу показывает теорию)
    openCSTask(taskId) {
        this.currentCSTask = getCSTask(taskId);
        if (!this.currentCSTask) return;

        this.elements.csTaskTitle.textContent = `Задание ${taskId}. ${this.currentCSTask.title}`;
        this.elements.csTaskSubtitle.textContent = '';
        this.elements.csTheoryContent.innerHTML = this.currentCSTask.theory;

        this.showScreen('csTask', 'cs');
        this.renderMath();
    },

    // Привязать события информатики
    bindCSEvents() {
        this.elements.csBackBtn.addEventListener('click', () => this.showScreen('main'));
        this.elements.csTaskBackBtn.addEventListener('click', () => this.showCSTasks());
    },

    // ===== АЛГЕБРА =====

    // Показать экран алгебры
    showAlgebraScreen() {
        // Обновить количество формул
        if (typeof getAlgebraFormulasCount === 'function') {
            this.elements.algebraFormulasCount.textContent = getAlgebraFormulasCount();
        }
        this.showScreen('algebra', 'algebra');
    },

    // Показать все формулы алгебры
    showAlgebraFormulas(scrollToSection = null) {
        // Создаём навигацию по разделам
        let navHtml = '<div class="algebra-nav-pills">';
        for (const [key, section] of Object.entries(ALGEBRA_FORMULAS)) {
            navHtml += `<button class="algebra-nav-pill" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div>';
        this.elements.algebraFormulasNav.innerHTML = navHtml;

        // Привязываем клики по навигации
        document.querySelectorAll('.algebra-nav-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const sectionKey = pill.dataset.section;
                const sectionEl = document.getElementById(`algebra-section-${sectionKey}`);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Создаём контент с формулами
        let html = '';
        for (const [key, section] of Object.entries(ALGEBRA_FORMULAS)) {
            html += `<div class="formulas-category" id="algebra-section-${key}">
                <div class="formulas-category-title">${section.title}</div>
                <div class="formulas-category-list">`;

            section.formulas.forEach(formula => {
                html += `<div class="formula-item">
                    <div class="formula-name">${formula.name}</div>
                    <div class="formula-math">$$${formula.formula}$$</div>
                </div>`;
            });

            html += '</div></div>';
        }

        this.elements.algebraFormulasContent.innerHTML = html;
        this.showScreen('algebraFormulas', 'algebra');
        this.renderMath();

        // Прокрутка к нужному разделу
        if (scrollToSection) {
            setTimeout(() => {
                const sectionEl = document.getElementById(`algebra-section-${scrollToSection}`);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    },

    // ===== ГЕОМЕТРИЯ =====

    // Показать экран геометрии
    showGeometryScreen() {
        // Обновить количество формул
        if (typeof getPlanimetryFormulasCount === 'function') {
            this.elements.planimetryCount.textContent = getPlanimetryFormulasCount();
        }
        if (typeof getStereometryFormulasCount === 'function') {
            this.elements.stereometryCount.textContent = getStereometryFormulasCount();
        }
        this.showScreen('geometry', 'geometry');
    },

    // Показать формулы планиметрии
    showPlanimetryFormulas(scrollToSection = null) {
        // Создаём навигацию по разделам
        let navHtml = '<div class="geometry-nav-pills">';
        for (const [key, section] of Object.entries(PLANIMETRY_FORMULAS)) {
            navHtml += `<button class="geometry-nav-pill" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div>';
        this.elements.planimetryNav.innerHTML = navHtml;

        // Привязываем клики по навигации
        document.querySelectorAll('#planimetry-nav .geometry-nav-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const sectionKey = pill.dataset.section;
                const sectionEl = document.getElementById(`planimetry-section-${sectionKey}`);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Создаём контент с формулами
        let html = '';
        for (const [key, section] of Object.entries(PLANIMETRY_FORMULAS)) {
            html += `<div class="formulas-category" id="planimetry-section-${key}">
                <div class="formulas-category-title">${section.title}</div>
                <div class="formulas-category-list">`;

            section.formulas.forEach(formula => {
                html += `<div class="formula-item">
                    <div class="formula-name">${formula.name}</div>
                    <div class="formula-math">$$${formula.formula}$$</div>
                </div>`;
            });

            html += '</div></div>';
        }

        this.elements.planimetryContent.innerHTML = html;
        this.showScreen('planimetry', 'geometry');
        this.renderMath();

        // Прокрутка к нужному разделу
        if (scrollToSection) {
            setTimeout(() => {
                const sectionEl = document.getElementById(`planimetry-section-${scrollToSection}`);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    },

    // Показать формулы стереометрии
    showStereometryFormulas(scrollToSection = null) {
        // Создаём навигацию по разделам
        let navHtml = '<div class="geometry-nav-pills">';
        for (const [key, section] of Object.entries(STEREOMETRY_FORMULAS)) {
            navHtml += `<button class="geometry-nav-pill" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div>';
        this.elements.stereometryNav.innerHTML = navHtml;

        // Привязываем клики по навигации
        document.querySelectorAll('#stereometry-nav .geometry-nav-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const sectionKey = pill.dataset.section;
                const sectionEl = document.getElementById(`stereometry-section-${sectionKey}`);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Создаём контент с формулами
        let html = '';
        for (const [key, section] of Object.entries(STEREOMETRY_FORMULAS)) {
            html += `<div class="formulas-category" id="stereometry-section-${key}">
                <div class="formulas-category-title">${section.title}</div>
                <div class="formulas-category-list">`;

            section.formulas.forEach(formula => {
                html += `<div class="formula-item">
                    <div class="formula-name">${formula.name}</div>
                    <div class="formula-math">$$${formula.formula}$$</div>
                </div>`;
            });

            html += '</div></div>';
        }

        this.elements.stereometryContent.innerHTML = html;
        this.showScreen('stereometry', 'geometry');
        this.renderMath();

        // Прокрутка к нужному разделу
        if (scrollToSection) {
            setTimeout(() => {
                const sectionEl = document.getElementById(`stereometry-section-${scrollToSection}`);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }
};

// Запуск приложения после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
