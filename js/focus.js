/**
 * Режим фокусировки
 * Дыхательная анимация + мотивационные цитаты + ambient музыка (YouTube + локальные файлы)
 */
const Focus = {
    _initialized: false,
    _breathInterval: null,
    _currentTrack: null,
    _audio: null,

    quotes: [
        { text: 'Образование — самое мощное оружие, которое вы можете использовать, чтобы изменить мир.', author: 'Нельсон Мандела' },
        { text: 'Учёба — это не наполнение сосуда, а зажигание огня.', author: 'Плутарх' },
        { text: 'Живи так, будто завтра умрёшь. Учись так, будто будешь жить вечно.', author: 'Махатма Ганди' },
        { text: 'Знание — это сила.', author: 'Фрэнсис Бэкон' },
        { text: 'Единственный путь к великой работе — любить то, что ты делаешь.', author: 'Стив Джобс' },
        { text: 'Будущее принадлежит тем, кто верит в красоту своих мечтаний.', author: 'Элеонора Рузвельт' },
        { text: 'Трудности — это то, что делает жизнь интересной, а их преодоление — то, что делает её осмысленной.', author: 'Джошуа Марин' },
        { text: 'Корни учения горьки, а плоды — сладки.', author: 'Аристотель' },
        { text: 'Не важно, как медленно ты идёшь, главное — не останавливайся.', author: 'Конфуций' },
        { text: 'Упорство — мать удачи.', author: 'Мигель де Сервантес' },
        { text: 'Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.', author: 'Уинстон Черчилль' },
        { text: 'Образование — лучший друг. Образованного человека уважают везде.', author: 'Чанакья' },
        { text: 'Ум — это не сосуд, который нужно заполнить, а факел, который нужно зажечь.', author: 'Плутарх' },
        { text: 'Наука — это организованные знания. Мудрость — организованная жизнь.', author: 'Иммануил Кант' },
        { text: 'Дорогу осилит идущий.', author: 'Русская пословица' },
        { text: 'Без труда не выловишь и рыбку из пруда.', author: 'Русская пословица' }
    ],

    tracks: [
        { type: 'local', src: 'audio/my-head-is-empty.mp3', title: 'A Way Out', desc: 'My Head Is Empty ft Miranda Rain', icon: '🎶' },
        { type: 'youtube', id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Radio', desc: 'Расслабляющие биты для учёбы', icon: '🎧' },
        { type: 'youtube', id: '5qap5aO4i9A', title: 'Звуки дождя', desc: 'Успокаивающий шум дождя', icon: '🌧️' },
        { type: 'youtube', id: 'lTRiuFIWV54', title: 'Звуки камина', desc: 'Потрескивание огня для уюта', icon: '🔥' },
        { type: 'youtube', id: 'eKFTSSKCzWA', title: 'Звуки океана', desc: 'Морские волны для расслабления', icon: '🌊' },
        { type: 'youtube', id: '1ZYbU82GVz4', title: 'Пение птиц', desc: 'Утренний лес и природа', icon: '🐦' },
        { type: 'youtube', id: 'FjHGZj2IjBk', title: 'Ambient Piano', desc: 'Мягкая фортепианная музыка', icon: '🎹' },
        { type: 'youtube', id: '7NOSDKb0HlU', title: 'Космический эмбиент', desc: 'Глубокий космический ambient', icon: '🌌' },
        { type: 'youtube', id: 'tNkZsRW7h2c', title: 'Кафе атмосфера', desc: 'Фоновый гул уютного кафе', icon: '☕' }
    ],

    init() {
        if (this._initialized) return;
        this._initialized = true;
        this.render();
        this.startBreathCycle();
    },

    render() {
        const container = document.getElementById('tool-focus');
        const quote = this.getRandomQuote();

        const tracksHtml = this.tracks.map((track, i) => `
            <button class="focus-track ${this._currentTrack === i ? 'active' : ''}" data-index="${i}">
                <span class="focus-track-icon">${track.icon}</span>
                <div class="focus-track-info">
                    <span class="focus-track-title">${track.title}</span>
                    <span class="focus-track-desc">${track.desc}</span>
                </div>
                ${track.type === 'local' ? '<span class="focus-track-badge">офлайн</span>' : ''}
            </button>
        `).join('');

        container.innerHTML = `
            <div class="focus-container">
                <div class="focus-visual">
                    <div class="focus-breath-circle"></div>
                    <span class="focus-breath-text" id="focus-breath-text">Вдох...</span>
                </div>
                <div class="focus-quote">
                    <p class="focus-quote-text" id="focus-quote-text">"${quote.text}"</p>
                    <cite class="focus-quote-author" id="focus-quote-author">— ${quote.author}</cite>
                </div>
                <button class="focus-new-quote-btn" id="focus-new-quote-btn">Другая цитата</button>

                <div class="focus-music-section">
                    <h4 class="focus-music-title">🎵 Музыка для фокусировки</h4>
                    <div class="focus-tracks" id="focus-tracks">
                        ${tracksHtml}
                    </div>
                    <div class="focus-player-wrapper" id="focus-player-wrapper">
                        <div class="focus-player-placeholder">Выберите трек для воспроизведения</div>
                    </div>
                    ${this._currentTrack !== null ? `
                        <button class="focus-stop-btn" id="focus-stop-btn">Остановить</button>
                    ` : ''}
                </div>
            </div>
        `;

        document.getElementById('focus-new-quote-btn').addEventListener('click', () => this.showRandomQuote());

        document.getElementById('focus-tracks').addEventListener('click', (e) => {
            const trackBtn = e.target.closest('.focus-track');
            if (!trackBtn) return;
            const index = parseInt(trackBtn.dataset.index);
            this.playTrack(index);
        });

        const stopBtn = document.getElementById('focus-stop-btn');
        if (stopBtn) {
            stopBtn.addEventListener('click', () => this.stopTrack());
        }
    },

    playTrack(index) {
        const track = this.tracks[index];
        if (!track) return;

        // Останавливаем предыдущее воспроизведение
        this.stopAudio();

        this._currentTrack = index;

        // Обновляем active-класс на кнопках
        document.querySelectorAll('.focus-track').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        const wrapper = document.getElementById('focus-player-wrapper');

        if (track.type === 'local') {
            // Локальный аудиофайл — HTML5 Audio с loop
            this._audio = new Audio(track.src);
            this._audio.loop = true;
            this._audio.play();

            wrapper.innerHTML = `
                <div class="focus-local-player">
                    <div class="focus-local-player-info">
                        <span class="focus-local-player-icon">${track.icon}</span>
                        <div>
                            <div class="focus-local-player-title">${track.title}</div>
                            <div class="focus-local-player-desc">${track.desc}</div>
                        </div>
                    </div>
                    <div class="focus-local-player-controls">
                        <input type="range" class="focus-volume-slider" id="focus-volume" min="0" max="100" value="80">
                        <span class="focus-volume-label" id="focus-volume-label">80%</span>
                    </div>
                </div>
            `;

            this._audio.volume = 0.8;

            document.getElementById('focus-volume').addEventListener('input', (e) => {
                const vol = parseInt(e.target.value);
                if (this._audio) this._audio.volume = vol / 100;
                document.getElementById('focus-volume-label').textContent = vol + '%';
            });

        } else {
            // YouTube embed
            wrapper.innerHTML = `
                <iframe
                    class="focus-player-iframe"
                    src="https://www.youtube.com/embed/${track.id}?autoplay=1&loop=1&playlist=${track.id}"
                    title="${track.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `;
        }

        // Добавляем кнопку "Остановить", если её нет
        if (!document.getElementById('focus-stop-btn')) {
            const stopBtn = document.createElement('button');
            stopBtn.className = 'focus-stop-btn';
            stopBtn.id = 'focus-stop-btn';
            stopBtn.textContent = 'Остановить';
            stopBtn.addEventListener('click', () => this.stopTrack());
            wrapper.parentElement.appendChild(stopBtn);
        }
    },

    stopAudio() {
        if (this._audio) {
            this._audio.pause();
            this._audio.currentTime = 0;
            this._audio = null;
        }
    },

    stopTrack() {
        this.stopAudio();
        this._currentTrack = null;

        const wrapper = document.getElementById('focus-player-wrapper');
        if (wrapper) {
            wrapper.innerHTML = '<div class="focus-player-placeholder">Выберите трек для воспроизведения</div>';
        }

        document.querySelectorAll('.focus-track').forEach(btn => {
            btn.classList.remove('active');
        });

        const stopBtn = document.getElementById('focus-stop-btn');
        if (stopBtn) stopBtn.remove();
    },

    getRandomQuote() {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    },

    showRandomQuote() {
        const quote = this.getRandomQuote();
        document.getElementById('focus-quote-text').textContent = `"${quote.text}"`;
        document.getElementById('focus-quote-author').textContent = `— ${quote.author}`;
    },

    startBreathCycle() {
        const textEl = document.getElementById('focus-breath-text');
        if (!textEl) return;

        let isInhale = true;
        this._breathInterval = setInterval(() => {
            isInhale = !isInhale;
            if (textEl) {
                textEl.textContent = isInhale ? 'Вдох...' : 'Выдох...';
            }
        }, 4000);
    },

    destroy() {
        this.stopAudio();
        if (this._breathInterval) {
            clearInterval(this._breathInterval);
            this._breathInterval = null;
        }
    }
};
