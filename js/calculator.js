/**
 * Калькулятор с тремя режимами
 * - Обычный (стандартный)
 * - Научный (тригонометрия, логарифмы, степени)
 * - Программист (системы счисления, побитовые операции)
 */
const Calculator = {
    _initialized: false,
    mode: 'standard',
    expression: '',
    result: '0',
    lastResult: '',
    useDeg: true,
    progBase: 'dec',
    progValue: 0,

    init() {
        if (this._initialized) return;
        this._initialized = true;
        this.render();
        this.bindKeyboard();
    },

    render() {
        const container = document.getElementById('tool-calculator');
        container.innerHTML = `
            <div class="calc-container">
                <div class="calc-mode-switcher">
                    <button class="calc-mode-btn active" data-mode="standard">Обычный</button>
                    <button class="calc-mode-btn" data-mode="scientific">Научный</button>
                    <button class="calc-mode-btn" data-mode="programmer">Программист</button>
                </div>
                <div class="calc-display">
                    <div class="calc-expression" id="calc-expr"></div>
                    <div class="calc-result" id="calc-result">0</div>
                </div>
                <div class="calc-bases hidden" id="calc-bases">
                    <div class="calc-base active" data-base="hex">HEX: <span id="calc-hex">0</span></div>
                    <div class="calc-base" data-base="dec">DEC: <span id="calc-dec">0</span></div>
                    <div class="calc-base" data-base="oct">OCT: <span id="calc-oct">0</span></div>
                    <div class="calc-base" data-base="bin">BIN: <span id="calc-bin">0</span></div>
                </div>
                <div id="calc-extra"></div>
                <div class="calc-buttons" id="calc-buttons"></div>
            </div>
        `;

        container.querySelectorAll('.calc-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });

        container.querySelectorAll('.calc-base').forEach(el => {
            el.addEventListener('click', () => this.switchBase(el.dataset.base));
        });

        this.renderButtons();
    },

    switchMode(mode) {
        this.mode = mode;
        this.expression = '';
        this.result = '0';

        document.querySelectorAll('.calc-mode-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.mode === mode);
        });

        const basesEl = document.getElementById('calc-bases');
        const extraEl = document.getElementById('calc-extra');
        basesEl.classList.toggle('hidden', mode !== 'programmer');

        if (mode === 'scientific') {
            extraEl.innerHTML = `<button class="calc-deg-toggle ${this.useDeg ? 'active' : ''}" id="calc-deg-toggle">${this.useDeg ? 'DEG' : 'RAD'}</button>`;
            document.getElementById('calc-deg-toggle').addEventListener('click', () => {
                this.useDeg = !this.useDeg;
                const btn = document.getElementById('calc-deg-toggle');
                btn.textContent = this.useDeg ? 'DEG' : 'RAD';
                btn.classList.toggle('active', this.useDeg);
            });
        } else {
            extraEl.innerHTML = '';
        }

        if (mode === 'programmer') {
            this.progValue = 0;
            this.progBase = 'dec';
            this.updateBases();
        }

        this.renderButtons();
        this.updateDisplay();
    },

    switchBase(base) {
        this.progBase = base;
        document.querySelectorAll('.calc-base').forEach(el => {
            el.classList.toggle('active', el.dataset.base === base);
        });
        this.result = this.formatProgValue(this.progValue);
        this.expression = '';
        this.updateDisplay();
        this.renderButtons();
    },

    getStandardButtons() {
        return [
            { label: 'C', type: 'clear', action: 'clear' },
            { label: '()', type: 'func', action: 'paren' },
            { label: '%', type: 'func', action: 'percent' },
            { label: '÷', type: 'operator', action: 'op', value: '/' },
            { label: '7', action: 'digit', value: '7' },
            { label: '8', action: 'digit', value: '8' },
            { label: '9', action: 'digit', value: '9' },
            { label: '×', type: 'operator', action: 'op', value: '*' },
            { label: '4', action: 'digit', value: '4' },
            { label: '5', action: 'digit', value: '5' },
            { label: '6', action: 'digit', value: '6' },
            { label: '−', type: 'operator', action: 'op', value: '-' },
            { label: '1', action: 'digit', value: '1' },
            { label: '2', action: 'digit', value: '2' },
            { label: '3', action: 'digit', value: '3' },
            { label: '+', type: 'operator', action: 'op', value: '+' },
            { label: '±', type: 'func', action: 'negate' },
            { label: '0', action: 'digit', value: '0' },
            { label: '.', action: 'digit', value: '.' },
            { label: '=', type: 'equals', action: 'equals' }
        ];
    },

    getScientificButtons() {
        return [
            { label: 'sin', type: 'func', action: 'fn', value: 'sin' },
            { label: 'cos', type: 'func', action: 'fn', value: 'cos' },
            { label: 'tan', type: 'func', action: 'fn', value: 'tan' },
            { label: 'log', type: 'func', action: 'fn', value: 'log' },
            { label: 'ln', type: 'func', action: 'fn', value: 'ln' },
            { label: 'x²', type: 'func', action: 'fn', value: 'sq' },
            { label: 'xⁿ', type: 'func', action: 'fn', value: 'pow' },
            { label: '√', type: 'func', action: 'fn', value: 'sqrt' },
            { label: 'π', type: 'func', action: 'const', value: Math.PI },
            { label: 'e', type: 'func', action: 'const', value: Math.E },
            { label: 'C', type: 'clear', action: 'clear' },
            { label: '(', type: 'func', action: 'digit', value: '(' },
            { label: ')', type: 'func', action: 'digit', value: ')' },
            { label: '%', type: 'func', action: 'percent' },
            { label: '÷', type: 'operator', action: 'op', value: '/' },
            { label: '7', action: 'digit', value: '7' },
            { label: '8', action: 'digit', value: '8' },
            { label: '9', action: 'digit', value: '9' },
            { label: '×', type: 'operator', action: 'op', value: '*' },
            { label: '−', type: 'operator', action: 'op', value: '-' },
            { label: '4', action: 'digit', value: '4' },
            { label: '5', action: 'digit', value: '5' },
            { label: '6', action: 'digit', value: '6' },
            { label: '+', type: 'operator', action: 'op', value: '+' },
            { label: 'n!', type: 'func', action: 'fn', value: 'fact' },
            { label: '1', action: 'digit', value: '1' },
            { label: '2', action: 'digit', value: '2' },
            { label: '3', action: 'digit', value: '3' },
            { label: '±', type: 'func', action: 'negate' },
            { label: '=', type: 'equals', action: 'equals' },
            { label: '1/x', type: 'func', action: 'fn', value: 'inv' },
            { label: '|x|', type: 'func', action: 'fn', value: 'abs' },
            { label: '0', action: 'digit', value: '0' },
            { label: '.', action: 'digit', value: '.' },
            { label: '⌫', type: 'func', action: 'backspace' }
        ];
    },

    getProgrammerButtons() {
        const base = this.progBase;
        const hexDisabled = base !== 'hex';
        const abcdefDisabled = base !== 'hex';
        const digits89 = base === 'bin' || base === 'oct' ? false : true;
        const digits27 = base === 'bin' ? false : true;

        const isDigitAllowed = (d) => {
            const n = parseInt(d, 16);
            if (base === 'bin') return n <= 1;
            if (base === 'oct') return n <= 7;
            if (base === 'dec') return n <= 9;
            return true; // hex
        };

        return [
            { label: 'C', type: 'clear', action: 'clear' },
            { label: 'NOT', type: 'func', action: 'bitop', value: 'NOT' },
            { label: 'AND', type: 'operator', action: 'bitop', value: 'AND' },
            { label: 'OR', type: 'operator', action: 'bitop', value: 'OR' },
            { label: 'XOR', type: 'operator', action: 'bitop', value: 'XOR' },
            { label: '<<', type: 'operator', action: 'bitop', value: 'SHL' },
            { label: '>>', type: 'operator', action: 'bitop', value: 'SHR' },
            { label: '÷', type: 'operator', action: 'op', value: '/' },
            { label: 'A', action: 'digit', value: 'A', disabled: !isDigitAllowed('A') },
            { label: 'B', action: 'digit', value: 'B', disabled: !isDigitAllowed('B') },
            { label: 'C', action: 'digit', value: 'C', disabled: !isDigitAllowed('C') },
            { label: '×', type: 'operator', action: 'op', value: '*' },
            { label: 'D', action: 'digit', value: 'D', disabled: !isDigitAllowed('D') },
            { label: 'E', action: 'digit', value: 'E', disabled: !isDigitAllowed('E') },
            { label: 'F', action: 'digit', value: 'F', disabled: !isDigitAllowed('F') },
            { label: '−', type: 'operator', action: 'op', value: '-' },
            { label: '7', action: 'digit', value: '7', disabled: !isDigitAllowed('7') },
            { label: '8', action: 'digit', value: '8', disabled: !isDigitAllowed('8') },
            { label: '9', action: 'digit', value: '9', disabled: !isDigitAllowed('9') },
            { label: '+', type: 'operator', action: 'op', value: '+' },
            { label: '4', action: 'digit', value: '4', disabled: !isDigitAllowed('4') },
            { label: '5', action: 'digit', value: '5', disabled: !isDigitAllowed('5') },
            { label: '6', action: 'digit', value: '6', disabled: !isDigitAllowed('6') },
            { label: '±', type: 'func', action: 'negate' },
            { label: '1', action: 'digit', value: '1' },
            { label: '2', action: 'digit', value: '2', disabled: !isDigitAllowed('2') },
            { label: '3', action: 'digit', value: '3', disabled: !isDigitAllowed('3') },
            { label: '=', type: 'equals', action: 'equals' },
            { label: '⌫', type: 'func', action: 'backspace' },
            { label: '0', action: 'digit', value: '0' },
            { label: '.', action: 'digit', value: '.', disabled: this.progBase !== 'dec' },
            { label: 'MOD', type: 'operator', action: 'op', value: '%' }
        ];
    },

    renderButtons() {
        const container = document.getElementById('calc-buttons');
        let buttons;
        container.className = 'calc-buttons';

        switch (this.mode) {
            case 'scientific':
                buttons = this.getScientificButtons();
                container.classList.add('scientific');
                break;
            case 'programmer':
                buttons = this.getProgrammerButtons();
                break;
            default:
                buttons = this.getStandardButtons();
        }

        container.innerHTML = buttons.map(btn => {
            const cls = ['calc-btn'];
            if (btn.type) cls.push(btn.type);
            if (btn.span2) cls.push('span2');
            const disabled = btn.disabled ? 'disabled' : '';
            return `<button class="${cls.join(' ')}" data-action="${btn.action}" data-value="${btn.value || ''}" ${disabled}>${btn.label}</button>`;
        }).join('');

        container.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                this.handleButton(btn.dataset.action, btn.dataset.value);
            });
        });
    },

    handleButton(action, value) {
        switch (action) {
            case 'digit':
                if (this.mode === 'programmer') {
                    this.result = (this.result === '0' && value !== '.') ? value : this.result + value;
                    this.progValue = this.parseProgInput(this.result);
                    this.updateBases();
                } else {
                    if (this.lastResult && !this.expression) {
                        this.result = '';
                        this.lastResult = '';
                    }
                    this.result = (this.result === '0' && value !== '.') ? value : this.result + value;
                }
                break;

            case 'op':
                if (this.mode === 'programmer') {
                    this.expression = this.result + ' ' + this.getOpSymbol(value) + ' ';
                    this.result = '0';
                } else {
                    this.expression += this.result + ' ' + this.getOpSymbol(value) + ' ';
                    this.result = '0';
                    this.lastResult = '';
                }
                break;

            case 'equals':
                this.evaluate();
                break;

            case 'clear':
                this.expression = '';
                this.result = '0';
                this.lastResult = '';
                if (this.mode === 'programmer') {
                    this.progValue = 0;
                    this.updateBases();
                }
                break;

            case 'backspace':
                if (this.result.length > 1) {
                    this.result = this.result.slice(0, -1);
                } else {
                    this.result = '0';
                }
                if (this.mode === 'programmer') {
                    this.progValue = this.parseProgInput(this.result);
                    this.updateBases();
                }
                break;

            case 'negate':
                if (this.result !== '0') {
                    if (this.result.startsWith('-')) {
                        this.result = this.result.slice(1);
                    } else {
                        this.result = '-' + this.result;
                    }
                    if (this.mode === 'programmer') {
                        this.progValue = -this.progValue;
                        this.updateBases();
                    }
                }
                break;

            case 'percent':
                this.result = String(parseFloat(this.result) / 100);
                break;

            case 'paren':
                const open = (this.expression + this.result).split('(').length - 1;
                const close = (this.expression + this.result).split(')').length - 1;
                if (open > close && this.result !== '0' && this.result !== '(') {
                    this.result += ')';
                } else {
                    if (this.result === '0') {
                        this.result = '(';
                    } else {
                        this.expression += this.result + ' × ';
                        this.result = '(';
                    }
                }
                break;

            case 'fn':
                this.handleFunction(value);
                break;

            case 'const':
                this.result = String(parseFloat(value));
                break;

            case 'bitop':
                this.handleBitOp(value);
                break;
        }

        this.updateDisplay();
    },

    handleFunction(fn) {
        const val = parseFloat(this.result);
        let r;
        const toRad = (v) => this.useDeg ? v * Math.PI / 180 : v;

        switch (fn) {
            case 'sin': r = Math.sin(toRad(val)); break;
            case 'cos': r = Math.cos(toRad(val)); break;
            case 'tan': r = Math.tan(toRad(val)); break;
            case 'log': r = Math.log10(val); break;
            case 'ln': r = Math.log(val); break;
            case 'sqrt': r = Math.sqrt(val); break;
            case 'sq': r = val * val; break;
            case 'inv': r = 1 / val; break;
            case 'abs': r = Math.abs(val); break;
            case 'fact': r = this.factorial(Math.floor(val)); break;
            case 'pow':
                this.expression += this.result + ' ^ ';
                this.result = '0';
                return;
            default: return;
        }

        this.expression = fn + '(' + this.result + ')';
        this.result = this.formatResult(r);
    },

    handleBitOp(op) {
        if (op === 'NOT') {
            this.progValue = ~this.progValue;
            this.result = this.formatProgValue(this.progValue);
            this.updateBases();
            return;
        }

        this.expression = this.result + ' ' + op + ' ';
        this.result = '0';
    },

    evaluate() {
        let expr;

        if (this.mode === 'programmer') {
            expr = this.expression + this.result;
            try {
                const result = this.evalProgrammer(expr);
                this.progValue = result;
                this.expression = expr + ' =';
                this.result = this.formatProgValue(result);
                this.updateBases();
            } catch (e) {
                this.result = 'Ошибка';
            }
            return;
        }

        expr = this.expression + this.result;

        // Заменяем символы на JS-операторы
        let jsExpr = expr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')
            .replace(/\^/g, '**')
            .replace(/ = ?$/g, '');

        // Валидация: только допустимые символы
        if (!/^[\d\s+\-*/.%()e**]+$/.test(jsExpr)) {
            this.result = 'Ошибка';
            this.updateDisplay();
            return;
        }

        try {
            const fn = new Function('return ' + jsExpr);
            const r = fn();
            if (typeof r === 'number' && isFinite(r)) {
                this.expression = expr + ' =';
                this.result = this.formatResult(r);
                this.lastResult = this.result;
            } else {
                this.result = 'Ошибка';
            }
        } catch (e) {
            this.result = 'Ошибка';
        }
    },

    evalProgrammer(exprStr) {
        const parts = exprStr.trim().split(/\s+/);
        if (parts.length < 3) {
            return this.parseProgInput(parts[0] || '0');
        }

        let left = this.parseProgInput(parts[0]);
        for (let i = 1; i < parts.length - 1; i += 2) {
            const op = parts[i];
            const right = this.parseProgInput(parts[i + 1]);
            switch (op) {
                case '+': left = left + right; break;
                case '−': case '-': left = left - right; break;
                case '×': case '*': left = left * right; break;
                case '÷': case '/': left = right !== 0 ? Math.trunc(left / right) : 0; break;
                case '%': left = left % right; break;
                case 'AND': left = left & right; break;
                case 'OR': left = left | right; break;
                case 'XOR': left = left ^ right; break;
                case 'SHL': case '<<': left = left << right; break;
                case 'SHR': case '>>': left = left >> right; break;
            }
        }
        return left;
    },

    parseProgInput(str) {
        if (!str || str === '0') return 0;
        const s = str.toString().trim();
        switch (this.progBase) {
            case 'hex': return parseInt(s, 16) || 0;
            case 'oct': return parseInt(s, 8) || 0;
            case 'bin': return parseInt(s, 2) || 0;
            default: return parseInt(s, 10) || 0;
        }
    },

    formatProgValue(val) {
        const v = Math.trunc(val);
        switch (this.progBase) {
            case 'hex': return v.toString(16).toUpperCase();
            case 'oct': return v.toString(8);
            case 'bin': return v.toString(2);
            default: return v.toString(10);
        }
    },

    updateBases() {
        const v = Math.trunc(this.progValue);
        const hexEl = document.getElementById('calc-hex');
        const decEl = document.getElementById('calc-dec');
        const octEl = document.getElementById('calc-oct');
        const binEl = document.getElementById('calc-bin');

        if (hexEl) hexEl.textContent = v.toString(16).toUpperCase();
        if (decEl) decEl.textContent = v.toString(10);
        if (octEl) octEl.textContent = v.toString(8);
        if (binEl) binEl.textContent = v.toString(2);
    },

    getOpSymbol(op) {
        switch (op) {
            case '*': return '×';
            case '/': return '÷';
            case '-': return '−';
            default: return op;
        }
    },

    formatResult(n) {
        if (!isFinite(n)) return 'Ошибка';
        // Убираем погрешность float
        const s = parseFloat(n.toPrecision(12)).toString();
        return s;
    },

    factorial(n) {
        if (n < 0) return NaN;
        if (n <= 1) return 1;
        if (n > 170) return Infinity;
        let r = 1;
        for (let i = 2; i <= n; i++) r *= i;
        return r;
    },

    updateDisplay() {
        const exprEl = document.getElementById('calc-expr');
        const resultEl = document.getElementById('calc-result');
        if (exprEl) exprEl.textContent = this.expression;
        if (resultEl) resultEl.textContent = this.result;
    },

    bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (!Tools.isOpen || Tools.currentTab !== 'calculator') return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key;
            if (/^[0-9.]$/.test(key)) {
                this.handleButton('digit', key);
                e.preventDefault();
            } else if (key === '+') {
                this.handleButton('op', '+');
                e.preventDefault();
            } else if (key === '-') {
                this.handleButton('op', '-');
                e.preventDefault();
            } else if (key === '*') {
                this.handleButton('op', '*');
                e.preventDefault();
            } else if (key === '/') {
                this.handleButton('op', '/');
                e.preventDefault();
            } else if (key === 'Enter' || key === '=') {
                this.handleButton('equals', '');
                e.preventDefault();
            } else if (key === 'Backspace') {
                this.handleButton('backspace', '');
                e.preventDefault();
            } else if (key === 'Escape') {
                this.handleButton('clear', '');
            }
        });
    }
};
