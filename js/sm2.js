/**
 * Алгоритм SM-2 (SuperMemo 2) для интервального повторения
 * @see https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 * @module SM2
 */

/**
 * @typedef {Object} CardState
 * @property {number} cardId - Уникальный идентификатор карточки
 * @property {number} easeFactor - Коэффициент лёгкости (начальное значение 2.5)
 * @property {number} interval - Интервал до следующего повторения (в днях)
 * @property {number} repetitions - Количество успешных повторений подряд
 * @property {number} nextReview - Timestamp следующего повторения
 * @property {number|null} lastReview - Timestamp последнего повторения
 */

const SM2 = {
    /** @type {number} Начальный коэффициент лёгкости */
    DEFAULT_EASE_FACTOR: 2.5,

    /** @type {number} Минимальный коэффициент лёгкости */
    MIN_EASE_FACTOR: 1.3,

    /**
     * Создаёт начальное состояние для новой карточки
     * @param {number} cardId - ID карточки
     * @returns {CardState} Объект состояния карточки
     */
    createCardState(cardId) {
        return {
            cardId: cardId,
            easeFactor: this.DEFAULT_EASE_FACTOR,
            interval: 0,          // интервал в днях
            repetitions: 0,       // количество успешных повторений подряд
            nextReview: Date.now(), // когда показывать в следующий раз
            lastReview: null      // когда была последняя проверка
        };
    },

    /**
     * Обновляет состояние карточки после ответа пользователя
     * @param {CardState} cardState - Текущее состояние карточки
     * @param {number} quality - Оценка сложности (1-4: 1=очень сложно, 4=легко)
     * @param {boolean} wasCorrect - Правильность ответа
     * @returns {CardState} Обновлённое состояние карточки
     */
    updateCardState(cardState, quality, wasCorrect) {
        const now = Date.now();
        cardState.lastReview = now;

        // Преобразуем quality 1-4 в формат SM-2 (0-5)
        // 1 -> 0 (полный провал)
        // 2 -> 2 (сложно, но вспомнил)
        // 3 -> 4 (нормально)
        // 4 -> 5 (легко)
        const sm2Quality = quality === 1 ? 0 : quality === 2 ? 2 : quality === 3 ? 4 : 5;

        // Если ответ неправильный или качество < 3 (по SM-2), сбрасываем
        if (!wasCorrect || sm2Quality < 3) {
            cardState.repetitions = 0;
            cardState.interval = 0;
            // При неправильном ответе показываем карточку снова сегодня
            cardState.nextReview = now;
        } else {
            // Успешный ответ
            cardState.repetitions += 1;

            // Вычисляем новый интервал
            if (cardState.repetitions === 1) {
                cardState.interval = 1; // 1 день
            } else if (cardState.repetitions === 2) {
                cardState.interval = 6; // 6 дней
            } else {
                cardState.interval = Math.round(cardState.interval * cardState.easeFactor);
            }

            // Обновляем ease factor
            cardState.easeFactor = cardState.easeFactor +
                (0.1 - (5 - sm2Quality) * (0.08 + (5 - sm2Quality) * 0.02));

            // Не даём ease factor опуститься ниже минимума
            if (cardState.easeFactor < this.MIN_EASE_FACTOR) {
                cardState.easeFactor = this.MIN_EASE_FACTOR;
            }

            // Устанавливаем дату следующего повторения
            cardState.nextReview = now + (cardState.interval * 24 * 60 * 60 * 1000);
        }

        return cardState;
    },

    /**
     * Проверяет, нужно ли показать карточку сегодня
     * @param {CardState} cardState - Состояние карточки
     * @returns {boolean} true если карточка готова к повторению
     */
    isDueToday(cardState) {
        return cardState.nextReview <= Date.now();
    },

    /**
     * Получает карточки для сегодняшней сессии обучения
     * @param {CardState[]} allCardStates - Массив состояний всех карточек
     * @param {number} [maxCards=20] - Максимальное количество карточек
     * @returns {CardState[]} Отсортированный массив карточек для изучения
     */
    getDueCards(allCardStates, maxCards = 20) {
        const now = Date.now();
        const dueCards = [];
        const newCards = [];

        for (const state of allCardStates) {
            if (state.nextReview <= now) {
                if (state.repetitions === 0 && state.lastReview === null) {
                    newCards.push(state);
                } else {
                    dueCards.push(state);
                }
            }
        }

        // Сортируем: сначала карточки с просроченными повторениями, потом новые
        dueCards.sort((a, b) => a.nextReview - b.nextReview);

        // Ограничиваем количество новых карточек
        const maxNewCards = Math.min(5, maxCards - dueCards.length);
        const selectedNew = newCards.slice(0, Math.max(0, maxNewCards));

        // Объединяем и перемешиваем
        const result = [...dueCards, ...selectedNew];

        // Ограничиваем общее количество
        return result.slice(0, maxCards).sort(() => Math.random() - 0.5);
    },

    /**
     * Получает статистику по всем карточкам
     * @param {CardState[]} allCardStates - Массив состояний всех карточек
     * @returns {{dueToday: number, learned: number, total: number}} Объект статистики
     */
    getStats(allCardStates) {
        const now = Date.now();
        let dueToday = 0;
        let learned = 0;

        for (const state of allCardStates) {
            if (state.nextReview <= now) {
                dueToday++;
            }
            // Считаем "выученными" карточки с интервалом > 7 дней
            if (state.interval >= 7) {
                learned++;
            }
        }

        return {
            dueToday,
            learned,
            total: allCardStates.length
        };
    }
};
