/**
 * Движок экзамена «1 часть ЕГЭ»
 * Поддерживает разные предметы (математика, информатика)
 * @module EgeExam
 */
const EgeExam = {
    /** @type {Array} Выбранные задания */
    problems: [],
    /** @type {number} Индекс текущего задания */
    currentIndex: 0,
    /** @type {Array<string|null>} Ответы пользователя */
    answers: [],
    /** @type {number|null} ID интервала таймера */
    timerInterval: null,
    /** @type {number} Оставшееся время в секундах */
    timeLeft: 0,
    /** @type {number} Общее время в секундах */
    totalTime: 0,
    /** @type {boolean} Экзамен идёт */
    isRunning: false,
    /** @type {string} Текущий предмет */
    subject: 'ege-math',
    /** @type {Array|null} Источник заданий */
    taskSource: null,

    /**
     * Запускает экзамен
     * @param {number} minutes - время в минутах (по умолчанию 60)
     * @param {Array} [tasks] - массив заданий (по умолчанию EGE_MATH_TASKS)
     * @param {string} [subject] - идентификатор предмета для статистики
     */
    start(minutes = 60, tasks = null, subject = 'ege-math') {
        this.taskSource = tasks || (typeof EGE_MATH_TASKS !== 'undefined' ? EGE_MATH_TASKS : []);
        this.subject = subject;
        this.problems = this.selectProblems();
        this.currentIndex = 0;
        this.answers = new Array(this.problems.length).fill(null);
        this.totalTime = minutes * 60;
        this.timeLeft = this.totalTime;
        this.isRunning = true;
        this.startTimer();
    },

    /**
     * Выбирает 1 случайный прототип из каждого задания и перемешивает
     * @returns {Array}
     */
    selectProblems() {
        if (!this.taskSource || this.taskSource.length === 0) {
            console.error('Task source not loaded');
            return [];
        }

        const problems = this.taskSource.map(task => {
            const proto = task.prototypes[Math.floor(Math.random() * task.prototypes.length)];
            return {
                taskId: task.id,
                taskTitle: task.title,
                ...proto
            };
        });

        // Fisher-Yates shuffle
        for (let i = problems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [problems[i], problems[j]] = [problems[j], problems[i]];
        }

        return problems;
    },

    /**
     * Запускает таймер обратного отсчёта
     */
    startTimer() {
        this.stopTimer();
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                this.timeLeft = 0;
                if (typeof App !== 'undefined') {
                    App.finishEgeExam();
                }
            }
        }, 1000);
    },

    /**
     * Останавливает таймер
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    /**
     * Обновляет отображение таймера
     */
    updateTimerDisplay() {
        const timerEl = document.getElementById('ege-timer');
        if (timerEl) {
            timerEl.textContent = this.formatTime(this.timeLeft);

            if (this.timeLeft <= 60) {
                timerEl.classList.add('exam-timer-warning');
            } else {
                timerEl.classList.remove('exam-timer-warning');
            }
        }

        const progressEl = document.getElementById('ege-timer-progress');
        if (progressEl) {
            const percent = (this.timeLeft / this.totalTime) * 100;
            progressEl.style.width = percent + '%';
        }
    },

    /**
     * Сохраняет ответ на текущий вопрос
     * @param {string} answer
     */
    saveAnswer(answer) {
        if (answer && answer.trim()) {
            this.answers[this.currentIndex] = answer.trim();
        }
    },

    /**
     * Получает текущее задание
     * @returns {Object}
     */
    getCurrentProblem() {
        return this.problems[this.currentIndex];
    },

    /**
     * Переход к следующему заданию
     * @returns {boolean}
     */
    next() {
        if (this.currentIndex < this.problems.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    },

    /**
     * Переход к предыдущему заданию
     * @returns {boolean}
     */
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        return false;
    },

    /**
     * Переход к конкретному заданию
     * @param {number} index
     */
    goTo(index) {
        if (index >= 0 && index < this.problems.length) {
            this.currentIndex = index;
        }
    },

    /**
     * Нормализует ответ для сравнения
     * @param {string} str
     * @returns {string}
     */
    normalizeAnswer(str) {
        return str
            .trim()
            .replace(/\s+/g, '')
            .replace(/,/g, '.')
            .replace(/−/g, '-')
            .toLowerCase();
    },

    /**
     * Проверяет ответ пользователя
     * @param {string} userAnswer
     * @param {Array<string>} acceptedAnswers
     * @returns {boolean}
     */
    checkAnswer(userAnswer, acceptedAnswers) {
        const normalized = this.normalizeAnswer(userAnswer);
        return acceptedAnswers.some(a => this.normalizeAnswer(a) === normalized);
    },

    /**
     * Завершает экзамен и подсчитывает результат
     * @returns {Object}
     */
    finish() {
        this.stopTimer();
        this.isRunning = false;

        let correct = 0;
        let wrong = 0;
        let unanswered = 0;
        const taskResults = [];

        this.problems.forEach((p, i) => {
            const userAnswer = this.answers[i];
            let status = 'skipped';

            if (!userAnswer) {
                unanswered++;
            } else {
                const isCorrect = this.checkAnswer(userAnswer, p.answers);
                if (isCorrect) {
                    correct++;
                    status = 'correct';
                } else {
                    wrong++;
                    status = 'wrong';
                }
            }

            taskResults.push({
                taskId: p.taskId,
                taskTitle: p.taskTitle,
                status: status,
                userAnswer: userAnswer || '',
                correctAnswer: p.answers[0],
                solution: p.solution || ''
            });
        });

        // Сортируем результаты по номеру задания
        taskResults.sort((a, b) => a.taskId - b.taskId);

        const total = this.problems.length;
        const timeSpent = this.totalTime - this.timeLeft;
        const percentage = Math.round((correct / total) * 100);

        // Логируем
        if (typeof Stats !== 'undefined') {
            Stats.logSession(this.subject, correct, wrong + unanswered);
        }

        return {
            correct,
            wrong,
            unanswered,
            total,
            percentage,
            primaryScore: correct,
            timeSpent,
            taskResults,
            grade: this.getGrade(correct, total)
        };
    },

    /**
     * Определяет оценку по количеству правильных ответов
     * @param {number} correctCount
     * @param {number} [total]
     * @returns {Object}
     */
    getGrade(correctCount, total = 12) {
        const pct = total > 0 ? (correctCount / total) * 100 : 0;
        if (pct >= 90) return { grade: 5, label: 'Отлично', color: 'var(--success)' };
        if (pct >= 65) return { grade: 4, label: 'Хорошо', color: '#6366f1' };
        if (pct >= 40) return { grade: 3, label: 'Удовлетворительно', color: '#f59e0b' };
        return { grade: 2, label: 'Неудовлетворительно', color: 'var(--error)' };
    },

    /**
     * Форматирует время
     * @param {number} seconds
     * @returns {string}
     */
    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
};
