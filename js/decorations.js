// Наборы декораций для разных разделов

const DECORATIONS = {
    // Тригонометрия
    trig: [
        'sin α', 'cos β', 'tg θ', 'ctg φ', 'π', '2π',
        'arcsin', 'arccos', 'arctg', 'sin²α', 'cos²β',
        '90°', '180°', '360°', '45°', '60°', '30°',
        'sin²+cos²=1', 'π/2', 'π/4', 'π/6',
        'tg·ctg=1', '∞', 'α', 'β', 'γ', 'θ', 'φ',
        'sin 2α', 'cos 2α', '±√', 'rad'
    ],

    // Геометрия
    geometry: [
        '△ABC', '□ABCD', '○', '∠α', '⊥', '∥',
        '≅', '~', 'S=πr²', 'P=2πr', 'V=⁴⁄₃πr³',
        'a²+b²=c²', 'S=½ah', 'S=ab', '∠=90°',
        '∠α+∠β+∠γ=180°', 'r', 'd=2r', 'h',
        '△', '□', '⬡', '⬢', 'AB∥CD', 'α=β',
        'S△', 'P□', 'диагональ', 'медиана'
    ],

    // Алгебра
    algebra: [
        'x²+y²', 'a+b=c', '√x', 'x³', 'xⁿ',
        '∑', '∏', 'lim', 'log₂x', 'ln x',
        'f(x)', 'y=kx+b', 'ax²+bx+c=0',
        'D=b²−4ac', 'x₁,₂', '|x|', 'n!',
        'aⁿ·aᵐ=aⁿ⁺ᵐ', '(a+b)²', 'a²−b²',
        '∈ℝ', '∈ℕ', '∈ℤ', '≤', '≥', '≠',
        '∞', '→', '∀x', '∃x'
    ],

    // Русский язык - правила, ударения, корни
    russian: [
        'звОнит', 'тОрты', 'бАнты', 'шАрфы',
        'красИвее', 'свЁкла', 'щавЕль', 'досУг',
        '-ЖИ-ШИ-', '-ЧА-ЩА-', '-ЧУ-ЩУ-',
        'НЕ с глаг.', '-ТСЯ/-ТЬСЯ', 'Ъ после прист.',
        '▪кор▪ень', '⟨при⟩ставка', 'суффикс▸',
        '«цитата»', '— тире —', '... многоточие',
        'причастие', 'деепричастие',
        'сказуемое', 'подлежащее',
        'СПП', 'ССП', 'БСП',
        'Н и НН', 'О/Ё после шип.',
        'чередование', 'проверяемая',
        'словарное', 'исключение'
    ],

    // Информатика - Python код и формулы
    cs: [
        'print("Hello")', 'for i in range:', 'if x > 0:',
        'def func():', 'return x', 'import math',
        'list.append()', 'len(arr)', 'str(x)',
        'while True:', 'break', 'continue',
        'I = log₂N', 'N = 2ⁱ', '1 байт = 8 бит',
        '2¹⁰ = 1024', 'K = I · N', 'V = K · i',
        'True/False', 'and or not', '== != >= <=',
        'try: except:', 'class:', 'self.',
        '#comment', '"""docstring"""',
        'lambda x:', '[x for x in]',
        'dict = {}', 'set()', 'tuple()'
    ]
};

// Генерация сетки позиций без наложений
function generateGridPositions(count) {
    const positions = [];

    // Определяем сетку: примерно 10 колонок и нужное количество рядов
    const cols = 8;
    const rows = Math.ceil(count / cols) + 2;

    // Размер ячейки в процентах
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    // Создаём все возможные позиции в сетке
    const allCells = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            allCells.push({ row, col });
        }
    }

    // Перемешиваем ячейки
    for (let i = allCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
    }

    // Берём нужное количество ячеек
    for (let i = 0; i < Math.min(count, allCells.length); i++) {
        const cell = allCells[i];

        // Добавляем небольшое случайное смещение внутри ячейки (20-80% от ячейки)
        const offsetX = 0.2 + Math.random() * 0.6;
        const offsetY = 0.2 + Math.random() * 0.6;

        const left = (cell.col + offsetX) * cellWidth;
        const top = (cell.row + offsetY) * cellHeight;

        positions.push({
            top: Math.min(95, Math.max(2, top)),
            left: Math.min(92, Math.max(2, left))
        });
    }

    return positions;
}

// Функция создания HTML для декораций
function generateDecorationsHTML(symbols, count = 70) {
    const positions = generateGridPositions(count);
    let html = '';

    for (let i = 0; i < positions.length; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const pos = positions[i];

        // Случайный угол поворота (от -20 до +20 градусов)
        const rotation = (Math.random() - 0.5) * 40;

        // Размер шрифта зависит от длины символа
        let fontSize;
        if (symbol.length <= 2) {
            fontSize = 1.4 + Math.random() * 0.8; // 1.4-2.2rem для коротких
        } else if (symbol.length <= 6) {
            fontSize = 1.1 + Math.random() * 0.5; // 1.1-1.6rem для средних
        } else {
            fontSize = 0.8 + Math.random() * 0.4; // 0.8-1.2rem для длинных
        }

        const style = `top: ${pos.top.toFixed(1)}%; left: ${pos.left.toFixed(1)}%; transform: rotate(${rotation.toFixed(0)}deg); font-size: ${fontSize.toFixed(2)}rem;`;
        html += `<span style="${style}">${symbol}</span>\n`;
    }

    return html;
}

// Функция смешивания массивов декораций
function mixDecorations(...arrays) {
    const result = [];
    arrays.forEach(arr => result.push(...arr));
    return result;
}

// Получить декорации для экрана
function getDecorationsForScreen(screenName) {
    switch (screenName) {
        case 'main':
            // Главный экран: смесь математики, русского и информатики (примерно 1/3 каждого)
            return mixDecorations(
                DECORATIONS.trig.slice(0, 8),
                DECORATIONS.geometry.slice(0, 8),
                DECORATIONS.algebra.slice(0, 8),
                DECORATIONS.russian.slice(0, 12),
                DECORATIONS.cs.slice(0, 12)
            );

        case 'math':
            // Раздел Математика: смесь тригонометрии, геометрии и алгебры
            return mixDecorations(
                DECORATIONS.trig,
                DECORATIONS.geometry,
                DECORATIONS.algebra
            );

        case 'home': // Тригонометрия
        case 'formulas':
        case 'card':
        case 'result':
        case 'complete':
            return DECORATIONS.trig;

        case 'geometry':
            return DECORATIONS.geometry;

        case 'algebra':
            return DECORATIONS.algebra;

        case 'russian':
            return DECORATIONS.russian;

        case 'cs':
            return DECORATIONS.cs;

        default:
            return DECORATIONS.trig;
    }
}

// Обновить декорации на странице
function updateDecorations(screenName) {
    const container = document.querySelector('.decorations');
    if (!container) return;

    const symbols = getDecorationsForScreen(screenName);
    container.innerHTML = generateDecorationsHTML(symbols, 70);
}
