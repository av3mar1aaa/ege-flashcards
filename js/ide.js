/**
 * Встроенный редактор кода
 * CodeMirror 5 (CDN) + Pyodide для запуска Python
 */
const IDE = {
    _initialized: false,
    _cmLoaded: false,
    _pyodideLoaded: false,
    _pyodideLoading: false,
    _pyodide: null,
    editor: null,

    init() {
        if (this._initialized) return;
        this._initialized = true;
        this.render();
        this.loadCodeMirror();
    },

    render() {
        const container = document.getElementById('tool-ide');
        container.innerHTML = `
            <div class="ide-container">
                <div class="ide-toolbar">
                    <select class="ide-lang-select" id="ide-lang-select">
                        <option value="python" selected>Python</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                    <button class="ide-run-btn" id="ide-run-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        Запустить
                    </button>
                    <button class="ide-clear-btn" id="ide-clear-btn">Очистить</button>
                </div>
                <div class="ide-editor" id="ide-editor-container"></div>
                <div class="ide-output-section">
                    <div class="ide-output-header">
                        <span>Вывод</span>
                        <button class="ide-output-clear" id="ide-output-clear">Очистить</button>
                    </div>
                    <pre class="ide-output" id="ide-output"></pre>
                </div>
                <div class="ide-loading hidden" id="ide-loading">
                    <span id="ide-loading-text">Загрузка...</span>
                    <div class="ide-loading-bar"><div class="ide-loading-progress"></div></div>
                </div>
            </div>
        `;

        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('ide-run-btn').addEventListener('click', () => this.runCode());
        document.getElementById('ide-clear-btn').addEventListener('click', () => {
            if (this.editor) {
                this.editor.setValue('');
            } else {
                const ta = document.querySelector('.ide-editor-fallback');
                if (ta) ta.value = '';
            }
        });
        document.getElementById('ide-output-clear').addEventListener('click', () => {
            document.getElementById('ide-output').textContent = '';
        });
        document.getElementById('ide-lang-select').addEventListener('change', (e) => {
            if (this.editor && this._cmLoaded) {
                const mode = e.target.value === 'python' ? 'python' : 'javascript';
                this.editor.setOption('mode', mode);
            }
        });
    },

    loadCodeMirror() {
        if (this._cmLoaded) {
            this.initEditor();
            return;
        }

        // Показываем fallback textarea пока грузится
        this.showFallbackEditor();

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css';
        document.head.appendChild(link);

        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/monokai.min.css';
        document.head.appendChild(themeLink);

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js';
        script.onload = () => {
            // Load Python mode
            const pyMode = document.createElement('script');
            pyMode.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js';
            pyMode.onload = () => {
                // Load JS mode
                const jsMode = document.createElement('script');
                jsMode.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js';
                jsMode.onload = () => {
                    this._cmLoaded = true;
                    this.initEditor();
                };
                document.head.appendChild(jsMode);
            };
            document.head.appendChild(pyMode);
        };
        script.onerror = () => {
            // CodeMirror не загрузился, оставляем fallback textarea
        };
        document.head.appendChild(script);
    },

    showFallbackEditor() {
        const container = document.getElementById('ide-editor-container');
        container.innerHTML = `<textarea class="ide-editor-fallback" spellcheck="false" placeholder="Напишите код здесь..."># Напишите код на Python\nprint("Привет, мир!")\n</textarea>`;
    },

    initEditor() {
        const container = document.getElementById('ide-editor-container');
        const fallback = container.querySelector('.ide-editor-fallback');
        const existingCode = fallback ? fallback.value : '# Напишите код на Python\nprint("Привет, мир!")\n';

        container.innerHTML = '';

        const lang = document.getElementById('ide-lang-select').value;
        this.editor = CodeMirror(container, {
            value: existingCode,
            mode: lang === 'python' ? 'python' : 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: false,
            matchBrackets: true,
            lineWrapping: true
        });

        // Обновляем размер после показа
        setTimeout(() => this.editor.refresh(), 100);
    },

    getCode() {
        if (this.editor) return this.editor.getValue();
        const ta = document.querySelector('.ide-editor-fallback');
        return ta ? ta.value : '';
    },

    async runCode() {
        const code = this.getCode();
        const output = document.getElementById('ide-output');
        const lang = document.getElementById('ide-lang-select').value;
        const runBtn = document.getElementById('ide-run-btn');

        output.textContent = '';

        if (lang === 'javascript') {
            this.runJavaScript(code, output);
            return;
        }

        // Python — нужен Pyodide
        if (!this._pyodideLoaded && !this._pyodideLoading) {
            this._pyodideLoading = true;
            runBtn.classList.add('loading');
            runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Загрузка...';

            const loadingEl = document.getElementById('ide-loading');
            const loadingText = document.getElementById('ide-loading-text');
            loadingEl.classList.remove('hidden');
            loadingText.textContent = 'Загрузка Python (Pyodide ~20 МБ)...';

            try {
                await this.loadPyodide();
                loadingEl.classList.add('hidden');
                this._pyodideLoaded = true;
                this._pyodideLoading = false;
                runBtn.classList.remove('loading');
                runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Запустить';
            } catch (e) {
                output.textContent = 'Ошибка загрузки Pyodide: ' + e.message + '\nПроверьте подключение к интернету.';
                loadingEl.classList.add('hidden');
                this._pyodideLoading = false;
                runBtn.classList.remove('loading');
                runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Запустить';
                return;
            }
        }

        if (this._pyodideLoading) {
            output.textContent = 'Pyodide ещё загружается, подождите...';
            return;
        }

        this.runPython(code, output);
    },

    loadPyodide() {
        return new Promise((resolve, reject) => {
            if (window.loadPyodide) {
                window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })
                    .then(pyodide => { this._pyodide = pyodide; resolve(); })
                    .catch(reject);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
            script.onload = () => {
                window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })
                    .then(pyodide => { this._pyodide = pyodide; resolve(); })
                    .catch(reject);
            };
            script.onerror = () => reject(new Error('Не удалось загрузить скрипт Pyodide'));
            document.head.appendChild(script);
        });
    },

    async runPython(code, output) {
        try {
            // Перенаправляем stdout
            this._pyodide.setStdout({ batched: (text) => {
                output.textContent += text + '\n';
            }});
            this._pyodide.setStderr({ batched: (text) => {
                output.innerHTML += '<span class="error">' + this.escapeHtml(text) + '</span>\n';
            }});

            output.textContent = '';
            await this._pyodide.runPythonAsync(code);
        } catch (e) {
            output.innerHTML += '<span class="error">' + this.escapeHtml(e.message) + '</span>\n';
        }
    },

    runJavaScript(code, output) {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const logs = [];

        console.log = (...args) => logs.push(args.map(a => this.formatJsValue(a)).join(' '));
        console.error = (...args) => logs.push('Ошибка: ' + args.map(a => this.formatJsValue(a)).join(' '));
        console.warn = (...args) => logs.push('Предупреждение: ' + args.map(a => this.formatJsValue(a)).join(' '));

        try {
            const result = new Function(code)();
            if (result !== undefined) {
                logs.push('→ ' + this.formatJsValue(result));
            }
        } catch (e) {
            logs.push('Ошибка: ' + e.message);
        }

        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;

        output.textContent = logs.join('\n');
    },

    formatJsValue(val) {
        if (val === null) return 'null';
        if (val === undefined) return 'undefined';
        if (typeof val === 'object') {
            try { return JSON.stringify(val, null, 2); } catch (e) { return String(val); }
        }
        return String(val);
    },

    escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
};
