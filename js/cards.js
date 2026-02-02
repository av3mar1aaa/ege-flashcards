// База формул по тригонометрии
// formula - формула в формате LaTeX для KaTeX
// name - название формулы
// aliases - альтернативные названия для проверки ввода

// Порядок категорий для отображения
const CATEGORIES_ORDER = [
    "Основные тождества",
    "Чётность",
    "Формулы приведения",
    "Сложение и вычитание",
    "Двойной угол",
    "Половинный угол",
    "Сумма в произведение",
    "Произведение в сумму",
    "Понижение степени",
    "Производные",
    "Решения уравнений",
    "Теоремы треугольника"
];

const TRIG_CARDS = [
    // ===== ОСНОВНЫЕ ТОЖДЕСТВА =====
    {
        id: 1,
        formula: "\\sin^2\\alpha + \\cos^2\\alpha = 1",
        name: "Основное тригонометрическое тождество",
        aliases: ["основное тождество", "sin2+cos2=1"],
        category: "Основные тождества"
    },
    {
        id: 2,
        formula: "\\tg\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}",
        name: "Определение тангенса",
        aliases: ["тангенс", "tg=sin/cos"],
        category: "Основные тождества"
    },
    {
        id: 3,
        formula: "\\ctg\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}",
        name: "Определение котангенса",
        aliases: ["котангенс", "ctg=cos/sin"],
        category: "Основные тождества"
    },
    {
        id: 4,
        formula: "\\tg\\alpha \\cdot \\ctg\\alpha = 1",
        name: "Связь тангенса и котангенса",
        aliases: ["tg*ctg=1"],
        category: "Основные тождества"
    },
    {
        id: 5,
        formula: "1 + \\tg^2\\alpha = \\frac{1}{\\cos^2\\alpha}",
        name: "Тождество с тангенсом",
        aliases: ["1+tg2", "секанс квадрат"],
        category: "Основные тождества"
    },
    {
        id: 6,
        formula: "1 + \\ctg^2\\alpha = \\frac{1}{\\sin^2\\alpha}",
        name: "Тождество с котангенсом",
        aliases: ["1+ctg2", "косеканс квадрат"],
        category: "Основные тождества"
    },

    // ===== ЧЁТНОСТЬ =====
    {
        id: 7,
        formula: "\\sin(-\\alpha) = -\\sin\\alpha",
        name: "Синус — нечётная функция",
        aliases: ["sin нечетная", "синус минус альфа"],
        category: "Чётность"
    },
    {
        id: 8,
        formula: "\\cos(-\\alpha) = \\cos\\alpha",
        name: "Косинус — чётная функция",
        aliases: ["cos четная", "косинус минус альфа"],
        category: "Чётность"
    },
    {
        id: 9,
        formula: "\\tg(-\\alpha) = -\\tg\\alpha",
        name: "Тангенс — нечётная функция",
        aliases: ["tg нечетная", "тангенс минус альфа"],
        category: "Чётность"
    },
    {
        id: 10,
        formula: "\\ctg(-\\alpha) = -\\ctg\\alpha",
        name: "Котангенс — нечётная функция",
        aliases: ["ctg нечетная", "котангенс минус альфа"],
        category: "Чётность"
    },

    // ===== ФОРМУЛЫ ПРИВЕДЕНИЯ =====
    {
        id: 11,
        formula: "\\sin(90° - \\alpha) = \\cos\\alpha",
        name: "sin(90° − α) = cos α",
        aliases: ["sin(90-a)", "синус 90 минус альфа"],
        category: "Формулы приведения"
    },
    {
        id: 12,
        formula: "\\cos(90° - \\alpha) = \\sin\\alpha",
        name: "cos(90° − α) = sin α",
        aliases: ["cos(90-a)", "косинус 90 минус альфа"],
        category: "Формулы приведения"
    },
    {
        id: 13,
        formula: "\\sin(90° + \\alpha) = \\cos\\alpha",
        name: "sin(90° + α) = cos α",
        aliases: ["sin(90+a)", "синус 90 плюс альфа"],
        category: "Формулы приведения"
    },
    {
        id: 14,
        formula: "\\cos(90° + \\alpha) = -\\sin\\alpha",
        name: "cos(90° + α) = −sin α",
        aliases: ["cos(90+a)", "косинус 90 плюс альфа"],
        category: "Формулы приведения"
    },
    {
        id: 15,
        formula: "\\sin(180° - \\alpha) = \\sin\\alpha",
        name: "sin(180° − α) = sin α",
        aliases: ["sin(180-a)", "синус 180 минус альфа"],
        category: "Формулы приведения"
    },
    {
        id: 16,
        formula: "\\cos(180° - \\alpha) = -\\cos\\alpha",
        name: "cos(180° − α) = −cos α",
        aliases: ["cos(180-a)", "косинус 180 минус альфа"],
        category: "Формулы приведения"
    },
    {
        id: 17,
        formula: "\\sin(180° + \\alpha) = -\\sin\\alpha",
        name: "sin(180° + α) = −sin α",
        aliases: ["sin(180+a)", "синус 180 плюс альфа"],
        category: "Формулы приведения"
    },
    {
        id: 18,
        formula: "\\cos(180° + \\alpha) = -\\cos\\alpha",
        name: "cos(180° + α) = −cos α",
        aliases: ["cos(180+a)", "косинус 180 плюс альфа"],
        category: "Формулы приведения"
    },

    // ===== СЛОЖЕНИЕ И ВЫЧИТАНИЕ =====
    {
        id: 19,
        formula: "\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta",
        name: "Синус суммы",
        aliases: ["sin(a+b)", "синус суммы углов"],
        category: "Сложение и вычитание"
    },
    {
        id: 20,
        formula: "\\sin(\\alpha - \\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta",
        name: "Синус разности",
        aliases: ["sin(a-b)", "синус разности углов"],
        category: "Сложение и вычитание"
    },
    {
        id: 21,
        formula: "\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta",
        name: "Косинус суммы",
        aliases: ["cos(a+b)", "косинус суммы углов"],
        category: "Сложение и вычитание"
    },
    {
        id: 22,
        formula: "\\cos(\\alpha - \\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta",
        name: "Косинус разности",
        aliases: ["cos(a-b)", "косинус разности углов"],
        category: "Сложение и вычитание"
    },
    {
        id: 23,
        formula: "\\tg(\\alpha + \\beta) = \\frac{\\tg\\alpha + \\tg\\beta}{1 - \\tg\\alpha\\tg\\beta}",
        name: "Тангенс суммы",
        aliases: ["tg(a+b)", "тангенс суммы углов"],
        category: "Сложение и вычитание"
    },
    {
        id: 24,
        formula: "\\tg(\\alpha - \\beta) = \\frac{\\tg\\alpha - \\tg\\beta}{1 + \\tg\\alpha\\tg\\beta}",
        name: "Тангенс разности",
        aliases: ["tg(a-b)", "тангенс разности углов"],
        category: "Сложение и вычитание"
    },

    // ===== ДВОЙНОЙ УГОЛ =====
    {
        id: 25,
        formula: "\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha",
        name: "Синус двойного угла",
        aliases: ["sin2a", "синус удвоенного угла"],
        category: "Двойной угол"
    },
    {
        id: 26,
        formula: "\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha",
        name: "Косинус двойного угла",
        aliases: ["cos2a", "косинус удвоенного угла"],
        category: "Двойной угол"
    },
    {
        id: 27,
        formula: "\\cos 2\\alpha = 2\\cos^2\\alpha - 1",
        name: "Косинус двойного угла (через cos)",
        aliases: ["cos2a через cos"],
        category: "Двойной угол"
    },
    {
        id: 28,
        formula: "\\cos 2\\alpha = 1 - 2\\sin^2\\alpha",
        name: "Косинус двойного угла (через sin)",
        aliases: ["cos2a через sin"],
        category: "Двойной угол"
    },
    {
        id: 29,
        formula: "\\tg 2\\alpha = \\frac{2\\tg\\alpha}{1 - \\tg^2\\alpha}",
        name: "Тангенс двойного угла",
        aliases: ["tg2a", "тангенс удвоенного угла"],
        category: "Двойной угол"
    },

    // ===== ПОЛОВИННЫЙ УГОЛ =====
    {
        id: 30,
        formula: "\\sin\\frac{\\alpha}{2} = \\pm\\sqrt{\\frac{1 - \\cos\\alpha}{2}}",
        name: "Синус половинного угла",
        aliases: ["sin(a/2)", "синус половины угла"],
        category: "Половинный угол"
    },
    {
        id: 31,
        formula: "\\cos\\frac{\\alpha}{2} = \\pm\\sqrt{\\frac{1 + \\cos\\alpha}{2}}",
        name: "Косинус половинного угла",
        aliases: ["cos(a/2)", "косинус половины угла"],
        category: "Половинный угол"
    },
    {
        id: 32,
        formula: "\\tg\\frac{\\alpha}{2} = \\frac{\\sin\\alpha}{1 + \\cos\\alpha} = \\frac{1 - \\cos\\alpha}{\\sin\\alpha}",
        name: "Тангенс половинного угла",
        aliases: ["tg(a/2)", "тангенс половины угла"],
        category: "Половинный угол"
    },

    // ===== СУММА В ПРОИЗВЕДЕНИЕ =====
    {
        id: 33,
        formula: "\\sin\\alpha + \\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}",
        name: "Сумма синусов",
        aliases: ["sin+sin", "синус плюс синус"],
        category: "Сумма в произведение"
    },
    {
        id: 34,
        formula: "\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}",
        name: "Разность синусов",
        aliases: ["sin-sin", "синус минус синус"],
        category: "Сумма в произведение"
    },
    {
        id: 35,
        formula: "\\cos\\alpha + \\cos\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}",
        name: "Сумма косинусов",
        aliases: ["cos+cos", "косинус плюс косинус"],
        category: "Сумма в произведение"
    },
    {
        id: 36,
        formula: "\\cos\\alpha - \\cos\\beta = -2\\sin\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}",
        name: "Разность косинусов",
        aliases: ["cos-cos", "косинус минус косинус"],
        category: "Сумма в произведение"
    },

    // ===== ПРОИЗВЕДЕНИЕ В СУММУ =====
    {
        id: 37,
        formula: "\\sin\\alpha\\sin\\beta = \\frac{1}{2}[\\cos(\\alpha-\\beta) - \\cos(\\alpha+\\beta)]",
        name: "Произведение синусов",
        aliases: ["sin*sin", "синус на синус"],
        category: "Произведение в сумму"
    },
    {
        id: 38,
        formula: "\\cos\\alpha\\cos\\beta = \\frac{1}{2}[\\cos(\\alpha-\\beta) + \\cos(\\alpha+\\beta)]",
        name: "Произведение косинусов",
        aliases: ["cos*cos", "косинус на косинус"],
        category: "Произведение в сумму"
    },
    {
        id: 39,
        formula: "\\sin\\alpha\\cos\\beta = \\frac{1}{2}[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)]",
        name: "Произведение синуса и косинуса",
        aliases: ["sin*cos", "синус на косинус"],
        category: "Произведение в сумму"
    },

    // ===== ПОНИЖЕНИЕ СТЕПЕНИ =====
    {
        id: 40,
        formula: "\\sin^2\\alpha = \\frac{1 - \\cos 2\\alpha}{2}",
        name: "Понижение степени sin²",
        aliases: ["sin2", "синус квадрат"],
        category: "Понижение степени"
    },
    {
        id: 41,
        formula: "\\cos^2\\alpha = \\frac{1 + \\cos 2\\alpha}{2}",
        name: "Понижение степени cos²",
        aliases: ["cos2", "косинус квадрат"],
        category: "Понижение степени"
    },
    {
        id: 42,
        formula: "\\tg^2\\alpha = \\frac{1 - \\cos 2\\alpha}{1 + \\cos 2\\alpha}",
        name: "Понижение степени tg²",
        aliases: ["tg2", "тангенс квадрат"],
        category: "Понижение степени"
    },

    // ===== ПРОИЗВОДНЫЕ =====
    {
        id: 43,
        formula: "(\\sin x)' = \\cos x",
        name: "Производная синуса",
        aliases: ["sin'", "производная sin"],
        category: "Производные"
    },
    {
        id: 44,
        formula: "(\\cos x)' = -\\sin x",
        name: "Производная косинуса",
        aliases: ["cos'", "производная cos"],
        category: "Производные"
    },
    {
        id: 45,
        formula: "(\\tg x)' = \\frac{1}{\\cos^2 x}",
        name: "Производная тангенса",
        aliases: ["tg'", "производная tg"],
        category: "Производные"
    },
    {
        id: 46,
        formula: "(\\ctg x)' = -\\frac{1}{\\sin^2 x}",
        name: "Производная котангенса",
        aliases: ["ctg'", "производная ctg"],
        category: "Производные"
    },
    {
        id: 47,
        formula: "(\\arcsin x)' = \\frac{1}{\\sqrt{1-x^2}}",
        name: "Производная арксинуса",
        aliases: ["arcsin'", "производная arcsin"],
        category: "Производные"
    },
    {
        id: 48,
        formula: "(\\arccos x)' = -\\frac{1}{\\sqrt{1-x^2}}",
        name: "Производная арккосинуса",
        aliases: ["arccos'", "производная arccos"],
        category: "Производные"
    },
    {
        id: 49,
        formula: "(\\arctg x)' = \\frac{1}{1+x^2}",
        name: "Производная арктангенса",
        aliases: ["arctg'", "производная arctg"],
        category: "Производные"
    },
    {
        id: 50,
        formula: "(\\arcctg x)' = -\\frac{1}{1+x^2}",
        name: "Производная арккотангенса",
        aliases: ["arcctg'", "производная arcctg"],
        category: "Производные"
    },

    // ===== РЕШЕНИЯ УРАВНЕНИЙ =====
    {
        id: 51,
        formula: "\\sin x = a \\Rightarrow x = (-1)^n \\arcsin a + \\pi n",
        name: "Общее решение sin x = a",
        aliases: ["sinx=a", "уравнение с синусом"],
        category: "Решения уравнений"
    },
    {
        id: 52,
        formula: "\\cos x = a \\Rightarrow x = \\pm \\arccos a + 2\\pi n",
        name: "Общее решение cos x = a",
        aliases: ["cosx=a", "уравнение с косинусом"],
        category: "Решения уравнений"
    },
    {
        id: 53,
        formula: "\\tg x = a \\Rightarrow x = \\arctg a + \\pi n",
        name: "Общее решение tg x = a",
        aliases: ["tgx=a", "уравнение с тангенсом"],
        category: "Решения уравнений"
    },
    {
        id: 54,
        formula: "\\ctg x = a \\Rightarrow x = \\arcctg a + \\pi n",
        name: "Общее решение ctg x = a",
        aliases: ["ctgx=a", "уравнение с котангенсом"],
        category: "Решения уравнений"
    },
    {
        id: 55,
        formula: "\\sin x = 0 \\Rightarrow x = \\pi n",
        name: "Решение sin x = 0",
        aliases: ["sinx=0"],
        category: "Решения уравнений"
    },
    {
        id: 56,
        formula: "\\cos x = 0 \\Rightarrow x = \\frac{\\pi}{2} + \\pi n",
        name: "Решение cos x = 0",
        aliases: ["cosx=0"],
        category: "Решения уравнений"
    },
    {
        id: 57,
        formula: "\\sin x = 1 \\Rightarrow x = \\frac{\\pi}{2} + 2\\pi n",
        name: "Решение sin x = 1",
        aliases: ["sinx=1"],
        category: "Решения уравнений"
    },
    {
        id: 58,
        formula: "\\cos x = 1 \\Rightarrow x = 2\\pi n",
        name: "Решение cos x = 1",
        aliases: ["cosx=1"],
        category: "Решения уравнений"
    },

    // ===== ТЕОРЕМЫ ТРЕУГОЛЬНИКА =====
    {
        id: 59,
        formula: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R",
        name: "Теорема синусов",
        aliases: ["теорема синусов", "закон синусов"],
        category: "Теоремы треугольника"
    },
    {
        id: 60,
        formula: "c^2 = a^2 + b^2 - 2ab\\cos C",
        name: "Теорема косинусов",
        aliases: ["теорема косинусов", "закон косинусов"],
        category: "Теоремы треугольника"
    },
    {
        id: 61,
        formula: "S = \\frac{1}{2}ab\\sin C",
        name: "Площадь треугольника через синус",
        aliases: ["площадь через синус", "S=1/2 ab sin C"],
        category: "Теоремы треугольника"
    }
];

