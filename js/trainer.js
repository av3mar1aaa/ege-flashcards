/**
 * Тренажёр решения задач ЕГЭ
 * Генерирует случайные числовые задания по шаблонам
 * @module Trainer
 */

const Trainer = {
    currentProblem: null,
    currentCategory: null,
    score: { correct: 0, wrong: 0 },

    /**
     * Категории задач
     */
    categories: [
        { id: 'trig', name: 'Тригонометрия', icon: '📐', generator: 'generateTrigProblem' },
        { id: 'geometry', name: 'Геометрия', icon: '📦', generator: 'generateGeometryProblem' },
        { id: 'algebra', name: 'Алгебра', icon: '🔢', generator: 'generateAlgebraProblem' },
        { id: 'cs', name: 'Информатика', icon: '💻', generator: 'generateCSProblem' }
    ],

    /**
     * Генерирует новую задачу по категории
     * @param {string} categoryId
     * @returns {Object} {question, answer, hint, explanation}
     */
    generate(categoryId) {
        this.currentCategory = categoryId;
        const category = this.categories.find(c => c.id === categoryId);
        if (!category) return null;

        this.currentProblem = this[category.generator]();
        return this.currentProblem;
    },

    /**
     * Проверяет ответ пользователя
     * @param {string} userAnswer
     * @returns {Object} {correct, explanation, correctAnswer}
     */
    checkAnswer(userAnswer) {
        if (!this.currentProblem) return { correct: false };

        const answer = userAnswer.trim().replace(/\s+/g, ' ').toLowerCase();
        const correct = this.currentProblem.answers.some(a =>
            a.toLowerCase() === answer
        );

        if (correct) {
            this.score.correct++;
        } else {
            this.score.wrong++;
        }

        return {
            correct,
            explanation: this.currentProblem.explanation,
            correctAnswer: this.currentProblem.answers[0]
        };
    },

    /**
     * Сбрасывает счёт
     */
    resetScore() {
        this.score = { correct: 0, wrong: 0 };
    },

    // ===== ГЕНЕРАТОРЫ ЗАДАЧ =====

    /**
     * Генерирует тригонометрическую задачу
     */
    generateTrigProblem() {
        const types = [
            this._trigFindSin,
            this._trigFindCos,
            this._trigFindTg,
            this._trigDoubleAngle,
            this._trigQuadrant
        ];
        return types[Math.floor(Math.random() * types.length)].call(this);
    },

    _trigFindSin() {
        // cos(x) = a/b, найти sin(x)
        const pairs = [
            { cos: '3/5', sin: '4/5' },
            { cos: '5/13', sin: '12/13' },
            { cos: '8/17', sin: '15/17' },
            { cos: '7/25', sin: '24/25' },
            { cos: '4/5', sin: '3/5' },
            { cos: '12/13', sin: '5/13' },
            { cos: '15/17', sin: '8/17' },
            { cos: '24/25', sin: '7/25' },
            { cos: '1/2', sin: '√3/2' },
            { cos: '√2/2', sin: '√2/2' },
            { cos: '√3/2', sin: '1/2' }
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const quarter = Math.random() > 0.5 ? 1 : 4;
        const sign = quarter === 1 ? '' : '-';

        return {
            question: `Найдите $\\sin(x)$, если $\\cos(x) = ${pair.cos}$ и $x$ в ${quarter === 1 ? 'первой' : 'четвёртой'} четверти`,
            answers: [`${sign}${pair.sin}`, `${sign === '-' ? '-' : ''}${pair.sin}`],
            explanation: `По основному тригонометрическому тождеству: $\\sin^2(x) + \\cos^2(x) = 1$, значит $\\sin(x) = ${sign}\\sqrt{1 - (${pair.cos})^2} = ${sign}${pair.sin}$`,
            hint: 'Используйте тождество sin²x + cos²x = 1'
        };
    },

    _trigFindCos() {
        const pairs = [
            { sin: '3/5', cos: '4/5' },
            { sin: '5/13', cos: '12/13' },
            { sin: '8/17', cos: '15/17' },
            { sin: '1/2', cos: '√3/2' },
            { sin: '√2/2', cos: '√2/2' },
            { sin: '√3/2', cos: '1/2' }
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];

        return {
            question: `Найдите $\\cos(x)$, если $\\sin(x) = ${pair.sin}$ и $x$ в первой четверти`,
            answers: [pair.cos],
            explanation: `$\\cos(x) = \\sqrt{1 - \\sin^2(x)} = \\sqrt{1 - (${pair.sin})^2} = ${pair.cos}$`,
            hint: 'Используйте тождество sin²x + cos²x = 1'
        };
    },

    _trigFindTg() {
        const pairs = [
            { sin: '3/5', cos: '4/5', tg: '3/4' },
            { sin: '5/13', cos: '12/13', tg: '5/12' },
            { sin: '4/5', cos: '3/5', tg: '4/3' },
            { sin: '1/2', cos: '√3/2', tg: '1/√3' },
            { sin: '√3/2', cos: '1/2', tg: '√3' },
            { sin: '√2/2', cos: '√2/2', tg: '1' }
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];

        return {
            question: `Найдите $\\tg(x)$, если $\\sin(x) = ${pair.sin}$ и $\\cos(x) = ${pair.cos}$`,
            answers: [pair.tg],
            explanation: `$\\tg(x) = \\frac{\\sin(x)}{\\cos(x)} = \\frac{${pair.sin}}{${pair.cos}} = ${pair.tg}$`,
            hint: 'tg(x) = sin(x) / cos(x)'
        };
    },

    _trigDoubleAngle() {
        const values = [
            { sin: '3/5', cos: '4/5', sin2: '24/25', cos2: '7/25' },
            { sin: '1/2', cos: '√3/2', sin2: '√3/2', cos2: '1/2' },
            { sin: '√2/2', cos: '√2/2', sin2: '1', cos2: '0' }
        ];
        const v = values[Math.floor(Math.random() * values.length)];
        const askSin = Math.random() > 0.5;

        if (askSin) {
            return {
                question: `Найдите $\\sin(2x)$, если $\\sin(x) = ${v.sin}$ и $\\cos(x) = ${v.cos}$`,
                answers: [v.sin2],
                explanation: `$\\sin(2x) = 2\\sin(x)\\cos(x) = 2 \\cdot ${v.sin} \\cdot ${v.cos} = ${v.sin2}$`,
                hint: 'sin(2x) = 2·sin(x)·cos(x)'
            };
        } else {
            return {
                question: `Найдите $\\cos(2x)$, если $\\sin(x) = ${v.sin}$ и $\\cos(x) = ${v.cos}$`,
                answers: [v.cos2],
                explanation: `$\\cos(2x) = \\cos^2(x) - \\sin^2(x) = (${v.cos})^2 - (${v.sin})^2 = ${v.cos2}$`,
                hint: 'cos(2x) = cos²(x) - sin²(x)'
            };
        }
    },

    _trigQuadrant() {
        const angles = [
            { deg: 30, sin: '+', cos: '+', tg: '+', q: 1 },
            { deg: 150, sin: '+', cos: '-', tg: '-', q: 2 },
            { deg: 210, sin: '-', cos: '-', tg: '+', q: 3 },
            { deg: 330, sin: '-', cos: '+', tg: '-', q: 4 },
            { deg: 120, sin: '+', cos: '-', tg: '-', q: 2 },
            { deg: 225, sin: '-', cos: '-', tg: '+', q: 3 },
            { deg: 315, sin: '-', cos: '+', tg: '-', q: 4 }
        ];
        const a = angles[Math.floor(Math.random() * angles.length)];
        const func = ['sin', 'cos', 'tg'][Math.floor(Math.random() * 3)];

        return {
            question: `Определите знак $\\${func}(${a.deg}°)$: положительный (+) или отрицательный (−)?`,
            answers: [a[func], a[func] === '+' ? 'положительный' : 'отрицательный', a[func] === '+' ? '+' : '-'],
            explanation: `Угол ${a.deg}° находится в ${a.q}-й четверти. В ${a.q}-й четверти ${func} имеет знак «${a[func]}»`,
            hint: `В какой четверти находится угол ${a.deg}°?`
        };
    },

    /**
     * Генерирует задачу по геометрии
     */
    generateGeometryProblem() {
        const types = [
            this._geoTriangleArea,
            this._geoCircle,
            this._geoPythagorean,
            this._geoRectanglePerimeter
        ];
        return types[Math.floor(Math.random() * types.length)].call(this);
    },

    _geoTriangleArea() {
        const bases = [3, 4, 5, 6, 7, 8, 10, 12];
        const heights = [2, 3, 4, 5, 6, 8, 10];
        const a = bases[Math.floor(Math.random() * bases.length)];
        const h = heights[Math.floor(Math.random() * heights.length)];
        const area = (a * h) / 2;

        return {
            question: `Найдите площадь треугольника с основанием ${a} и высотой ${h}`,
            answers: [String(area), area % 1 !== 0 ? area.toFixed(1) : String(area)],
            explanation: `$S = \\frac{1}{2} \\cdot a \\cdot h = \\frac{1}{2} \\cdot ${a} \\cdot ${h} = ${area}$`,
            hint: 'S = ½ · a · h'
        };
    },

    _geoCircle() {
        const radii = [1, 2, 3, 4, 5, 6, 7, 10];
        const r = radii[Math.floor(Math.random() * radii.length)];
        const askArea = Math.random() > 0.5;

        if (askArea) {
            const area = Math.round(Math.PI * r * r * 100) / 100;
            return {
                question: `Найдите площадь круга с радиусом ${r} (ответ округлите до сотых)`,
                answers: [String(area), area.toFixed(2), String(Math.round(area * 10) / 10)],
                explanation: `$S = \\pi r^2 = \\pi \\cdot ${r}^2 = ${area}$`,
                hint: 'S = πr²'
            };
        } else {
            const circumference = Math.round(2 * Math.PI * r * 100) / 100;
            return {
                question: `Найдите длину окружности с радиусом ${r} (ответ округлите до сотых)`,
                answers: [String(circumference), circumference.toFixed(2), String(Math.round(circumference * 10) / 10)],
                explanation: `$C = 2\\pi r = 2\\pi \\cdot ${r} = ${circumference}$`,
                hint: 'C = 2πr'
            };
        }
    },

    _geoPythagorean() {
        const triples = [
            [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25],
            [6, 8, 10], [9, 12, 15], [10, 24, 26]
        ];
        const triple = triples[Math.floor(Math.random() * triples.length)];
        const askIndex = Math.floor(Math.random() * 3);

        const labels = ['первый катет', 'второй катет', 'гипотенуза'];
        const given = triple.filter((_, i) => i !== askIndex);
        const answer = triple[askIndex];

        if (askIndex === 2) {
            return {
                question: `Найдите гипотенузу прямоугольного треугольника, если катеты равны ${given[0]} и ${given[1]}`,
                answers: [String(answer)],
                explanation: `$c = \\sqrt{${given[0]}^2 + ${given[1]}^2} = \\sqrt{${given[0] * given[0]} + ${given[1] * given[1]}} = ${answer}$`,
                hint: 'Теорема Пифагора: c² = a² + b²'
            };
        } else {
            const otherCathetus = askIndex === 0 ? triple[1] : triple[0];
            return {
                question: `Найдите катет прямоугольного треугольника, если другой катет равен ${otherCathetus}, а гипотенуза равна ${triple[2]}`,
                answers: [String(answer)],
                explanation: `$a = \\sqrt{${triple[2]}^2 - ${otherCathetus}^2} = \\sqrt{${triple[2] * triple[2]} - ${otherCathetus * otherCathetus}} = ${answer}$`,
                hint: 'a² = c² - b²'
            };
        }
    },

    _geoRectanglePerimeter() {
        const a = Math.floor(Math.random() * 15) + 2;
        const b = Math.floor(Math.random() * 15) + 2;
        const type = Math.random() > 0.5 ? 'perimeter' : 'area';

        if (type === 'perimeter') {
            const p = 2 * (a + b);
            return {
                question: `Найдите периметр прямоугольника со сторонами ${a} и ${b}`,
                answers: [String(p)],
                explanation: `$P = 2(a + b) = 2(${a} + ${b}) = ${p}$`,
                hint: 'P = 2(a + b)'
            };
        } else {
            const s = a * b;
            return {
                question: `Найдите площадь прямоугольника со сторонами ${a} и ${b}`,
                answers: [String(s)],
                explanation: `$S = a \\cdot b = ${a} \\cdot ${b} = ${s}$`,
                hint: 'S = a · b'
            };
        }
    },

    /**
     * Генерирует задачу по алгебре
     */
    generateAlgebraProblem() {
        const types = [
            this._algQuadratic,
            this._algLog,
            this._algArithmetic,
            this._algPower
        ];
        return types[Math.floor(Math.random() * types.length)].call(this);
    },

    _algQuadratic() {
        // Генерируем уравнение с целыми корнями
        const x1 = Math.floor(Math.random() * 11) - 5;
        const x2 = Math.floor(Math.random() * 11) - 5;
        const a = 1;
        const b = -(x1 + x2);
        const c = x1 * x2;
        const D = b * b - 4 * a * c;

        const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;

        const roots = [x1, x2].sort((a, b) => a - b);
        const answersArr = x1 === x2
            ? [String(x1)]
            : [`${roots[0]}; ${roots[1]}`, `${roots[0]}, ${roots[1]}`, `${roots[0]} и ${roots[1]}`];

        return {
            question: `Решите уравнение: $x^2 ${bStr}x ${cStr} = 0$`,
            answers: answersArr,
            explanation: `$D = ${b}^2 - 4 \\cdot ${c} = ${D}$. Корни: $x_1 = ${roots[0]}$${x1 !== x2 ? `, $x_2 = ${roots[1]}$` : ''}`,
            hint: 'Используйте дискриминант: D = b² - 4ac'
        };
    },

    _algLog() {
        const bases = [2, 3, 5, 10];
        const base = bases[Math.floor(Math.random() * bases.length)];
        const exp = Math.floor(Math.random() * 5) + 1;
        const value = Math.pow(base, exp);

        return {
            question: `Вычислите $\\log_{${base}} ${value}$`,
            answers: [String(exp)],
            explanation: `$\\log_{${base}} ${value} = ${exp}$, так как $${base}^{${exp}} = ${value}$`,
            hint: `Какую степень числа ${base} нужно взять, чтобы получить ${value}?`
        };
    },

    _algArithmetic() {
        // Арифметическая прогрессия
        const a1 = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 5) + 1;
        const n = Math.floor(Math.random() * 8) + 3;

        const askType = Math.random() > 0.5 ? 'sum' : 'nth';

        if (askType === 'sum') {
            const an = a1 + (n - 1) * d;
            const sum = (a1 + an) * n / 2;
            return {
                question: `Найдите сумму первых ${n} членов арифметической прогрессии, если $a_1 = ${a1}$ и $d = ${d}$`,
                answers: [String(sum)],
                explanation: `$a_{${n}} = ${a1} + ${n - 1} \\cdot ${d} = ${an}$. $S_{${n}} = \\frac{(${a1} + ${an}) \\cdot ${n}}{2} = ${sum}$`,
                hint: 'Sₙ = (a₁ + aₙ)·n/2'
            };
        } else {
            const an = a1 + (n - 1) * d;
            return {
                question: `Найдите ${n}-й член арифметической прогрессии, если $a_1 = ${a1}$ и $d = ${d}$`,
                answers: [String(an)],
                explanation: `$a_{${n}} = a_1 + (n-1) \\cdot d = ${a1} + ${n - 1} \\cdot ${d} = ${an}$`,
                hint: 'aₙ = a₁ + (n-1)·d'
            };
        }
    },

    _algPower() {
        const base = Math.floor(Math.random() * 5) + 2;
        const exp1 = Math.floor(Math.random() * 4) + 1;
        const exp2 = Math.floor(Math.random() * 4) + 1;
        const op = Math.random() > 0.5 ? 'multiply' : 'divide';

        if (op === 'multiply') {
            const result = exp1 + exp2;
            return {
                question: `Упростите: $${base}^{${exp1}} \\cdot ${base}^{${exp2}}$`,
                answers: [String(Math.pow(base, result)), `${base}^${result}`],
                explanation: `$${base}^{${exp1}} \\cdot ${base}^{${exp2}} = ${base}^{${exp1}+${exp2}} = ${base}^{${result}} = ${Math.pow(base, result)}$`,
                hint: 'При умножении степеней с одинаковым основанием показатели складываются'
            };
        } else {
            const bigExp = Math.max(exp1, exp2) + Math.min(exp1, exp2);
            const smallExp = Math.min(exp1, exp2);
            const result = bigExp - smallExp;
            return {
                question: `Упростите: $\\frac{${base}^{${bigExp}}}{${base}^{${smallExp}}}$`,
                answers: [String(Math.pow(base, result)), `${base}^${result}`],
                explanation: `$\\frac{${base}^{${bigExp}}}{${base}^{${smallExp}}} = ${base}^{${bigExp}-${smallExp}} = ${base}^{${result}} = ${Math.pow(base, result)}$`,
                hint: 'При делении степеней с одинаковым основанием показатели вычитаются'
            };
        }
    },

    /**
     * Генерирует задачу по информатике
     */
    generateCSProblem() {
        const types = [
            this._csBinaryToDecimal,
            this._csDecimalToBinary,
            this._csLogic,
            this._csInfoVolume
        ];
        return types[Math.floor(Math.random() * types.length)].call(this);
    },

    _csBinaryToDecimal() {
        const decimal = Math.floor(Math.random() * 200) + 4;
        const binary = decimal.toString(2);

        return {
            question: `Переведите число $${binary}_2$ в десятичную систему счисления`,
            answers: [String(decimal)],
            explanation: `$${binary}_2 = ${binary.split('').map((b, i) => `${b} \\cdot 2^{${binary.length - 1 - i}}`).join(' + ')} = ${decimal}_{10}$`,
            hint: 'Умножьте каждый разряд на соответствующую степень двойки и сложите'
        };
    },

    _csDecimalToBinary() {
        const decimal = Math.floor(Math.random() * 100) + 5;
        const binary = decimal.toString(2);

        return {
            question: `Переведите число ${decimal} в двоичную систему счисления`,
            answers: [binary, binary + '₂'],
            explanation: `${decimal} = ${binary}_2$ (делим на 2 и записываем остатки снизу вверх)`,
            hint: 'Последовательно делите число на 2, записывая остатки'
        };
    },

    _csLogic() {
        const ops = [
            { name: 'И (AND)', op: (a, b) => a && b, sym: '∧' },
            { name: 'ИЛИ (OR)', op: (a, b) => a || b, sym: '∨' },
            { name: 'Исключающее ИЛИ (XOR)', op: (a, b) => a !== b, sym: '⊕' }
        ];
        const op = ops[Math.floor(Math.random() * ops.length)];
        const a = Math.random() > 0.5;
        const b = Math.random() > 0.5;
        const result = op.op(a, b) ? 1 : 0;

        return {
            question: `Вычислите: ${a ? 1 : 0} ${op.sym} ${b ? 1 : 0} (операция ${op.name})`,
            answers: [String(result)],
            explanation: `${a ? 1 : 0} ${op.sym} ${b ? 1 : 0} = ${result}`,
            hint: `Операция ${op.name}`
        };
    },

    _csInfoVolume() {
        const chars = [26, 32, 64, 128, 256];
        const charCount = chars[Math.floor(Math.random() * chars.length)];
        const bitsPerChar = Math.log2(charCount);
        const messageLength = Math.floor(Math.random() * 20) + 5;
        const totalBits = bitsPerChar * messageLength;
        const totalBytes = totalBits / 8;

        if (totalBits % 8 === 0) {
            return {
                question: `Алфавит содержит ${charCount} символов. Сообщение из ${messageLength} символов. Каков информационный объём в битах?`,
                answers: [String(totalBits)],
                explanation: `$i = \\log_2 ${charCount} = ${bitsPerChar}$ бит/символ. Объём: $${bitsPerChar} \\cdot ${messageLength} = ${totalBits}$ бит`,
                hint: 'i = log₂(N), объём = i · длина сообщения'
            };
        } else {
            return {
                question: `Алфавит содержит ${charCount} символов. Сколько бит нужно для кодирования одного символа?`,
                answers: [String(bitsPerChar)],
                explanation: `$i = \\log_2 ${charCount} = ${bitsPerChar}$ бит`,
                hint: 'i = log₂(N), где N — мощность алфавита'
            };
        }
    }
};
