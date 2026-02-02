/**
 * Справочник формул алгебры для ЕГЭ профильного уровня
 * @module AlgebraData
 */

const ALGEBRA_FORMULAS = {
    // ===== СТЕПЕНИ =====
    powers: {
        title: "Степени и их свойства",
        formulas: [
            { name: "Произведение степеней", formula: "a^m \\cdot a^n = a^{m+n}" },
            { name: "Частное степеней", formula: "\\frac{a^m}{a^n} = a^{m-n}" },
            { name: "Степень степени", formula: "(a^m)^n = a^{m \\cdot n}" },
            { name: "Степень произведения", formula: "(a \\cdot b)^n = a^n \\cdot b^n" },
            { name: "Степень частного", formula: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}" },
            { name: "Нулевая степень", formula: "a^0 = 1, \\quad a \\neq 0" },
            { name: "Отрицательная степень", formula: "a^{-n} = \\frac{1}{a^n}" },
            { name: "Дробная степень", formula: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m}" }
        ]
    },

    // ===== КОРНИ =====
    roots: {
        title: "Корни и их свойства",
        formulas: [
            { name: "Определение корня", formula: "\\sqrt[n]{a} = a^{\\frac{1}{n}}" },
            { name: "Корень из произведения", formula: "\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}" },
            { name: "Корень из частного", formula: "\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}" },
            { name: "Корень из степени", formula: "\\sqrt[n]{a^m} = a^{\\frac{m}{n}}" },
            { name: "Корень из корня", formula: "\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[m \\cdot n]{a}" },
            { name: "Вынесение из-под корня", formula: "\\sqrt[n]{a^n \\cdot b} = |a| \\cdot \\sqrt[n]{b}" },
            { name: "Квадратный корень", formula: "\\sqrt{a^2} = |a|" }
        ]
    },

    // ===== ЛОГАРИФМЫ =====
    logarithms: {
        title: "Логарифмы и их свойства",
        formulas: [
            { name: "Определение логарифма", formula: "\\log_a b = c \\Leftrightarrow a^c = b" },
            { name: "Логарифм единицы", formula: "\\log_a 1 = 0" },
            { name: "Логарифм основания", formula: "\\log_a a = 1" },
            { name: "Основное логарифмическое тождество", formula: "a^{\\log_a b} = b" },
            { name: "Логарифм произведения", formula: "\\log_a (b \\cdot c) = \\log_a b + \\log_a c" },
            { name: "Логарифм частного", formula: "\\log_a \\frac{b}{c} = \\log_a b - \\log_a c" },
            { name: "Логарифм степени", formula: "\\log_a b^n = n \\cdot \\log_a b" },
            { name: "Переход к новому основанию", formula: "\\log_a b = \\frac{\\log_c b}{\\log_c a}" },
            { name: "Переход к новому основанию (следствие)", formula: "\\log_a b = \\frac{1}{\\log_b a}" },
            { name: "Логарифм корня", formula: "\\log_a \\sqrt[n]{b} = \\frac{1}{n} \\log_a b" },
            { name: "Натуральный логарифм", formula: "\\ln x = \\log_e x, \\quad e \\approx 2.718" },
            { name: "Десятичный логарифм", formula: "\\lg x = \\log_{10} x" }
        ]
    },

    // ===== МОДУЛЬ =====
    absolute: {
        title: "Модуль числа",
        formulas: [
            { name: "Определение модуля", formula: "|a| = \\begin{cases} a, & a \\geq 0 \\\\ -a, & a < 0 \\end{cases}" },
            { name: "Модуль произведения", formula: "|a \\cdot b| = |a| \\cdot |b|" },
            { name: "Модуль частного", formula: "\\left|\\frac{a}{b}\\right| = \\frac{|a|}{|b|}" },
            { name: "Модуль степени", formula: "|a^n| = |a|^n" },
            { name: "Неравенство треугольника", formula: "||a| - |b|| \\leq |a + b| \\leq |a| + |b|" },
            { name: "Квадрат модуля", formula: "|a|^2 = a^2" },
            { name: "Уравнение |x| = a", formula: "|x| = a \\Rightarrow x = \\pm a, \\quad a \\geq 0" },
            { name: "Неравенство |x| < a", formula: "|x| < a \\Rightarrow -a < x < a" },
            { name: "Неравенство |x| > a", formula: "|x| > a \\Rightarrow x < -a \\text{ или } x > a" }
        ]
    },

    // ===== ФОРМУЛЫ СОКРАЩЁННОГО УМНОЖЕНИЯ =====
    shortMultiplication: {
        title: "Формулы сокращённого умножения",
        formulas: [
            { name: "Квадрат суммы", formula: "(a + b)^2 = a^2 + 2ab + b^2" },
            { name: "Квадрат разности", formula: "(a - b)^2 = a^2 - 2ab + b^2" },
            { name: "Разность квадратов", formula: "a^2 - b^2 = (a - b)(a + b)" },
            { name: "Куб суммы", formula: "(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3" },
            { name: "Куб разности", formula: "(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3" },
            { name: "Сумма кубов", formula: "a^3 + b^3 = (a + b)(a^2 - ab + b^2)" },
            { name: "Разность кубов", formula: "a^3 - b^3 = (a - b)(a^2 + ab + b^2)" },
            { name: "Бином Ньютона", formula: "(a + b)^n = \\sum_{k=0}^{n} C_n^k a^{n-k} b^k" }
        ]
    },

    // ===== КВАДРАТНЫЕ УРАВНЕНИЯ =====
    quadratic: {
        title: "Квадратные уравнения",
        formulas: [
            { name: "Общий вид", formula: "ax^2 + bx + c = 0" },
            { name: "Дискриминант", formula: "D = b^2 - 4ac" },
            { name: "Корни уравнения", formula: "x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}" },
            { name: "Теорема Виета (сумма)", formula: "x_1 + x_2 = -\\frac{b}{a}" },
            { name: "Теорема Виета (произведение)", formula: "x_1 \\cdot x_2 = \\frac{c}{a}" },
            { name: "Разложение на множители", formula: "ax^2 + bx + c = a(x - x_1)(x - x_2)" },
            { name: "Приведённое уравнение", formula: "x^2 + px + q = 0, \\quad D = p^2 - 4q" },
            { name: "Корни приведённого", formula: "x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\frac{p^2}{4} - q}" }
        ]
    },

    // ===== ПРОГРЕССИИ =====
    progressions: {
        title: "Прогрессии",
        formulas: [
            { name: "Арифметическая: n-й член", formula: "a_n = a_1 + (n-1)d" },
            { name: "Арифметическая: сумма n членов", formula: "S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)d}{2} \\cdot n" },
            { name: "Арифметическая: свойство", formula: "a_n = \\frac{a_{n-1} + a_{n+1}}{2}" },
            { name: "Геометрическая: n-й член", formula: "b_n = b_1 \\cdot q^{n-1}" },
            { name: "Геометрическая: сумма n членов", formula: "S_n = \\frac{b_1(q^n - 1)}{q - 1} = \\frac{b_n \\cdot q - b_1}{q - 1}" },
            { name: "Геометрическая: свойство", formula: "b_n^2 = b_{n-1} \\cdot b_{n+1}" },
            { name: "Бесконечная убывающая (|q|<1)", formula: "S = \\frac{b_1}{1 - q}" }
        ]
    },

    // ===== ПРОИЗВОДНЫЕ =====
    derivatives: {
        title: "Производные",
        formulas: [
            { name: "Определение производной", formula: "f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}" },
            { name: "Производная константы", formula: "(C)' = 0" },
            { name: "Производная x", formula: "(x)' = 1" },
            { name: "Производная степени", formula: "(x^n)' = n \\cdot x^{n-1}" },
            { name: "Производная корня", formula: "(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}" },
            { name: "Производная 1/x", formula: "\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2}" },
            { name: "Производная e^x", formula: "(e^x)' = e^x" },
            { name: "Производная a^x", formula: "(a^x)' = a^x \\ln a" },
            { name: "Производная ln x", formula: "(\\ln x)' = \\frac{1}{x}" },
            { name: "Производная log_a x", formula: "(\\log_a x)' = \\frac{1}{x \\ln a}" },
            { name: "Производная sin x", formula: "(\\sin x)' = \\cos x" },
            { name: "Производная cos x", formula: "(\\cos x)' = -\\sin x" },
            { name: "Производная tg x", formula: "(\\text{tg}\\, x)' = \\frac{1}{\\cos^2 x}" },
            { name: "Производная ctg x", formula: "(\\text{ctg}\\, x)' = -\\frac{1}{\\sin^2 x}" },
            { name: "Производная суммы", formula: "(f + g)' = f' + g'" },
            { name: "Производная произведения", formula: "(f \\cdot g)' = f' \\cdot g + f \\cdot g'" },
            { name: "Производная частного", formula: "\\left(\\frac{f}{g}\\right)' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}" },
            { name: "Производная сложной функции", formula: "(f(g(x)))' = f'(g(x)) \\cdot g'(x)" }
        ]
    },

    // ===== ПЕРВООБРАЗНЫЕ И ИНТЕГРАЛЫ =====
    integrals: {
        title: "Первообразные и интегралы",
        formulas: [
            { name: "Первообразная константы", formula: "\\int 0 \\, dx = C" },
            { name: "Первообразная x^n", formula: "\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1" },
            { name: "Первообразная 1/x", formula: "\\int \\frac{1}{x} \\, dx = \\ln|x| + C" },
            { name: "Первообразная e^x", formula: "\\int e^x \\, dx = e^x + C" },
            { name: "Первообразная a^x", formula: "\\int a^x \\, dx = \\frac{a^x}{\\ln a} + C" },
            { name: "Первообразная sin x", formula: "\\int \\sin x \\, dx = -\\cos x + C" },
            { name: "Первообразная cos x", formula: "\\int \\cos x \\, dx = \\sin x + C" },
            { name: "Первообразная 1/cos²x", formula: "\\int \\frac{1}{\\cos^2 x} \\, dx = \\text{tg}\\, x + C" },
            { name: "Первообразная 1/sin²x", formula: "\\int \\frac{1}{\\sin^2 x} \\, dx = -\\text{ctg}\\, x + C" },
            { name: "Формула Ньютона-Лейбница", formula: "\\int_a^b f(x) \\, dx = F(b) - F(a)" },
            { name: "Площадь под графиком", formula: "S = \\int_a^b f(x) \\, dx" },
            { name: "Площадь между графиками", formula: "S = \\int_a^b |f(x) - g(x)| \\, dx" }
        ]
    },

    // ===== КОМБИНАТОРИКА =====
    combinatorics: {
        title: "Комбинаторика",
        formulas: [
            { name: "Факториал", formula: "n! = 1 \\cdot 2 \\cdot 3 \\cdot ... \\cdot n, \\quad 0! = 1" },
            { name: "Перестановки", formula: "P_n = n!" },
            { name: "Размещения", formula: "A_n^k = \\frac{n!}{(n-k)!}" },
            { name: "Сочетания", formula: "C_n^k = \\frac{n!}{k!(n-k)!}" },
            { name: "Свойство сочетаний", formula: "C_n^k = C_n^{n-k}" },
            { name: "Треугольник Паскаля", formula: "C_n^k = C_{n-1}^{k-1} + C_{n-1}^k" },
            { name: "Сумма сочетаний", formula: "C_n^0 + C_n^1 + ... + C_n^n = 2^n" },
            { name: "Перестановки с повторениями", formula: "P(n_1, n_2, ..., n_k) = \\frac{n!}{n_1! \\cdot n_2! \\cdot ... \\cdot n_k!}" }
        ]
    },

    // ===== ТЕОРИЯ ВЕРОЯТНОСТЕЙ =====
    probability: {
        title: "Теория вероятностей",
        formulas: [
            { name: "Классическая вероятность", formula: "P(A) = \\frac{m}{n}" },
            { name: "Вероятность достоверного события", formula: "P(\\Omega) = 1" },
            { name: "Вероятность невозможного события", formula: "P(\\emptyset) = 0" },
            { name: "Противоположное событие", formula: "P(\\bar{A}) = 1 - P(A)" },
            { name: "Сложение вероятностей (несовм.)", formula: "P(A + B) = P(A) + P(B)" },
            { name: "Сложение вероятностей (совм.)", formula: "P(A + B) = P(A) + P(B) - P(A \\cdot B)" },
            { name: "Умножение вероятностей (независ.)", formula: "P(A \\cdot B) = P(A) \\cdot P(B)" },
            { name: "Условная вероятность", formula: "P(A|B) = \\frac{P(A \\cdot B)}{P(B)}" },
            { name: "Формула полной вероятности", formula: "P(A) = \\sum_{i=1}^n P(H_i) \\cdot P(A|H_i)" },
            { name: "Формула Бернулли", formula: "P_n(k) = C_n^k \\cdot p^k \\cdot q^{n-k}" },
            { name: "Математическое ожидание", formula: "M(X) = \\sum_{i=1}^n x_i \\cdot p_i" },
            { name: "Дисперсия", formula: "D(X) = M(X^2) - (M(X))^2" }
        ]
    },

    // ===== УРАВНЕНИЯ И НЕРАВЕНСТВА =====
    equations: {
        title: "Уравнения и неравенства",
        formulas: [
            { name: "Линейное уравнение", formula: "ax + b = 0 \\Rightarrow x = -\\frac{b}{a}" },
            { name: "Биквадратное уравнение", formula: "ax^4 + bx^2 + c = 0, \\quad t = x^2" },
            { name: "Иррациональное уравнение", formula: "\\sqrt{f(x)} = g(x) \\Rightarrow \\begin{cases} f(x) = g^2(x) \\\\ g(x) \\geq 0 \\end{cases}" },
            { name: "Показательное уравнение", formula: "a^{f(x)} = a^{g(x)} \\Rightarrow f(x) = g(x)" },
            { name: "Логарифмическое уравнение", formula: "\\log_a f(x) = \\log_a g(x) \\Rightarrow f(x) = g(x) > 0" },
            { name: "Метод интервалов", formula: "\\frac{(x-a)(x-b)}{(x-c)} > 0" },
            { name: "Показательное неравенство (a>1)", formula: "a^{f(x)} > a^{g(x)} \\Rightarrow f(x) > g(x)" },
            { name: "Показательное неравенство (0<a<1)", formula: "a^{f(x)} > a^{g(x)} \\Rightarrow f(x) < g(x)" },
            { name: "Логарифмическое неравенство (a>1)", formula: "\\log_a f(x) > \\log_a g(x) \\Rightarrow f(x) > g(x) > 0" },
            { name: "Логарифмическое неравенство (0<a<1)", formula: "\\log_a f(x) > \\log_a g(x) \\Rightarrow 0 < f(x) < g(x)" }
        ]
    },

    // ===== ФУНКЦИИ =====
    functions: {
        title: "Свойства функций",
        formulas: [
            { name: "Область определения", formula: "D(f) = \\{x : f(x) \\text{ существует}\\}" },
            { name: "Область значений", formula: "E(f) = \\{y : y = f(x), x \\in D(f)\\}" },
            { name: "Чётная функция", formula: "f(-x) = f(x)" },
            { name: "Нечётная функция", formula: "f(-x) = -f(x)" },
            { name: "Периодическая функция", formula: "f(x + T) = f(x)" },
            { name: "Возрастание функции", formula: "f'(x) > 0 \\Rightarrow f \\text{ возрастает}" },
            { name: "Убывание функции", formula: "f'(x) < 0 \\Rightarrow f \\text{ убывает}" },
            { name: "Точка максимума", formula: "f'(x_0) = 0, \\quad f''(x_0) < 0" },
            { name: "Точка минимума", formula: "f'(x_0) = 0, \\quad f''(x_0) > 0" },
            { name: "Касательная к графику", formula: "y = f(x_0) + f'(x_0)(x - x_0)" },
            { name: "Асимптота вертикальная", formula: "x = a, \\text{ если } \\lim_{x \\to a} f(x) = \\pm\\infty" },
            { name: "Асимптота горизонтальная", formula: "y = b, \\text{ если } \\lim_{x \\to \\pm\\infty} f(x) = b" }
        ]
    }
};

// Функция для получения всех формул в виде плоского массива
function getAllAlgebraFormulas() {
    const all = [];
    for (const [key, section] of Object.entries(ALGEBRA_FORMULAS)) {
        section.formulas.forEach(f => {
            all.push({
                ...f,
                category: section.title
            });
        });
    }
    return all;
}

// Функция для получения количества формул
function getAlgebraFormulasCount() {
    let count = 0;
    for (const section of Object.values(ALGEBRA_FORMULAS)) {
        count += section.formulas.length;
    }
    return count;
}
