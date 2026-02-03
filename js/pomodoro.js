/**
 * Таймер Помодоро
 * Метод работы: фокус → перерыв → фокус → ...
 * Круговой SVG-прогресс, звуковые уведомления, Notification API
 */
const Pomodoro = {
    _initialized: false,
    isRunning: false,
    isBreak: false,
    workTime: 25 * 60,
    breakTime: 5 * 60,
    remaining: 25 * 60,
    sessions: 0,
    intervalId: null,
    /** @type {number|null} timestamp когда таймер был запущен */
    _startedAt: null,
    /** @type {number} оставшееся время на момент старта */
    _remainingAtStart: 0,

    init() {
        if (this._initialized) return;
        this._initialized = true;
        this.render();
        this.bindEvents();
        this.updateDisplay();
    },

    render() {
        const container = document.getElementById('tool-pomodoro');
        container.innerHTML = `
            <div class="pomo-container">
                <span class="pomo-mode-label" id="pomo-mode-label">Работа</span>
                <div class="pomo-timer-visual">
                    <svg class="pomo-circle" viewBox="0 0 200 200">
                        <circle class="pomo-circle-bg" cx="100" cy="100" r="90"/>
                        <circle class="pomo-circle-progress" id="pomo-progress" cx="100" cy="100" r="90"/>
                    </svg>
                    <div class="pomo-time-display" id="pomo-time">25:00</div>
                </div>
                <div class="pomo-controls">
                    <button class="pomo-ctrl-btn primary" id="pomo-start-btn">Старт</button>
                    <button class="pomo-ctrl-btn" id="pomo-reset-btn">Сброс</button>
                </div>
                <div class="pomo-settings">
                    <div class="pomo-setting">
                        <label>Работа (мин)</label>
                        <input type="number" id="pomo-work-input" value="25" min="1" max="120">
                    </div>
                    <div class="pomo-setting">
                        <label>Перерыв (мин)</label>
                        <input type="number" id="pomo-break-input" value="5" min="1" max="60">
                    </div>
                </div>
                <div class="pomo-sessions">
                    Сессии: <span class="pomo-sessions-count" id="pomo-sessions-count">0</span>
                </div>
            </div>
        `;
    },

    bindEvents() {
        document.getElementById('pomo-start-btn').addEventListener('click', () => this.toggleStart());
        document.getElementById('pomo-reset-btn').addEventListener('click', () => this.reset());

        document.getElementById('pomo-work-input').addEventListener('change', (e) => {
            const val = Math.max(1, Math.min(120, parseInt(e.target.value) || 25));
            e.target.value = val;
            this.workTime = val * 60;
            if (!this.isRunning && !this.isBreak) {
                this.remaining = this.workTime;
                this.updateDisplay();
            }
        });

        document.getElementById('pomo-break-input').addEventListener('change', (e) => {
            const val = Math.max(1, Math.min(60, parseInt(e.target.value) || 5));
            e.target.value = val;
            this.breakTime = val * 60;
            if (!this.isRunning && this.isBreak) {
                this.remaining = this.breakTime;
                this.updateDisplay();
            }
        });
    },

    toggleStart() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    },

    start() {
        this.isRunning = true;
        this._startedAt = Date.now();
        this._remainingAtStart = this.remaining;

        this.requestNotificationPermission();

        this.intervalId = setInterval(() => this.tick(), 250);
        document.getElementById('pomo-start-btn').textContent = 'Пауза';
        document.getElementById('pomo-start-btn').classList.add('primary');
    },

    pause() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.intervalId = null;
        this._startedAt = null;
        document.getElementById('pomo-start-btn').textContent = 'Старт';
    },

    reset() {
        this.pause();
        this.isBreak = false;
        this.remaining = this.workTime;
        this.updateDisplay();
        this.updateModeLabel();
    },

    tick() {
        // Используем реальное время вместо счётчика интервалов
        if (this._startedAt) {
            const elapsed = Math.floor((Date.now() - this._startedAt) / 1000);
            this.remaining = Math.max(0, this._remainingAtStart - elapsed);
        }

        this.updateDisplay();

        if (this.remaining <= 0) {
            this.onTimerEnd();
        }
    },

    onTimerEnd() {
        this.pause();
        this.playSound();
        this.showNotification();

        if (this.isBreak) {
            this.isBreak = false;
            this.remaining = this.workTime;
        } else {
            this.sessions++;
            document.getElementById('pomo-sessions-count').textContent = this.sessions;
            this.isBreak = true;
            this.remaining = this.breakTime;
        }

        this.updateModeLabel();
        this.updateDisplay();
    },

    playSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();

            // Играем три ноты
            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                const start = ctx.currentTime + i * 0.2;
                gain.gain.setValueAtTime(0.25, start);
                gain.gain.exponentialRampToValueAtTime(0.01, start + 0.5);
                osc.start(start);
                osc.stop(start + 0.5);
            });
        } catch (e) {
            // Web Audio API недоступен
        }
    },

    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            const title = this.isBreak ? 'Перерыв окончен!' : 'Время отдохнуть!';
            const body = this.isBreak
                ? 'Возвращайтесь к учёбе'
                : `Отличная работа! Сессия #${this.sessions + 1} завершена`;
            new Notification(title, { body });
        }
    },

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    },

    updateDisplay() {
        const minutes = Math.floor(this.remaining / 60);
        const seconds = this.remaining % 60;
        const timeStr = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

        const timeEl = document.getElementById('pomo-time');
        if (timeEl) timeEl.textContent = timeStr;

        // Круговой прогресс
        const total = this.isBreak ? this.breakTime : this.workTime;
        const progress = total > 0 ? this.remaining / total : 1;
        const circumference = 2 * Math.PI * 90; // 565.48
        const offset = circumference * (1 - progress);

        const progressEl = document.getElementById('pomo-progress');
        if (progressEl) {
            progressEl.style.strokeDashoffset = offset;
            progressEl.classList.toggle('break', this.isBreak);
        }
    },

    updateModeLabel() {
        const label = document.getElementById('pomo-mode-label');
        if (label) {
            label.textContent = this.isBreak ? 'Перерыв' : 'Работа';
            label.classList.toggle('break', this.isBreak);
        }
    }
};
