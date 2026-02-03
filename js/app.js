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
        this.bindSettingsEvents();
        this.bindNewFeatureEvents();
        this.initTheme();
        this.initHistory();
        this.loadData();
        this.updateStats();

        // Инициализация поиска, PWA и авторизации
        Search.init();
        Search.bindEvents();
        this.initPWA();
        Auth.init();

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
            csFormulas: document.getElementById('cs-formulas-screen'),
            csTemplates: document.getElementById('cs-templates-screen'),
            // Алгебра
            algebra: document.getElementById('algebra-screen'),
            algebraFormulas: document.getElementById('algebra-formulas-screen'),
            // Геометрия
            geometry: document.getElementById('geometry-screen'),
            planimetry: document.getElementById('planimetry-screen'),
            stereometry: document.getElementById('stereometry-screen'),
            // Новые фичи
            dashboard: document.getElementById('dashboard-screen'),
            trainer: document.getElementById('trainer-screen'),
            trainerProblem: document.getElementById('trainer-problem-screen'),
            examSubjects: document.getElementById('exam-subjects-screen'),
            examSetup: document.getElementById('exam-setup-screen'),
            exam: document.getElementById('exam-screen'),
            examResult: document.getElementById('exam-result-screen'),
            egeExam: document.getElementById('ege-exam-screen'),
            egeResult: document.getElementById('ege-result-screen')
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
            csBackBtn: document.getElementById('cs-back-btn'),
            csFormulasBtn: document.getElementById('cs-formulas-btn'),
            csTemplatesBtn: document.getElementById('cs-templates-btn'),
            csFormulasCount: document.getElementById('cs-formulas-count'),
            csTemplatesCount: document.getElementById('cs-templates-count'),
            csFormulasNav: document.getElementById('cs-formulas-nav'),
            csFormulasContent: document.getElementById('cs-formulas-content'),
            csFormulasBackBtn: document.getElementById('cs-formulas-back-btn'),
            csTemplatesNav: document.getElementById('cs-templates-nav'),
            csTemplatesContent: document.getElementById('cs-templates-content'),
            csTemplatesBackBtn: document.getElementById('cs-templates-back-btn'),

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
                    this.showCSScreen();
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
    /** @type {boolean} Флаг для предотвращения pushState при popstate */
    _isRestoringState: false,

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

        // Записываем в историю браузера (кроме восстановления из popstate)
        if (!this._isRestoringState) {
            const state = { screen: screenName, decorationType: decType };
            history.pushState(state, '', `#${screenName}`);
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
        // Берём карточки, перемешиваем и ограничиваем по настройке
        this.dueCards = this.cardStates.slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, this.cardsPerSession);

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
        Stats.logSession('trig', this.sessionCorrect, this.sessionWrong);
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
        Stats.logSession('russian', this.russianSessionCorrect, this.russianSessionWrong);
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

    // Показать главный экран информатики
    showCSScreen() {
        if (typeof getCSFormulasCount === 'function') {
            this.elements.csFormulasCount.textContent = getCSFormulasCount();
        }
        if (typeof getCSTemplatesCount === 'function') {
            this.elements.csTemplatesCount.textContent = getCSTemplatesCount();
        }
        this.showScreen('cs', 'cs');
    },

    // Показать формулы информатики
    showCSFormulas(scrollToSection = null) {
        const entries = Object.entries(CS_FORMULAS);
        const firstTitle = entries[0][1].title;
        let navHtml = `<div class="nav-dropdown">
            <button class="nav-dropdown-toggle" aria-expanded="false">
                <span class="nav-dropdown-label">${firstTitle}</span>
                <svg class="nav-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="nav-dropdown-menu hidden">`;
        for (const [key, section] of entries) {
            navHtml += `<button class="nav-dropdown-item" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div></div>';
        this.elements.csFormulasNav.innerHTML = navHtml;
        this._bindNavDropdown(this.elements.csFormulasNav, 'cs-section-');

        let html = '';
        for (const [key, section] of Object.entries(CS_FORMULAS)) {
            html += `<div class="formulas-category" id="cs-section-${key}">
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

        this.elements.csFormulasContent.innerHTML = html;
        this.showScreen('csFormulas', 'cs');
        this.renderMath();

        if (scrollToSection) {
            setTimeout(() => {
                const sectionEl = document.getElementById(`cs-section-${scrollToSection}`);
                if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    },

    // Подсветка синтаксиса Python
    highlightPython(code) {
        // Экранируем HTML
        let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Порядок важен: сначала строки и комментарии, потом остальное
        const tokens = [];
        let id = 0;

        // Заменяем строки и комментарии на токены-плейсхолдеры
        // Многострочные строки
        escaped = escaped.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, (m) => {
            const tok = `__TOK${id}__`; tokens.push({ tok, html: `<span class="py-string">${m}</span>` }); id++; return tok;
        });
        // f-строки
        escaped = escaped.replace(/(f'[^']*'|f"[^"]*")/g, (m) => {
            const tok = `__TOK${id}__`; tokens.push({ tok, html: `<span class="py-fstring">${m}</span>` }); id++; return tok;
        });
        // Обычные строки
        escaped = escaped.replace(/('[^']*'|"[^"]*")/g, (m) => {
            const tok = `__TOK${id}__`; tokens.push({ tok, html: `<span class="py-string">${m}</span>` }); id++; return tok;
        });
        // Комментарии
        escaped = escaped.replace(/(#.*)/gm, (m) => {
            const tok = `__TOK${id}__`; tokens.push({ tok, html: `<span class="py-comment">${m}</span>` }); id++; return tok;
        });
        // Декораторы
        escaped = escaped.replace(/(@\w+(\.\w+)*(\([^)]*\))?)/g, (m) => {
            const tok = `__TOK${id}__`; tokens.push({ tok, html: `<span class="py-decorator">${m}</span>` }); id++; return tok;
        });

        // Ключевые слова
        const keywords = ['from', 'import', 'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'class', 'with', 'as', 'try', 'except', 'finally', 'raise', 'yield', 'lambda', 'pass', 'break', 'continue', 'del', 'assert', 'global', 'nonlocal'];
        const kwPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
        escaped = escaped.replace(kwPattern, '<span class="py-keyword">$1</span>');

        // Встроенные функции
        const builtins = ['print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'sorted', 'reversed', 'enumerate', 'zip', 'map', 'filter', 'sum', 'min', 'max', 'abs', 'round', 'open', 'type', 'isinstance', 'input', 'any', 'all', 'hex', 'bin', 'oct', 'chr', 'ord', 'bool', 'super', 'property', 'staticmethod', 'classmethod'];
        const builtinPattern = new RegExp(`\\b(${builtins.join('|')})(?=\\()`, 'g');
        escaped = escaped.replace(builtinPattern, '<span class="py-builtin">$1</span>');

        // Имена функций после def
        escaped = escaped.replace(/(<span class="py-keyword">def<\/span>\s+)(\w+)/g, '$1<span class="py-funcname">$2</span>');

        // Числа (целые и дробные)
        escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, '<span class="py-number">$1</span>');

        // Восстанавливаем токены
        for (const { tok, html } of tokens) {
            escaped = escaped.replace(tok, html);
        }

        return escaped;
    },

    // Показать шаблоны Python
    showCSTemplates(scrollToSection = null) {
        const entries = Object.entries(CS_TEMPLATES);
        const firstTitle = entries[0][1].title;
        let navHtml = `<div class="nav-dropdown">
            <button class="nav-dropdown-toggle" aria-expanded="false">
                <span class="nav-dropdown-label">${firstTitle}</span>
                <svg class="nav-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="nav-dropdown-menu hidden">`;
        for (const [key, section] of entries) {
            navHtml += `<button class="nav-dropdown-item" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div></div>';
        this.elements.csTemplatesNav.innerHTML = navHtml;
        this._bindNavDropdown(this.elements.csTemplatesNav, 'cs-tmpl-');

        let html = '';
        for (const [key, section] of Object.entries(CS_TEMPLATES)) {
            html += `<div class="templates-category" id="cs-tmpl-${key}">
                <div class="templates-category-title">${section.title}</div>
                <div class="templates-category-list">`;
            section.templates.forEach(tmpl => {
                html += `<div class="template-item">
                    <div class="template-name">${tmpl.name}</div>
                    <div class="template-desc">${tmpl.description}</div>
                    <div class="code-block"><pre><code>${this.highlightPython(tmpl.code)}</code></pre></div>
                </div>`;
            });
            html += '</div></div>';
        }

        this.elements.csTemplatesContent.innerHTML = html;
        this.showScreen('csTemplates', 'cs');

        if (scrollToSection) {
            setTimeout(() => {
                const sectionEl = document.getElementById(`cs-tmpl-${scrollToSection}`);
                if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    },

    // Привязать события информатики
    bindCSEvents() {
        this.elements.csBackBtn.addEventListener('click', () => this.showScreen('main'));
        this.elements.csFormulasBtn.addEventListener('click', () => this.showCSFormulas());
        this.elements.csTemplatesBtn.addEventListener('click', () => this.showCSTemplates());
        this.elements.csFormulasBackBtn.addEventListener('click', () => this.showCSScreen());
        this.elements.csTemplatesBackBtn.addEventListener('click', () => this.showCSScreen());
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
        // Создаём навигацию-дропдаун
        const entries = Object.entries(ALGEBRA_FORMULAS);
        const firstTitle = entries[0][1].title;
        let navHtml = `<div class="nav-dropdown">
            <button class="nav-dropdown-toggle" aria-expanded="false">
                <span class="nav-dropdown-label">${firstTitle}</span>
                <svg class="nav-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="nav-dropdown-menu hidden">`;
        for (const [key, section] of entries) {
            navHtml += `<button class="nav-dropdown-item" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div></div>';
        this.elements.algebraFormulasNav.innerHTML = navHtml;

        // Привязываем дропдаун
        this._bindNavDropdown(this.elements.algebraFormulasNav, 'algebra-section-');

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
        // Создаём навигацию-дропдаун
        const entries = Object.entries(PLANIMETRY_FORMULAS);
        const firstTitle = entries[0][1].title;
        let navHtml = `<div class="nav-dropdown">
            <button class="nav-dropdown-toggle" aria-expanded="false">
                <span class="nav-dropdown-label">${firstTitle}</span>
                <svg class="nav-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="nav-dropdown-menu hidden">`;
        for (const [key, section] of entries) {
            navHtml += `<button class="nav-dropdown-item" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div></div>';
        this.elements.planimetryNav.innerHTML = navHtml;

        // Привязываем дропдаун
        this._bindNavDropdown(this.elements.planimetryNav, 'planimetry-section-');

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
        // Создаём навигацию-дропдаун
        const entries = Object.entries(STEREOMETRY_FORMULAS);
        const firstTitle = entries[0][1].title;
        let navHtml = `<div class="nav-dropdown">
            <button class="nav-dropdown-toggle" aria-expanded="false">
                <span class="nav-dropdown-label">${firstTitle}</span>
                <svg class="nav-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="nav-dropdown-menu hidden">`;
        for (const [key, section] of entries) {
            navHtml += `<button class="nav-dropdown-item" data-section="${key}">${section.title}</button>`;
        }
        navHtml += '</div></div>';
        this.elements.stereometryNav.innerHTML = navHtml;

        // Привязываем дропдаун
        this._bindNavDropdown(this.elements.stereometryNav, 'stereometry-section-');

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
    },

    /**
     * Привязывает логику дропдаун-навигации для формул
     */
    _bindNavDropdown(navContainer, sectionPrefix) {
        const toggle = navContainer.querySelector('.nav-dropdown-toggle');
        const menu = navContainer.querySelector('.nav-dropdown-menu');
        const label = navContainer.querySelector('.nav-dropdown-label');
        const items = navContainer.querySelectorAll('.nav-dropdown-item');

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            menu.classList.toggle('hidden');
        });

        items.forEach(item => {
            item.addEventListener('click', () => {
                const sectionKey = item.dataset.section;
                label.textContent = item.textContent;
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.add('hidden');

                const sectionEl = document.getElementById(`${sectionPrefix}${sectionKey}`);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Закрыть при клике вне
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.add('hidden');
            }
        });
    },

    // ===== ИСТОРИЯ БРАУЗЕРА =====

    /**
     * Инициализирует поддержку навигации браузера (назад/вперёд)
     */
    initHistory() {
        // Заменяем начальное состояние (без добавления в историю)
        history.replaceState({ screen: 'main', decorationType: 'main' }, '', '#main');

        // Слушаем нажатие кнопок назад/вперёд
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.screen && this.screens[e.state.screen]) {
                this._isRestoringState = true;
                this.showScreen(e.state.screen, e.state.decorationType);
                this._isRestoringState = false;
            }
        });
    },

    // ===== НАСТРОЙКИ И ТЕМА =====

    /** @type {number} Количество карточек за сессию */
    cardsPerSession: 20,

    /**
     * Инициализирует все настройки при загрузке
     */
    initTheme() {
        // Тема
        const savedTheme = Storage.loadPreference('theme');
        if (savedTheme) {
            document.documentElement.dataset.theme = savedTheme;
            if (savedTheme === 'dark') {
                document.getElementById('theme-toggle').checked = true;
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.dataset.theme = 'dark';
            document.getElementById('theme-toggle').checked = true;
        }

        // Размер шрифта
        const savedFontSize = Storage.loadPreference('fontSize', 'normal');
        this.setFontSize(savedFontSize, false);

        // Карточек за сессию
        const savedCards = Storage.loadPreference('cardsPerSession', 20);
        this.cardsPerSession = savedCards;
        document.getElementById('cards-per-session').value = savedCards;

        // Анимации
        const savedAnimations = Storage.loadPreference('animations', true);
        document.getElementById('animations-toggle').checked = savedAnimations;
        if (!savedAnimations) {
            document.documentElement.dataset.animations = 'off';
        }
    },

    /**
     * Переключает тему между light и dark
     */
    toggleTheme() {
        const isDark = document.documentElement.dataset.theme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.dataset.theme = newTheme;
        document.getElementById('theme-toggle').checked = !isDark;
        Storage.savePreference('theme', newTheme);
    },

    /**
     * Устанавливает размер шрифта
     * @param {string} size - 'small' | 'normal' | 'large'
     * @param {boolean} save - Сохранять ли в localStorage
     */
    setFontSize(size, save = true) {
        // Обновить атрибут на html
        if (size === 'normal') {
            delete document.documentElement.dataset.fontSize;
        } else {
            document.documentElement.dataset.fontSize = size;
        }

        // Обновить активную кнопку
        document.querySelectorAll('.font-size-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === size);
        });

        if (save) {
            Storage.savePreference('fontSize', size);
        }
    },

    /**
     * Экспортирует данные в JSON файл
     */
    exportData() {
        const data = {
            version: 2,
            exportDate: new Date().toISOString(),
            cardStates: Storage.loadCardStates(),
            preferences: Storage.loadPreferences(),
            activityLog: Stats.getLog()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ege-progress-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Импортирует данные из JSON файла
     */
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const data = JSON.parse(reader.result);
                    if (data.cardStates && Array.isArray(data.cardStates)) {
                        Storage.saveCardStates(data.cardStates);
                    }
                    if (data.preferences && typeof data.preferences === 'object') {
                        Object.entries(data.preferences).forEach(([key, value]) => {
                            Storage.savePreference(key, value);
                        });
                    }
                    if (data.activityLog && Array.isArray(data.activityLog)) {
                        localStorage.setItem('ege_activity_log', JSON.stringify(data.activityLog));
                    }
                    alert('Данные успешно импортированы!');
                    location.reload();
                } catch (err) {
                    alert('Ошибка: файл повреждён или имеет неверный формат.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    /**
     * Сбрасывает весь прогресс обучения
     */
    resetAllProgress() {
        if (confirm('Вы уверены? Весь прогресс обучения будет удалён. Это действие нельзя отменить.')) {
            Storage.resetProgress();
            localStorage.removeItem('ege_session_history');
            localStorage.removeItem('ege_activity_log');
            CloudStorage.deleteCloudData();
            alert('Прогресс сброшен.');
            location.reload();
        }
    },

    /**
     * Открывает панель настроек
     */
    openSettings() {
        document.getElementById('settings-overlay').classList.remove('hidden');
    },

    /**
     * Закрывает панель настроек
     */
    closeSettings() {
        document.getElementById('settings-overlay').classList.add('hidden');
    },

    /**
     * Привязывает события для настроек
     */
    bindSettingsEvents() {
        // Открытие / закрытие
        document.getElementById('settings-btn').addEventListener('click', () => this.openSettings());
        document.getElementById('settings-close-btn').addEventListener('click', () => this.closeSettings());

        // Тёмная тема
        document.getElementById('theme-toggle').addEventListener('change', () => this.toggleTheme());

        // Размер шрифта
        document.querySelectorAll('.font-size-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setFontSize(btn.dataset.size));
        });

        // Карточек за сессию
        document.getElementById('cards-per-session').addEventListener('change', (e) => {
            this.cardsPerSession = parseInt(e.target.value);
            Storage.savePreference('cardsPerSession', this.cardsPerSession);
        });

        // Анимации
        document.getElementById('animations-toggle').addEventListener('change', (e) => {
            const enabled = e.target.checked;
            if (enabled) {
                delete document.documentElement.dataset.animations;
            } else {
                document.documentElement.dataset.animations = 'off';
            }
            Storage.savePreference('animations', enabled);
        });

        // Экспорт / Импорт
        document.getElementById('export-data-btn').addEventListener('click', () => this.exportData());
        document.getElementById('import-data-btn').addEventListener('click', () => this.importData());

        // Сброс прогресса
        document.getElementById('reset-progress-btn').addEventListener('click', () => this.resetAllProgress());

        // Закрытие по клику на оверлей
        document.getElementById('settings-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'settings-overlay') {
                this.closeSettings();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !document.getElementById('settings-overlay').classList.contains('hidden')) {
                this.closeSettings();
            }
        });
    },

    // ===== НОВЫЕ ФИЧИ =====

    /**
     * Привязывает события для новых фич
     */
    bindNewFeatureEvents() {
        // Карточки фич на главной
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                const feature = card.dataset.feature;
                if (feature === 'dashboard') this.showDashboard();
                else if (feature === 'trainer') this.showTrainer();
                else if (feature === 'exam') this.showExamSubjects();
            });
        });

        // Кнопка поиска
        document.getElementById('search-hint-btn').addEventListener('click', () => Search.open());

        // Дашборд
        document.getElementById('dashboard-back-btn').addEventListener('click', () => this.showScreen('main'));

        // Тренажёр
        document.getElementById('trainer-back-btn').addEventListener('click', () => this.showScreen('main'));
        document.getElementById('trainer-problem-back-btn').addEventListener('click', () => this.showTrainer());

        document.querySelectorAll('[data-trainer]').forEach(card => {
            card.addEventListener('click', () => {
                this.startTrainerProblem(card.dataset.trainer);
            });
        });

        document.getElementById('trainer-check-btn').addEventListener('click', () => this.checkTrainerAnswer());
        document.getElementById('trainer-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkTrainerAnswer();
        });
        document.getElementById('trainer-hint-btn').addEventListener('click', () => this.showTrainerHint());
        document.getElementById('trainer-next-btn').addEventListener('click', () => {
            this.startTrainerProblem(Trainer.currentCategory);
        });

        // Выбор предмета экзамена
        document.getElementById('exam-subjects-back-btn').addEventListener('click', () => this.showScreen('main'));
        document.getElementById('exam-mini-practice-btn').addEventListener('click', () => this.showExamSetup());
        document.getElementById('exam-ege-part1-btn').addEventListener('click', () => this.startEgeExam());
        document.getElementById('exam-ege-cs-part1-btn').addEventListener('click', () => this.startEgeCsExam());
        document.getElementById('exam-ege-rus-part1-btn').addEventListener('click', () => this.startEgeRusExam());

        document.querySelectorAll('.exam-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.exam-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.exam-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const content = document.getElementById('exam-tab-' + tab.dataset.examTab);
                if (content) content.classList.add('active');
            });
        });

        // Мини-практика (бывший экзамен)
        document.getElementById('exam-setup-back-btn').addEventListener('click', () => this.showExamSubjects());
        document.getElementById('exam-start-btn').addEventListener('click', () => this.startExam());
        document.getElementById('exam-prev-btn').addEventListener('click', () => this.examPrev());
        document.getElementById('exam-next-btn').addEventListener('click', () => this.examNext());
        document.getElementById('exam-finish-btn').addEventListener('click', () => this.finishExam());
        document.getElementById('exam-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.examNext();
        });
        document.getElementById('exam-result-home-btn').addEventListener('click', () => this.showScreen('main'));

        // ЕГЭ 1 часть
        document.getElementById('ege-prev-btn').addEventListener('click', () => this.egePrev());
        document.getElementById('ege-next-btn').addEventListener('click', () => this.egeNext());
        document.getElementById('ege-finish-btn').addEventListener('click', () => this.finishEgeExam());
        document.getElementById('ege-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.egeNext();
        });
        document.getElementById('ege-result-home-btn').addEventListener('click', () => this.showScreen('main'));
    },

    // ===== ДАШБОРД =====

    showDashboard() {
        Dashboard.render();
        this.showScreen('dashboard');
    },

    // ===== ТРЕНАЖЁР =====

    showTrainer() {
        document.getElementById('trainer-correct-count').textContent = Trainer.score.correct;
        document.getElementById('trainer-wrong-count').textContent = Trainer.score.wrong;
        this.showScreen('trainer');
    },

    startTrainerProblem(categoryId) {
        const problem = Trainer.generate(categoryId);
        if (!problem) return;

        const categoryNames = { trig: 'Тригонометрия', geometry: 'Геометрия', algebra: 'Алгебра', cs: 'Информатика' };
        document.getElementById('trainer-category-badge').textContent = categoryNames[categoryId] || categoryId;
        document.getElementById('trainer-mini-correct').textContent = Trainer.score.correct;
        document.getElementById('trainer-mini-wrong').textContent = Trainer.score.wrong;

        document.getElementById('trainer-question').innerHTML = problem.question;
        document.getElementById('trainer-answer').value = '';
        document.getElementById('trainer-hint').classList.add('hidden');
        document.getElementById('trainer-feedback').classList.add('hidden');
        document.getElementById('trainer-feedback').classList.remove('correct', 'wrong');

        // Показать секцию ввода, скрыть фидбек
        document.querySelector('#trainer-problem-screen .answer-section').style.display = 'block';
        document.getElementById('trainer-hint-btn').style.display = 'block';

        this.showScreen('trainerProblem');
        this.renderMath();
        document.getElementById('trainer-answer').focus();
    },

    checkTrainerAnswer() {
        const answer = document.getElementById('trainer-answer').value;
        if (!answer.trim()) return;

        const result = Trainer.checkAnswer(answer);

        const feedback = document.getElementById('trainer-feedback');
        feedback.classList.remove('hidden', 'correct', 'wrong');
        feedback.classList.add(result.correct ? 'correct' : 'wrong');

        document.getElementById('trainer-feedback-icon').textContent = result.correct ? '✓' : '✗';
        document.getElementById('trainer-feedback-text').textContent = result.correct ? 'Правильно!' : 'Неправильно';
        document.getElementById('trainer-explanation').innerHTML = result.explanation;

        if (!result.correct) {
            document.getElementById('trainer-explanation').innerHTML += `<br><strong>Правильный ответ:</strong> ${result.correctAnswer}`;
        }

        // Обновить мини-счёт
        document.getElementById('trainer-mini-correct').textContent = Trainer.score.correct;
        document.getElementById('trainer-mini-wrong').textContent = Trainer.score.wrong;

        // Скрыть ввод и подсказку
        document.querySelector('#trainer-problem-screen .answer-section').style.display = 'none';
        document.getElementById('trainer-hint-btn').style.display = 'none';

        this.renderMath();

        // Логируем сессию каждые 5 ответов
        const total = Trainer.score.correct + Trainer.score.wrong;
        if (total > 0 && total % 5 === 0) {
            Stats.logSession('trainer', Trainer.score.correct, Trainer.score.wrong);
            Trainer.resetScore();
        }
    },

    showTrainerHint() {
        if (Trainer.currentProblem && Trainer.currentProblem.hint) {
            document.getElementById('trainer-hint-text').textContent = Trainer.currentProblem.hint;
            document.getElementById('trainer-hint').classList.remove('hidden');
        }
    },

    // ===== ЭКЗАМЕН: ВЫБОР ПРЕДМЕТА =====

    showExamSubjects() {
        this.showScreen('examSubjects');
    },

    // ===== МИНИ-ПРАКТИКА =====

    showExamSetup() {
        this.showScreen('examSetup');
    },

    startExam() {
        const questionCount = parseInt(document.getElementById('exam-question-count').value);
        const time = parseInt(document.getElementById('exam-time').value);

        Exam.start(questionCount, time);

        document.getElementById('exam-total-q').textContent = questionCount;

        this.renderExamQuestion();
        this.renderExamMap();
        this.showScreen('exam');
    },

    renderExamQuestion() {
        const q = Exam.getCurrentQuestion();
        document.getElementById('exam-question').innerHTML = q.question;
        document.getElementById('exam-current-q').textContent = Exam.currentIndex + 1;

        // Восстановить предыдущий ответ
        const prevAnswer = Exam.answers[Exam.currentIndex];
        document.getElementById('exam-answer').value = prevAnswer || '';

        // Обновить кнопки навигации
        document.getElementById('exam-prev-btn').disabled = Exam.currentIndex === 0;
        document.getElementById('exam-next-btn').textContent =
            Exam.currentIndex === Exam.questions.length - 1 ? 'Завершить' : 'Далее →';

        this.renderExamMap();
        this.renderMath();
        document.getElementById('exam-answer').focus();
    },

    renderExamMap() {
        const container = document.getElementById('exam-question-map');
        let html = '';
        Exam.questions.forEach((_, i) => {
            const classes = ['exam-q-dot'];
            if (i === Exam.currentIndex) classes.push('current');
            if (Exam.answers[i]) classes.push('answered');
            html += `<div class="${classes.join(' ')}" data-exam-q="${i}">${i + 1}</div>`;
        });
        container.innerHTML = html;

        container.querySelectorAll('.exam-q-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                // Сохранить текущий ответ
                Exam.saveAnswer(document.getElementById('exam-answer').value);
                Exam.goTo(parseInt(dot.dataset.examQ));
                this.renderExamQuestion();
            });
        });
    },

    examNext() {
        Exam.saveAnswer(document.getElementById('exam-answer').value);

        if (Exam.currentIndex === Exam.questions.length - 1) {
            this.finishExam();
            return;
        }

        Exam.next();
        this.renderExamQuestion();
    },

    examPrev() {
        Exam.saveAnswer(document.getElementById('exam-answer').value);
        Exam.prev();
        this.renderExamQuestion();
    },

    finishExam() {
        if (!Exam.isRunning) return;

        Exam.saveAnswer(document.getElementById('exam-answer').value);
        const result = Exam.finish();

        // Отрисовать результат
        document.getElementById('exam-result-grade').textContent = result.grade.grade;
        document.getElementById('exam-result-grade').style.background = result.grade.color;
        document.getElementById('exam-result-label').textContent = result.grade.label;
        document.getElementById('exam-result-label').style.color = result.grade.color;
        document.getElementById('exam-result-percent').textContent = result.percentage + '%';
        document.getElementById('exam-result-correct').textContent = result.correct;
        document.getElementById('exam-result-wrong').textContent = result.wrong + result.unanswered;
        document.getElementById('exam-result-time').textContent = Exam.formatTime(result.timeSpent);

        // Слабые темы
        const catNames = { trig: 'Тригонометрия', geometry: 'Геометрия', algebra: 'Алгебра', cs: 'Информатика' };
        let weakHtml = '<h3 class="dash-section-title" style="margin-bottom:8px">По предметам</h3>';
        for (const [cat, data] of Object.entries(result.categoryResults)) {
            const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const color = percent >= 70 ? 'var(--success)' : percent >= 50 ? '#f59e0b' : 'var(--error)';
            weakHtml += `
                <div class="exam-weak-topic">
                    <span class="exam-weak-name">${catNames[cat] || cat}</span>
                    <div class="exam-weak-bar"><div class="exam-weak-fill" style="width:${percent}%;background:${color}"></div></div>
                    <span class="exam-weak-percent" style="color:${color}">${percent}%</span>
                </div>
            `;
        }
        document.getElementById('exam-weak-topics').innerHTML = weakHtml;

        this.showScreen('examResult');
    },

    // ===== ЕГЭ 1 ЧАСТЬ =====

    startEgeExam() {
        EgeExam.start(60, typeof EGE_MATH_TASKS !== 'undefined' ? EGE_MATH_TASKS : [], 'ege-math');
        document.getElementById('ege-total-q').textContent = EgeExam.problems.length;
        this.renderEgeQuestion();
        this.renderEgeMap();
        this.showScreen('egeExam');
    },

    startEgeCsExam() {
        EgeExam.start(235, typeof EGE_CS_TASKS !== 'undefined' ? EGE_CS_TASKS : [], 'ege-cs');
        document.getElementById('ege-total-q').textContent = EgeExam.problems.length;
        this.renderEgeQuestion();
        this.renderEgeMap();
        this.showScreen('egeExam');
    },

    startEgeRusExam() {
        EgeExam.start(210, typeof EGE_RUS_TASKS !== 'undefined' ? EGE_RUS_TASKS : [], 'ege-rus');
        document.getElementById('ege-total-q').textContent = EgeExam.problems.length;
        this.renderEgeQuestion();
        this.renderEgeMap();
        this.showScreen('egeExam');
    },

    renderEgeQuestion() {
        const p = EgeExam.getCurrentProblem();
        if (!p) return;

        let html = '<div class="ege-question-text">' + p.text + '</div>';

        // Если есть график (задание 11), рендерим SVG
        if (p.graph && typeof EgeSvgGraph !== 'undefined') {
            html += EgeSvgGraph.render(p.graph);
        }

        document.getElementById('ege-question').innerHTML = html;
        document.getElementById('ege-current-q').textContent = EgeExam.currentIndex + 1;
        document.getElementById('ege-task-num').textContent = p.taskId;
        document.getElementById('ege-task-title').textContent = p.taskTitle;

        // Восстановить предыдущий ответ
        document.getElementById('ege-answer').value = EgeExam.answers[EgeExam.currentIndex] || '';

        // Кнопки навигации
        document.getElementById('ege-prev-btn').disabled = EgeExam.currentIndex === 0;
        document.getElementById('ege-next-btn').textContent =
            EgeExam.currentIndex === EgeExam.problems.length - 1 ? 'Завершить' : 'Далее →';

        this.renderEgeMap();
        this.renderMath();
        document.getElementById('ege-answer').focus();
    },

    renderEgeMap() {
        const container = document.getElementById('ege-question-map');
        let html = '';
        EgeExam.problems.forEach((_, i) => {
            const classes = ['exam-q-dot'];
            if (i === EgeExam.currentIndex) classes.push('current');
            if (EgeExam.answers[i]) classes.push('answered');
            html += '<div class="' + classes.join(' ') + '" data-ege-q="' + i + '">' + (i + 1) + '</div>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.exam-q-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                EgeExam.saveAnswer(document.getElementById('ege-answer').value);
                EgeExam.goTo(parseInt(dot.dataset.egeQ));
                this.renderEgeQuestion();
            });
        });
    },

    egeNext() {
        EgeExam.saveAnswer(document.getElementById('ege-answer').value);

        if (EgeExam.currentIndex === EgeExam.problems.length - 1) {
            this.finishEgeExam();
            return;
        }

        EgeExam.next();
        this.renderEgeQuestion();
    },

    egePrev() {
        EgeExam.saveAnswer(document.getElementById('ege-answer').value);
        EgeExam.prev();
        this.renderEgeQuestion();
    },

    finishEgeExam() {
        if (!EgeExam.isRunning) return;

        EgeExam.saveAnswer(document.getElementById('ege-answer').value);
        const result = EgeExam.finish();

        // Оценка
        document.getElementById('ege-result-grade').textContent = result.grade.grade;
        document.getElementById('ege-result-grade').style.background = result.grade.color;
        document.getElementById('ege-result-label').textContent = result.grade.label;
        document.getElementById('ege-result-label').style.color = result.grade.color;
        document.getElementById('ege-result-percent').textContent = result.percentage + '%';
        document.getElementById('ege-result-correct').textContent = result.correct;
        document.getElementById('ege-result-wrong').textContent = result.wrong + result.unanswered;
        document.getElementById('ege-result-time').textContent = EgeExam.formatTime(result.timeSpent);

        // Разбор по заданиям
        let breakdownHtml = '<h3 class="dash-section-title" style="margin-bottom:12px">Разбор по заданиям</h3>';
        result.taskResults.forEach(tr => {
            const iconClass = tr.status === 'correct' ? 'correct' : tr.status === 'wrong' ? 'wrong' : 'skipped';
            const icon = tr.status === 'correct' ? '✓' : tr.status === 'wrong' ? '✗' : '—';
            breakdownHtml += '<div class="ege-task-result">';
            breakdownHtml += '<div class="ege-task-result-icon ' + iconClass + '">' + icon + '</div>';
            breakdownHtml += '<span class="ege-task-result-name">Задание ' + tr.taskId + '. ' + tr.taskTitle + '</span>';
            if (tr.status === 'wrong') {
                breakdownHtml += '<span class="ege-task-result-answer" title="Ваш ответ: ' + tr.userAnswer + '">✗ ' + tr.correctAnswer + '</span>';
            }
            breakdownHtml += '</div>';
        });
        document.getElementById('ege-task-breakdown').innerHTML = breakdownHtml;

        this.showScreen('egeResult');
    },

    // ===== PWA =====

    initPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch(() => {});
        }
    }
};

// Запуск приложения после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
