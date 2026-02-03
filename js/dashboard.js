/**
 * Модуль дашборда статистики
 * Рендерит SVG-графики: тепловая карта, кольцевые диаграммы, недельный график
 * @module Dashboard
 */

const Dashboard = {
    /**
     * Рендерит весь дашборд
     */
    render() {
        this.renderStreakAndTotal();
        this.renderHeatmap();
        this.renderWeeklyChart();
        this.renderSubjectRings();
    },

    /**
     * Рендерит блок streak и общей статистики
     */
    renderStreakAndTotal() {
        const streak = Stats.getStreak();
        const totalAnswered = Stats.getTotalAnswered();
        const accuracy = Stats.getAccuracy();
        const todayStats = Stats.getTodayStats();
        const todayTotal = todayStats ? (todayStats.correct + todayStats.wrong) : 0;

        const container = document.getElementById('dashboard-overview');
        container.innerHTML = `
            <div class="dash-stat-card dash-streak">
                <div class="dash-stat-icon">${streak.current > 0 ? '🔥' : '❄️'}</div>
                <div class="dash-stat-value">${streak.current}</div>
                <div class="dash-stat-label">дн. подряд</div>
            </div>
            <div class="dash-stat-card">
                <div class="dash-stat-icon">✅</div>
                <div class="dash-stat-value">${todayTotal}</div>
                <div class="dash-stat-label">сегодня</div>
            </div>
            <div class="dash-stat-card">
                <div class="dash-stat-icon">📊</div>
                <div class="dash-stat-value">${totalAnswered}</div>
                <div class="dash-stat-label">всего</div>
            </div>
            <div class="dash-stat-card">
                <div class="dash-stat-icon">🎯</div>
                <div class="dash-stat-value">${accuracy}%</div>
                <div class="dash-stat-label">точность</div>
            </div>
        `;
    },

    /**
     * Рендерит тепловую карту активности (GitHub-стиль)
     */
    renderHeatmap() {
        const data = Stats.getHeatmapData();
        const container = document.getElementById('dashboard-heatmap');

        if (data.length === 0) {
            container.innerHTML = '<p class="dash-empty">Пока нет данных</p>';
            return;
        }

        const cellSize = 14;
        const cellGap = 3;
        const step = cellSize + cellGap;
        const labelWidth = 28;

        // Группируем по неделям
        const weeks = [];
        let currentWeek = [];
        data.forEach((d, i) => {
            const date = new Date(d.date);
            const dayOfWeek = date.getDay();
            const row = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Пн=0, Вс=6

            if (i === 0) {
                // Заполняем пустые ячейки до первого дня
                for (let j = 0; j < row; j++) {
                    currentWeek.push(null);
                }
            }

            currentWeek.push(d);

            if (row === 6 || i === data.length - 1) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

        const numWeeks = weeks.length;
        const svgWidth = labelWidth + numWeeks * step + 10;
        const svgHeight = 7 * step + 30;

        const isDark = document.documentElement.dataset.theme === 'dark';
        const colors = isDark
            ? ['#1e293b', '#1a3a2a', '#1a5c32', '#22803e', '#2ecc71']
            : ['#ebedf0', '#c6e48b', '#7bc96f', '#449d44', '#196127'];

        let svg = `<svg width="100%" viewBox="0 0 ${svgWidth} ${svgHeight}" class="heatmap-svg">`;

        // Подписи дней
        const dayLabels = ['Пн', '', 'Ср', '', 'Пт', '', 'Вс'];
        dayLabels.forEach((label, i) => {
            if (label) {
                svg += `<text x="0" y="${i * step + cellSize + 2}" class="heatmap-label">${label}</text>`;
            }
        });

        // Ячейки
        weeks.forEach((week, wi) => {
            week.forEach((day, di) => {
                if (!day) return;
                const x = labelWidth + wi * step;
                const y = di * step;
                const color = colors[day.level];
                const title = `${day.date}: ${day.count} ответов`;
                svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="3" fill="${color}" class="heatmap-cell">
                    <title>${title}</title>
                </rect>`;
            });
        });

        // Легенда
        const legendX = svgWidth - 120;
        const legendY = 7 * step + 8;
        svg += `<text x="${legendX - 40}" y="${legendY + 10}" class="heatmap-label">Меньше</text>`;
        colors.forEach((color, i) => {
            svg += `<rect x="${legendX + i * (cellSize + 2)}" y="${legendY}" width="${cellSize}" height="${cellSize}" rx="2" fill="${color}"/>`;
        });
        svg += `<text x="${legendX + 5 * (cellSize + 2) + 4}" y="${legendY + 10}" class="heatmap-label">Больше</text>`;

        svg += '</svg>';
        container.innerHTML = svg;
    },

    /**
     * Рендерит график активности за неделю
     */
    renderWeeklyChart() {
        const data = Stats.getWeeklyStats();
        const container = document.getElementById('dashboard-weekly');

        const maxVal = Math.max(...data.map(d => d.total), 1);
        const barWidth = 36;
        const barGap = 12;
        const chartHeight = 120;
        const chartWidth = 7 * (barWidth + barGap);
        const svgHeight = chartHeight + 40;

        let svg = `<svg width="100%" viewBox="0 0 ${chartWidth} ${svgHeight}" class="weekly-svg">`;

        data.forEach((d, i) => {
            const x = i * (barWidth + barGap) + barGap / 2;
            const barH = maxVal > 0 ? (d.total / maxVal) * chartHeight : 0;
            const correctH = maxVal > 0 ? (d.correct / maxVal) * chartHeight : 0;
            const wrongH = barH - correctH;

            // Фон бара
            svg += `<rect x="${x}" y="0" width="${barWidth}" height="${chartHeight}" rx="6" fill="var(--border)" opacity="0.3"/>`;

            // Неправильные (красные) - нижняя часть
            if (wrongH > 0) {
                svg += `<rect x="${x}" y="${chartHeight - barH}" width="${barWidth}" height="${wrongH}" rx="${barH === wrongH ? 6 : 0}" fill="var(--error)" opacity="0.7"/>`;
            }

            // Правильные (зелёные) - верхняя часть
            if (correctH > 0) {
                svg += `<rect x="${x}" y="${chartHeight - barH + wrongH}" width="${barWidth}" height="${correctH}" rx="6" fill="var(--success)" opacity="0.8"/>`;
            }

            // Значение сверху
            if (d.total > 0) {
                svg += `<text x="${x + barWidth / 2}" y="${chartHeight - barH - 5}" text-anchor="middle" class="weekly-value">${d.total}</text>`;
            }

            // День недели
            svg += `<text x="${x + barWidth / 2}" y="${chartHeight + 20}" text-anchor="middle" class="weekly-label">${d.day}</text>`;
        });

        svg += '</svg>';

        // Легенда
        svg += `<div class="weekly-legend">
            <span class="weekly-legend-item"><span class="weekly-dot" style="background:var(--success)"></span>Правильные</span>
            <span class="weekly-legend-item"><span class="weekly-dot" style="background:var(--error)"></span>Ошибки</span>
        </div>`;

        container.innerHTML = svg;
    },

    /**
     * Рендерит кольцевые диаграммы по предметам
     */
    renderSubjectRings() {
        const subjectStats = Stats.getSubjectStats();
        const container = document.getElementById('dashboard-subjects');

        const subjectNames = {
            trig: 'Тригонометрия',
            russian: 'Русский',
            cs: 'Информатика',
            algebra: 'Алгебра',
            geometry: 'Геометрия',
            exam: 'Экзамен',
            trainer: 'Тренажёр'
        };

        const subjectColors = {
            trig: '#6366f1',
            russian: '#ec4899',
            cs: '#06b6d4',
            algebra: '#f59e0b',
            geometry: '#10b981',
            exam: '#ef4444',
            trainer: '#8b5cf6'
        };

        let html = '';

        const subjects = Object.keys(subjectNames);
        const activeSubjects = subjects.filter(s => subjectStats[s] && subjectStats[s].total > 0);

        if (activeSubjects.length === 0) {
            container.innerHTML = '<p class="dash-empty">Начните учиться, чтобы увидеть статистику по предметам</p>';
            return;
        }

        activeSubjects.forEach(subject => {
            const data = subjectStats[subject];
            const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const color = subjectColors[subject] || '#6366f1';

            const ring = this.createRingSVG(accuracy, color, 60);

            html += `
                <div class="dash-subject-card">
                    <div class="dash-ring-container">
                        ${ring}
                        <span class="dash-ring-value">${accuracy}%</span>
                    </div>
                    <div class="dash-subject-name">${subjectNames[subject]}</div>
                    <div class="dash-subject-detail">${data.total} ответов</div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    /**
     * Создаёт SVG кольцевой диаграммы
     * @param {number} percent - Процент заполнения (0-100)
     * @param {string} color - Цвет заполнения
     * @param {number} size - Размер SVG
     * @returns {string} SVG-строка
     */
    createRingSVG(percent, color, size) {
        const strokeWidth = 6;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        return `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="ring-svg">
                <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
                    fill="none" stroke="var(--border)" stroke-width="${strokeWidth}"/>
                <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
                    fill="none" stroke="${color}" stroke-width="${strokeWidth}"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                    stroke-linecap="round"
                    transform="rotate(-90 ${size / 2} ${size / 2})"
                    class="ring-progress"/>
            </svg>
        `;
    }
};
