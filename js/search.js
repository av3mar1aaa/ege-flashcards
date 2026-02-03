/**
 * Глобальный поиск по всему контенту (Ctrl+K)
 * Ищет по формулам, заданиям, литературе
 * @module Search
 */

const Search = {
    /** @type {boolean} Открыт ли поиск */
    isOpen: false,

    /** @type {Array} Кэш поисковых записей */
    _index: null,

    /**
     * Инициализирует поиск
     */
    init() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    },

    /**
     * Построить поисковый индекс из всех данных
     * @returns {Array}
     */
    buildIndex() {
        if (this._index) return this._index;

        const index = [];

        // Тригонометрические формулы
        if (typeof TRIG_CARDS !== 'undefined') {
            TRIG_CARDS.forEach(card => {
                index.push({
                    type: 'trig',
                    typeLabel: 'Тригонометрия',
                    title: card.name,
                    subtitle: card.category,
                    searchText: `${card.name} ${card.aliases.join(' ')} ${card.category}`.toLowerCase(),
                    action: () => { App.showScreen('home'); }
                });
            });
        }

        // Алгебра
        if (typeof ALGEBRA_FORMULAS !== 'undefined') {
            for (const [key, section] of Object.entries(ALGEBRA_FORMULAS)) {
                section.formulas.forEach(formula => {
                    index.push({
                        type: 'algebra',
                        typeLabel: 'Алгебра',
                        title: formula.name,
                        subtitle: section.title,
                        searchText: `${formula.name} ${section.title} алгебра`.toLowerCase(),
                        action: () => { App.showAlgebraFormulas(key); }
                    });
                });
            }
        }

        // Планиметрия
        if (typeof PLANIMETRY_FORMULAS !== 'undefined') {
            for (const [key, section] of Object.entries(PLANIMETRY_FORMULAS)) {
                section.formulas.forEach(formula => {
                    index.push({
                        type: 'geometry',
                        typeLabel: 'Планиметрия',
                        title: formula.name,
                        subtitle: section.title,
                        searchText: `${formula.name} ${section.title} планиметрия геометрия`.toLowerCase(),
                        action: () => { App.showPlanimetryFormulas(key); }
                    });
                });
            }
        }

        // Стереометрия
        if (typeof STEREOMETRY_FORMULAS !== 'undefined') {
            for (const [key, section] of Object.entries(STEREOMETRY_FORMULAS)) {
                section.formulas.forEach(formula => {
                    index.push({
                        type: 'geometry',
                        typeLabel: 'Стереометрия',
                        title: formula.name,
                        subtitle: section.title,
                        searchText: `${formula.name} ${section.title} стереометрия геометрия`.toLowerCase(),
                        action: () => { App.showStereometryFormulas(key); }
                    });
                });
            }
        }

        // Русский язык — задания ЕГЭ
        if (typeof RUSSIAN_TASKS !== 'undefined') {
            RUSSIAN_TASKS.forEach(task => {
                index.push({
                    type: 'russian',
                    typeLabel: 'Русский',
                    title: `Задание ${task.id}. ${task.title}`,
                    subtitle: `${task.cards.length} карточек`,
                    searchText: `задание ${task.id} ${task.title} русский егэ`.toLowerCase(),
                    action: () => { App.openRussianTask(task.id); }
                });
            });
        }

        // Литература
        if (typeof LITERATURE_DATA !== 'undefined') {
            LITERATURE_DATA.forEach(work => {
                index.push({
                    type: 'literature',
                    typeLabel: 'Литература',
                    title: work.title,
                    subtitle: `${work.author}, ${work.year}`,
                    searchText: `${work.title} ${work.author} литература ${(work.themes || []).join(' ')}`.toLowerCase(),
                    action: () => { App.openLiteratureWork(work.id); }
                });
            });
        }

        // Информатика
        if (typeof CS_FORMULAS !== 'undefined') {
            for (const section of Object.values(CS_FORMULAS)) {
                section.formulas.forEach(f => {
                    index.push({
                        type: 'cs',
                        typeLabel: 'Информатика',
                        title: f.name,
                        subtitle: section.title,
                        searchText: `${f.name} ${section.title} информатика формула`.toLowerCase(),
                        action: () => { App.showCSFormulas(); }
                    });
                });
            }
        }
        if (typeof CS_TEMPLATES !== 'undefined') {
            for (const section of Object.values(CS_TEMPLATES)) {
                section.templates.forEach(t => {
                    index.push({
                        type: 'cs',
                        typeLabel: 'Информатика',
                        title: t.name,
                        subtitle: section.title,
                        searchText: `${t.name} ${t.description} ${section.title} информатика шаблон python`.toLowerCase(),
                        action: () => { App.showCSTemplates(); }
                    });
                });
            }
        }

        // Навигационные пункты
        index.push(
            { type: 'nav', typeLabel: 'Навигация', title: 'Дашборд статистики', subtitle: 'Прогресс обучения', searchText: 'дашборд статистика прогресс', action: () => { App.showDashboard(); } },
            { type: 'nav', typeLabel: 'Навигация', title: 'Тренажёр задач', subtitle: 'Случайные задания', searchText: 'тренажёр тренажер задачи', action: () => { App.showTrainer(); } },
            { type: 'nav', typeLabel: 'Навигация', title: 'Режим экзамена', subtitle: 'Имитация ЕГЭ', searchText: 'экзамен режим егэ таймер', action: () => { App.showExamSetup(); } },
            { type: 'nav', typeLabel: 'Навигация', title: 'Настройки', subtitle: 'Тема, шрифт, данные', searchText: 'настройки тема шрифт', action: () => { App.openSettings(); } }
        );

        this._index = index;
        return index;
    },

    /**
     * Поиск по запросу
     * @param {string} query
     * @returns {Array} Максимум 12 результатов
     */
    search(query) {
        const index = this.buildIndex();
        if (!query || query.length < 1) return index.slice(0, 8);

        const q = query.toLowerCase().trim();
        const words = q.split(/\s+/);

        const scored = index.map(item => {
            let score = 0;
            const text = item.searchText;

            words.forEach(word => {
                if (text.includes(word)) score += 10;
                if (item.title.toLowerCase().includes(word)) score += 20;
                if (item.title.toLowerCase().startsWith(word)) score += 30;
            });

            return { item, score };
        });

        return scored
            .filter(s => s.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 12)
            .map(s => s.item);
    },

    /**
     * Открывает окно поиска
     */
    open() {
        this.isOpen = true;
        const overlay = document.getElementById('search-overlay');
        overlay.classList.remove('hidden');

        const input = document.getElementById('search-input');
        input.value = '';
        input.focus();

        this.renderResults('');
    },

    /**
     * Закрывает окно поиска
     */
    close() {
        this.isOpen = false;
        document.getElementById('search-overlay').classList.add('hidden');
    },

    /**
     * Переключает окно поиска
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    /**
     * Рендерит результаты поиска
     * @param {string} query
     */
    renderResults(query) {
        const results = this.search(query);
        const container = document.getElementById('search-results');

        if (results.length === 0) {
            container.innerHTML = '<div class="search-empty">Ничего не найдено</div>';
            return;
        }

        const typeIcons = {
            trig: '📐', algebra: '🔢', geometry: '📦',
            russian: '📝', literature: '📚', cs: '💻',
            nav: '🧭'
        };

        let html = '';
        results.forEach((item, i) => {
            const icon = typeIcons[item.type] || '📄';
            html += `
                <div class="search-result-item" data-index="${i}" tabindex="0">
                    <span class="search-result-icon">${icon}</span>
                    <div class="search-result-info">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-subtitle">${item.typeLabel} · ${item.subtitle}</div>
                    </div>
                    <span class="search-result-arrow">→</span>
                </div>
            `;
        });

        container.innerHTML = html;

        // Привязываем клики
        container.querySelectorAll('.search-result-item').forEach((el, i) => {
            el.addEventListener('click', () => {
                results[i].action();
                this.close();
            });
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    results[i].action();
                    this.close();
                }
            });
        });
    },

    /**
     * Привязывает события ввода
     */
    bindEvents() {
        const input = document.getElementById('search-input');
        if (input) {
            input.addEventListener('input', (e) => {
                this.renderResults(e.target.value);
            });

            // Навигация по результатам стрелками
            input.addEventListener('keydown', (e) => {
                const items = document.querySelectorAll('.search-result-item');
                if (e.key === 'ArrowDown' && items.length > 0) {
                    e.preventDefault();
                    items[0].focus();
                }
            });
        }

        const overlay = document.getElementById('search-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target.id === 'search-overlay') {
                    this.close();
                }
            });
        }
    }
};
