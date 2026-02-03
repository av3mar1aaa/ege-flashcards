/**
 * Модуль отслеживания активности и статистики
 * Сохраняет историю сессий, streak, прогресс по предметам
 * @module Stats
 */

const Stats = {
    STORAGE_KEY: 'ege_activity_log',

    /**
     * Записывает результат сессии
     * @param {string} subject - Предмет (trig, russian, cs, algebra, geometry, exam, trainer)
     * @param {number} correct - Правильных ответов
     * @param {number} wrong - Неправильных ответов
     */
    logSession(subject, correct, wrong) {
        const log = this.getLog();
        const today = this.getTodayKey();

        let entry = log.find(e => e.date === today);
        if (!entry) {
            entry = { date: today, sessions: 0, correct: 0, wrong: 0, subjects: {} };
            log.push(entry);
        }

        entry.sessions++;
        entry.correct += correct;
        entry.wrong += wrong;

        if (!entry.subjects[subject]) {
            entry.subjects[subject] = { correct: 0, wrong: 0, sessions: 0 };
        }
        entry.subjects[subject].correct += correct;
        entry.subjects[subject].wrong += wrong;
        entry.subjects[subject].sessions++;

        // Сохраняем только последние 365 дней
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 365);
        const cutoffKey = this.formatDate(cutoff);
        const filtered = log.filter(e => e.date >= cutoffKey);

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
        CloudStorage.saveToCloud();
    },

    /**
     * Получает весь лог активности
     * @returns {Array} Массив записей активности
     */
    getLog() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    /**
     * Получает ключ сегодняшней даты
     * @returns {string} Дата в формате YYYY-MM-DD
     */
    getTodayKey() {
        return this.formatDate(new Date());
    },

    /**
     * Форматирует дату в YYYY-MM-DD
     * @param {Date} date
     * @returns {string}
     */
    formatDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    },

    /**
     * Рассчитывает текущий streak (дни подряд)
     * @returns {{current: number, longest: number}}
     */
    getStreak() {
        const log = this.getLog();
        if (log.length === 0) return { current: 0, longest: 0 };

        const dates = new Set(log.map(e => e.date));
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Считаем текущий streak
        let current = 0;
        let d = new Date(today);

        // Проверяем сегодня
        if (dates.has(this.formatDate(d))) {
            current = 1;
            d.setDate(d.getDate() - 1);
            while (dates.has(this.formatDate(d))) {
                current++;
                d.setDate(d.getDate() - 1);
            }
        } else {
            // Проверяем вчера (streak ещё не прерван)
            d.setDate(d.getDate() - 1);
            if (dates.has(this.formatDate(d))) {
                current = 1;
                d.setDate(d.getDate() - 1);
                while (dates.has(this.formatDate(d))) {
                    current++;
                    d.setDate(d.getDate() - 1);
                }
            }
        }

        // Считаем самый длинный streak
        const sortedDates = Array.from(dates).sort();
        let longest = 0;
        let streak = 1;

        for (let i = 1; i < sortedDates.length; i++) {
            const prev = new Date(sortedDates[i - 1]);
            const curr = new Date(sortedDates[i]);
            const diff = (curr - prev) / (1000 * 60 * 60 * 24);

            if (Math.round(diff) === 1) {
                streak++;
            } else {
                longest = Math.max(longest, streak);
                streak = 1;
            }
        }
        longest = Math.max(longest, streak);

        return { current, longest };
    },

    /**
     * Получает данные для тепловой карты (последние 20 недель)
     * @returns {Array} Массив из 140 элементов {date, count, level}
     */
    getHeatmapData() {
        const log = this.getLog();
        const dateMap = {};
        log.forEach(e => { dateMap[e.date] = e.correct + e.wrong; });

        const result = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 20 недель = 140 дней
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 139);
        // Начинаем с понедельника
        const dayOfWeek = startDate.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        startDate.setDate(startDate.getDate() + mondayOffset);

        const totalDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

        for (let i = 0; i < totalDays; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            const key = this.formatDate(d);
            const count = dateMap[key] || 0;

            let level = 0;
            if (count > 0) level = 1;
            if (count >= 10) level = 2;
            if (count >= 25) level = 3;
            if (count >= 50) level = 4;

            result.push({ date: key, count, level });
        }

        return result;
    },

    /**
     * Получает статистику за неделю
     * @returns {Array} Массив из 7 элементов {day, correct, wrong, total}
     */
    getWeeklyStats() {
        const log = this.getLog();
        const dateMap = {};
        log.forEach(e => { dateMap[e.date] = e; });

        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const result = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const key = this.formatDate(d);
            const entry = dateMap[key];

            const dayIndex = d.getDay();
            const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1];

            result.push({
                day: dayName,
                date: key,
                correct: entry ? entry.correct : 0,
                wrong: entry ? entry.wrong : 0,
                total: entry ? (entry.correct + entry.wrong) : 0
            });
        }

        return result;
    },

    /**
     * Получает статистику по предметам
     * @returns {Object} {subject: {correct, wrong, sessions, total}}
     */
    getSubjectStats() {
        const log = this.getLog();
        const stats = {};

        log.forEach(entry => {
            for (const [subject, data] of Object.entries(entry.subjects || {})) {
                if (!stats[subject]) {
                    stats[subject] = { correct: 0, wrong: 0, sessions: 0 };
                }
                stats[subject].correct += data.correct;
                stats[subject].wrong += data.wrong;
                stats[subject].sessions += data.sessions;
            }
        });

        // Добавляем total
        for (const key of Object.keys(stats)) {
            stats[key].total = stats[key].correct + stats[key].wrong;
        }

        return stats;
    },

    /**
     * Получает общее количество решённых задач
     * @returns {number}
     */
    getTotalAnswered() {
        const log = this.getLog();
        return log.reduce((sum, e) => sum + e.correct + e.wrong, 0);
    },

    /**
     * Получает общую точность в процентах
     * @returns {number}
     */
    getAccuracy() {
        const log = this.getLog();
        const total = log.reduce((sum, e) => sum + e.correct + e.wrong, 0);
        const correct = log.reduce((sum, e) => sum + e.correct, 0);
        if (total === 0) return 0;
        return Math.round((correct / total) * 100);
    },

    /**
     * Получает данные сегодняшнего дня
     * @returns {Object|null}
     */
    getTodayStats() {
        const log = this.getLog();
        const today = this.getTodayKey();
        return log.find(e => e.date === today) || null;
    }
};