// Функция для нормализации текста при сравнении
function normalizeText(text) {
    return text.toLowerCase()
        .replace(/[ёе]/g, 'е')
        .replace(/\s+/g, ' ')
        .trim();
}

// Проверка ответа пользователя
function checkAnswer(cardId, userAnswer) {
    const card = TRIG_CARDS.find(c => c.id === cardId);
    if (!card) return false;

    const normalized = normalizeText(userAnswer);
    const correctName = normalizeText(card.name);

    // Проверяем точное совпадение с названием
    if (normalized === correctName) return true;

    // Проверяем совпадение с алиасами
    for (const alias of card.aliases) {
        if (normalized === normalizeText(alias)) return true;
    }

    // Проверяем частичное совпадение (если введено больше 60% символов названия)
    if (normalized.length >= correctName.length * 0.6) {
        const keywords = correctName.split(' ').filter(w => w.length > 3);
        const matchedKeywords = keywords.filter(kw => normalized.includes(kw));
        if (matchedKeywords.length >= keywords.length * 0.7) {
            return true;
        }
    }

    return false;
}

// Получить случайные варианты ответа для режима выбора
function getRandomChoices(correctCardId, count = 4) {
    const correctCard = TRIG_CARDS.find(c => c.id === correctCardId);
    if (!correctCard) return [];

    const otherCards = TRIG_CARDS.filter(c => c.id !== correctCardId);
    const shuffled = otherCards.sort(() => Math.random() - 0.5);
    const wrongChoices = shuffled.slice(0, count - 1);

    const allChoices = [correctCard, ...wrongChoices];
    return allChoices.sort(() => Math.random() - 0.5);
}
