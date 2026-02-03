/**
 * Режим «Экзамен» — имитация ЕГЭ
 * Таймер + случайные задания из разных разделов
 * @module Exam
 */

const Exam = {
    /** @type {Array} Текущие задания экзамена */
    questions: [],
    /** @type {number} Индекс текущего вопроса */
    currentIndex: 0,
    /** @type {Array} Ответы пользователя */
    answers: [],
    /** @type {number|null} ID таймера */
    timerInterval: null,
    /** @type {number} Оставшееся время в секундах */
    timeLeft: 0,
    /** @type {number} Общее время экзамена в секундах */
    totalTime: 0,
    /** @type {boolean} Экзамен идёт */
    isRunning: false,

    /**
     * Начинает экзамен
     * @param {number} questionCount - Количество вопросов
     * @param {number} minutes - Время в минутах
     */
    start(questionCount, minutes) {
        this.questions = this.generateQuestions(questionCount);
        this.currentIndex = 0;
        this.answers = new Array(questionCount).fill(null);
        this.totalTime = minutes * 60;
        this.timeLeft = this.totalTime;
        this.isRunning = true;

        this.startTimer();
    },

    /**
     * Генерирует набор вопросов из разных категорий
     * @param {number} count
     * @returns {Array}
     */
    generateQuestions(count) {
        const categories = ['trig', 'geometry', 'algebra', 'cs'];
        const questions = [];

        for (let i = 0; i < count; i++) {
            const cat = categories[i % categories.length];
            const problem = Trainer.generate(cat);
            questions.push({
                id: i + 1,
                category: cat,
                ...problem
            });
        }

        // Перемешиваем
        return questions.sort(() => Math.random() - 0.5);
    },

    /**
     * Запускает таймер обратного отсчёта
     */
    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.finish();
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
        const timerEl = document.getElementById('exam-timer');
        if (timerEl) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Предупреждение при менее 1 минуты
            if (this.timeLeft <= 60) {
                timerEl.classList.add('exam-timer-warning');
            } else {
                timerEl.classList.remove('exam-timer-warning');
            }
        }

        // Обновляем прогресс таймера
        const progressEl = document.getElementById('exam-timer-progress');
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
        this.answers[this.currentIndex] = answer;
    },

    /**
     * Получает текущий вопрос
     * @returns {Object}
     */
    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    },

    /**
     * Переходит к следующему вопросу
     * @returns {boolean} true если есть следующий вопрос
     */
    next() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    },

    /**
     * Переходит к предыдущему вопросу
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
     * Переходит к конкретному вопросу
     * @param {number} index
     */
    goTo(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentIndex = index;
        }
    },

    /**
     * Завершает экзамен и подсчитывает результат
     * @returns {Object} Результат экзамена
     */
    finish() {
        this.stopTimer();
        this.isRunning = false;

        let correct = 0;
        let wrong = 0;
        let unanswered = 0;
        const categoryResults = {};

        this.questions.forEach((q, i) => {
            const userAnswer = this.answers[i];
            const cat = q.category;

            if (!categoryResults[cat]) {
                categoryResults[cat] = { correct: 0, wrong: 0, total: 0, unanswered: 0 };
            }
            categoryResults[cat].total++;

            if (!userAnswer) {
                unanswered++;
                categoryResults[cat].unanswered++;
            } else {
                const isCorrect = q.answers.some(a =>
                    a.toLowerCase() === userAnswer.trim().toLowerCase()
                );
                if (isCorrect) {
                    correct++;
                    categoryResults[cat].correct++;
                } else {
                    wrong++;
                    categoryResults[cat].wrong++;
                }
            }
        });

        const timeSpent = this.totalTime - this.timeLeft;
        const total = this.questions.length;
        const percentage = Math.round((correct / total) * 100);

        // Логируем результат
        Stats.logSession('exam', correct, wrong + unanswered);

        return {
            correct,
            wrong,
            unanswered,
            total,
            percentage,
            timeSpent,
            categoryResults,
            grade: this.getGrade(percentage)
        };
    },

    /**
     * Определяет оценку по проценту
     * @param {number} percent
     * @returns {Object} {grade, label, color}
     */
    getGrade(percent) {
        if (percent >= 90) return { grade: 5, label: 'Отлично', color: 'var(--success)' };
        if (percent >= 70) return { grade: 4, label: 'Хорошо', color: '#6366f1' };
        if (percent >= 50) return { grade: 3, label: 'Удовлетворительно', color: '#f59e0b' };
        return { grade: 2, label: 'Неудовлетворительно', color: 'var(--error)' };
    },

    /**
     * Форматирует время в мм:сс
     * @param {number} seconds
     * @returns {string}
     */
    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${String(s).padStart(2, '0')}`;
    }
};
