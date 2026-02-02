/**
 * Справочник формул геометрии для ЕГЭ профильного уровня
 * @module GeometryData
 */

// ===== ПЛАНИМЕТРИЯ =====

const PLANIMETRY_FORMULAS = {
    // Треугольник
    triangle: {
        title: "Треугольник",
        formulas: [
            { name: "Площадь (основание и высота)", formula: "S = \\frac{1}{2} \\cdot a \\cdot h_a" },
            { name: "Площадь (две стороны и угол)", formula: "S = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin C" },
            { name: "Площадь (формула Герона)", formula: "S = \\sqrt{p(p-a)(p-b)(p-c)}, \\quad p = \\frac{a+b+c}{2}" },
            { name: "Площадь через радиус описанной окружности", formula: "S = \\frac{abc}{4R}" },
            { name: "Площадь через радиус вписанной окружности", formula: "S = p \\cdot r" },
            { name: "Теорема косинусов", formula: "c^2 = a^2 + b^2 - 2ab\\cos C" },
            { name: "Теорема синусов", formula: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R" },
            { name: "Сумма углов треугольника", formula: "\\alpha + \\beta + \\gamma = 180°" },
            { name: "Медиана к стороне a", formula: "m_a = \\frac{1}{2}\\sqrt{2b^2 + 2c^2 - a^2}" },
            { name: "Биссектриса к стороне a", formula: "l_a = \\frac{2bc \\cdot \\cos\\frac{A}{2}}{b+c}" },
            { name: "Радиус описанной окружности", formula: "R = \\frac{abc}{4S}" },
            { name: "Радиус вписанной окружности", formula: "r = \\frac{S}{p}" },
            { name: "Свойство биссектрисы", formula: "\\frac{AB_1}{B_1C} = \\frac{AB}{BC}" },
            { name: "Средняя линия треугольника", formula: "m = \\frac{a}{2}" }
        ]
    },

    // Прямоугольный треугольник
    rightTriangle: {
        title: "Прямоугольный треугольник",
        formulas: [
            { name: "Теорема Пифагора", formula: "c^2 = a^2 + b^2" },
            { name: "Площадь", formula: "S = \\frac{1}{2} \\cdot a \\cdot b" },
            { name: "Катет через гипотенузу и угол", formula: "a = c \\cdot \\sin A = c \\cdot \\cos B" },
            { name: "Катет через катет и угол", formula: "a = b \\cdot \\text{tg}\\, A = b \\cdot \\text{ctg}\\, B" },
            { name: "Высота к гипотенузе", formula: "h = \\frac{ab}{c}" },
            { name: "Проекции катетов на гипотенузу", formula: "a^2 = c \\cdot a_c, \\quad b^2 = c \\cdot b_c" },
            { name: "Радиус описанной окружности", formula: "R = \\frac{c}{2}" },
            { name: "Радиус вписанной окружности", formula: "r = \\frac{a + b - c}{2}" },
            { name: "Медиана к гипотенузе", formula: "m_c = \\frac{c}{2}" }
        ]
    },

    // Равнобедренный треугольник
    isoscelesTriangle: {
        title: "Равнобедренный треугольник",
        formulas: [
            { name: "Площадь через основание и боковую", formula: "S = \\frac{a}{4}\\sqrt{4b^2 - a^2}" },
            { name: "Высота к основанию", formula: "h = \\sqrt{b^2 - \\frac{a^2}{4}}" },
            { name: "Углы при основании равны", formula: "\\angle B = \\angle C" },
            { name: "Радиус описанной окружности", formula: "R = \\frac{b^2}{\\sqrt{4b^2 - a^2}}" }
        ]
    },

    // Равносторонний треугольник
    equilateralTriangle: {
        title: "Равносторонний треугольник",
        formulas: [
            { name: "Площадь", formula: "S = \\frac{a^2\\sqrt{3}}{4}" },
            { name: "Высота", formula: "h = \\frac{a\\sqrt{3}}{2}" },
            { name: "Радиус описанной окружности", formula: "R = \\frac{a\\sqrt{3}}{3}" },
            { name: "Радиус вписанной окружности", formula: "r = \\frac{a\\sqrt{3}}{6}" },
            { name: "Связь радиусов", formula: "R = 2r" }
        ]
    },

    // Четырёхугольники
    quadrilaterals: {
        title: "Четырёхугольники (общее)",
        formulas: [
            { name: "Сумма углов четырёхугольника", formula: "\\alpha + \\beta + \\gamma + \\delta = 360°" },
            { name: "Площадь через диагонали и угол", formula: "S = \\frac{1}{2} \\cdot d_1 \\cdot d_2 \\cdot \\sin\\varphi" },
            { name: "Вписанный четырёхугольник", formula: "\\alpha + \\gamma = \\beta + \\delta = 180°" },
            { name: "Описанный четырёхугольник", formula: "AB + CD = BC + AD" }
        ]
    },

    // Параллелограмм
    parallelogram: {
        title: "Параллелограмм",
        formulas: [
            { name: "Площадь (сторона и высота)", formula: "S = a \\cdot h_a" },
            { name: "Площадь (две стороны и угол)", formula: "S = a \\cdot b \\cdot \\sin\\alpha" },
            { name: "Площадь (через диагонали)", formula: "S = \\frac{1}{2} \\cdot d_1 \\cdot d_2 \\cdot \\sin\\varphi" },
            { name: "Свойство диагоналей", formula: "d_1^2 + d_2^2 = 2(a^2 + b^2)" },
            { name: "Противоположные стороны равны", formula: "AB = CD, \\quad BC = AD" },
            { name: "Противоположные углы равны", formula: "\\angle A = \\angle C, \\quad \\angle B = \\angle D" }
        ]
    },

    // Прямоугольник
    rectangle: {
        title: "Прямоугольник",
        formulas: [
            { name: "Площадь", formula: "S = a \\cdot b" },
            { name: "Периметр", formula: "P = 2(a + b)" },
            { name: "Диагональ", formula: "d = \\sqrt{a^2 + b^2}" },
            { name: "Диагонали равны", formula: "d_1 = d_2" },
            { name: "Радиус описанной окружности", formula: "R = \\frac{d}{2}" }
        ]
    },

    // Ромб
    rhombus: {
        title: "Ромб",
        formulas: [
            { name: "Площадь (сторона и высота)", formula: "S = a \\cdot h" },
            { name: "Площадь (сторона и угол)", formula: "S = a^2 \\cdot \\sin\\alpha" },
            { name: "Площадь (через диагонали)", formula: "S = \\frac{1}{2} \\cdot d_1 \\cdot d_2" },
            { name: "Связь стороны и диагоналей", formula: "a^2 = \\frac{d_1^2 + d_2^2}{4}" },
            { name: "Диагонали перпендикулярны", formula: "d_1 \\perp d_2" }
        ]
    },

    // Квадрат
    square: {
        title: "Квадрат",
        formulas: [
            { name: "Площадь", formula: "S = a^2" },
            { name: "Периметр", formula: "P = 4a" },
            { name: "Диагональ", formula: "d = a\\sqrt{2}" },
            { name: "Площадь через диагональ", formula: "S = \\frac{d^2}{2}" },
            { name: "Радиус описанной окружности", formula: "R = \\frac{a\\sqrt{2}}{2}" },
            { name: "Радиус вписанной окружности", formula: "r = \\frac{a}{2}" }
        ]
    },

    // Трапеция
    trapezoid: {
        title: "Трапеция",
        formulas: [
            { name: "Площадь", formula: "S = \\frac{a + b}{2} \\cdot h" },
            { name: "Площадь через диагонали", formula: "S = \\frac{1}{2} \\cdot d_1 \\cdot d_2 \\cdot \\sin\\varphi" },
            { name: "Средняя линия", formula: "m = \\frac{a + b}{2}" },
            { name: "Площадь через среднюю линию", formula: "S = m \\cdot h" },
            { name: "Равнобедренная: диагонали", formula: "d_1 = d_2" },
            { name: "Равнобедренная: углы при основании", formula: "\\angle A = \\angle B" }
        ]
    },

    // Окружность
    circle: {
        title: "Окружность и круг",
        formulas: [
            { name: "Длина окружности", formula: "C = 2\\pi R = \\pi d" },
            { name: "Площадь круга", formula: "S = \\pi R^2" },
            { name: "Длина дуги", formula: "l = \\frac{\\pi R \\alpha}{180°} = R\\alpha_{\\text{рад}}" },
            { name: "Площадь сектора", formula: "S = \\frac{\\pi R^2 \\alpha}{360°} = \\frac{1}{2}R^2\\alpha_{\\text{рад}}" },
            { name: "Площадь сегмента", formula: "S = S_{\\text{сект}} - S_{\\triangle}" },
            { name: "Вписанный угол", formula: "\\angle_{\\text{вп}} = \\frac{1}{2} \\angle_{\\text{центр}}" },
            { name: "Угол между касательной и хордой", formula: "\\angle = \\frac{1}{2} \\cup AB" },
            { name: "Касательная перпендикулярна радиусу", formula: "OA \\perp l" },
            { name: "Теорема о касательной и секущей", formula: "AB^2 = AC \\cdot AD" },
            { name: "Теорема о двух секущих", formula: "AC \\cdot AD = AE \\cdot AF" },
            { name: "Теорема о хордах", formula: "AM \\cdot MB = CM \\cdot MD" }
        ]
    },

    // Правильные многоугольники
    regularPolygons: {
        title: "Правильные многоугольники",
        formulas: [
            { name: "Сумма углов n-угольника", formula: "S = 180°(n-2)" },
            { name: "Угол правильного n-угольника", formula: "\\alpha = \\frac{180°(n-2)}{n}" },
            { name: "Площадь через периметр и апофему", formula: "S = \\frac{1}{2} \\cdot P \\cdot r" },
            { name: "Площадь через сторону (n-угольник)", formula: "S = \\frac{na^2}{4\\text{tg}\\frac{\\pi}{n}}" },
            { name: "Радиус описанной окружности", formula: "R = \\frac{a}{2\\sin\\frac{\\pi}{n}}" },
            { name: "Радиус вписанной окружности", formula: "r = \\frac{a}{2\\text{tg}\\frac{\\pi}{n}}" },
            { name: "Площадь правильного шестиугольника", formula: "S = \\frac{3a^2\\sqrt{3}}{2}" }
        ]
    },

    // Координаты и векторы
    coordinates: {
        title: "Координаты и векторы на плоскости",
        formulas: [
            { name: "Расстояние между точками", formula: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}" },
            { name: "Середина отрезка", formula: "M = \\left(\\frac{x_1+x_2}{2}; \\frac{y_1+y_2}{2}\\right)" },
            { name: "Длина вектора", formula: "|\\vec{a}| = \\sqrt{x^2 + y^2}" },
            { name: "Скалярное произведение", formula: "\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2" },
            { name: "Скалярное произведение (угол)", formula: "\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos\\alpha" },
            { name: "Косинус угла между векторами", formula: "\\cos\\alpha = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}" },
            { name: "Условие перпендикулярности", formula: "\\vec{a} \\perp \\vec{b} \\Leftrightarrow \\vec{a} \\cdot \\vec{b} = 0" },
            { name: "Условие коллинеарности", formula: "\\vec{a} \\parallel \\vec{b} \\Leftrightarrow x_1y_2 = x_2y_1" },
            { name: "Уравнение прямой (общее)", formula: "ax + by + c = 0" },
            { name: "Уравнение прямой (с угловым коэф.)", formula: "y = kx + b" },
            { name: "Расстояние от точки до прямой", formula: "d = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}" },
            { name: "Уравнение окружности", formula: "(x-a)^2 + (y-b)^2 = R^2" }
        ]
    }
};

// ===== СТЕРЕОМЕТРИЯ =====

const STEREOMETRY_FORMULAS = {
    // Призма
    prism: {
        title: "Призма",
        formulas: [
            { name: "Объём призмы", formula: "V = S_{\\text{осн}} \\cdot h" },
            { name: "Объём прямой призмы", formula: "V = S_{\\text{осн}} \\cdot H" },
            { name: "Объём наклонной призмы", formula: "V = S_{\\text{сеч}} \\cdot l" },
            { name: "Площадь боковой поверхности (прямая)", formula: "S_{\\text{бок}} = P_{\\text{осн}} \\cdot H" },
            { name: "Площадь полной поверхности", formula: "S_{\\text{полн}} = S_{\\text{бок}} + 2S_{\\text{осн}}" },
            { name: "Диагональ прямоугольного параллелепипеда", formula: "d = \\sqrt{a^2 + b^2 + c^2}" }
        ]
    },

    // Параллелепипед
    parallelepiped: {
        title: "Параллелепипед",
        formulas: [
            { name: "Объём", formula: "V = S_{\\text{осн}} \\cdot h" },
            { name: "Объём прямоугольного", formula: "V = a \\cdot b \\cdot c" },
            { name: "Диагональ прямоугольного", formula: "d = \\sqrt{a^2 + b^2 + c^2}" },
            { name: "Площадь поверхности прямоугольного", formula: "S = 2(ab + bc + ac)" },
            { name: "Свойство диагоналей", formula: "d_1^2 + d_2^2 + d_3^2 + d_4^2 = 4(a^2 + b^2 + c^2)" }
        ]
    },

    // Куб
    cube: {
        title: "Куб",
        formulas: [
            { name: "Объём", formula: "V = a^3" },
            { name: "Диагональ куба", formula: "d = a\\sqrt{3}" },
            { name: "Диагональ грани", formula: "d_{\\text{гр}} = a\\sqrt{2}" },
            { name: "Площадь поверхности", formula: "S = 6a^2" },
            { name: "Радиус описанной сферы", formula: "R = \\frac{a\\sqrt{3}}{2}" },
            { name: "Радиус вписанной сферы", formula: "r = \\frac{a}{2}" }
        ]
    },

    // Пирамида
    pyramid: {
        title: "Пирамида",
        formulas: [
            { name: "Объём пирамиды", formula: "V = \\frac{1}{3} S_{\\text{осн}} \\cdot h" },
            { name: "Площадь боковой поверхности (правильная)", formula: "S_{\\text{бок}} = \\frac{1}{2} P_{\\text{осн}} \\cdot l" },
            { name: "Площадь полной поверхности", formula: "S_{\\text{полн}} = S_{\\text{бок}} + S_{\\text{осн}}" },
            { name: "Апофема правильной пирамиды", formula: "l^2 = h^2 + r^2" },
            { name: "Боковое ребро правильной пирамиды", formula: "b^2 = h^2 + R^2" }
        ]
    },

    // Правильные пирамиды
    regularPyramid: {
        title: "Правильные пирамиды",
        formulas: [
            { name: "Правильная треугольная: V", formula: "V = \\frac{a^2h\\sqrt{3}}{12}" },
            { name: "Правильная четырёхугольная: V", formula: "V = \\frac{1}{3}a^2h" },
            { name: "Правильная шестиугольная: V", formula: "V = \\frac{a^2h\\sqrt{3}}{2}" },
            { name: "Тетраэдр: объём", formula: "V = \\frac{a^3\\sqrt{2}}{12}" },
            { name: "Тетраэдр: высота", formula: "h = a\\sqrt{\\frac{2}{3}}" },
            { name: "Тетраэдр: площадь поверхности", formula: "S = a^2\\sqrt{3}" }
        ]
    },

    // Усечённая пирамида
    truncatedPyramid: {
        title: "Усечённая пирамида",
        formulas: [
            { name: "Объём", formula: "V = \\frac{1}{3}h(S_1 + S_2 + \\sqrt{S_1 \\cdot S_2})" },
            { name: "Площадь боковой поверхности (правильная)", formula: "S_{\\text{бок}} = \\frac{1}{2}(P_1 + P_2) \\cdot l" },
            { name: "Площадь полной поверхности", formula: "S_{\\text{полн}} = S_{\\text{бок}} + S_1 + S_2" }
        ]
    },

    // Цилиндр
    cylinder: {
        title: "Цилиндр",
        formulas: [
            { name: "Объём", formula: "V = \\pi R^2 H" },
            { name: "Площадь боковой поверхности", formula: "S_{\\text{бок}} = 2\\pi RH" },
            { name: "Площадь полной поверхности", formula: "S_{\\text{полн}} = 2\\pi R(R + H)" },
            { name: "Площадь осевого сечения", formula: "S_{\\text{ос}} = 2RH" },
            { name: "Диагональ осевого сечения", formula: "d = \\sqrt{4R^2 + H^2}" }
        ]
    },

    // Конус
    cone: {
        title: "Конус",
        formulas: [
            { name: "Объём", formula: "V = \\frac{1}{3}\\pi R^2 H" },
            { name: "Площадь боковой поверхности", formula: "S_{\\text{бок}} = \\pi R l" },
            { name: "Площадь полной поверхности", formula: "S_{\\text{полн}} = \\pi R(R + l)" },
            { name: "Образующая", formula: "l = \\sqrt{R^2 + H^2}" },
            { name: "Площадь осевого сечения", formula: "S_{\\text{ос}} = R \\cdot H" }
        ]
    },

    // Усечённый конус
    truncatedCone: {
        title: "Усечённый конус",
        formulas: [
            { name: "Объём", formula: "V = \\frac{1}{3}\\pi H(R^2 + Rr + r^2)" },
            { name: "Площадь боковой поверхности", formula: "S_{\\text{бок}} = \\pi(R + r)l" },
            { name: "Образующая", formula: "l = \\sqrt{H^2 + (R-r)^2}" },
            { name: "Площадь полной поверхности", formula: "S_{\\text{полн}} = \\pi(R^2 + r^2 + (R+r)l)" }
        ]
    },

    // Шар и сфера
    sphere: {
        title: "Шар и сфера",
        formulas: [
            { name: "Объём шара", formula: "V = \\frac{4}{3}\\pi R^3" },
            { name: "Площадь сферы", formula: "S = 4\\pi R^2" },
            { name: "Объём шарового сегмента", formula: "V = \\pi h^2\\left(R - \\frac{h}{3}\\right)" },
            { name: "Площадь сферического сегмента", formula: "S = 2\\pi Rh" },
            { name: "Объём шарового слоя", formula: "V = \\frac{\\pi h}{6}(3r_1^2 + 3r_2^2 + h^2)" },
            { name: "Объём шарового сектора", formula: "V = \\frac{2}{3}\\pi R^2 h" },
            { name: "Радиус сечения шара плоскостью", formula: "r = \\sqrt{R^2 - d^2}" }
        ]
    },

    // Вписанные и описанные тела
    inscribedCircumscribed: {
        title: "Вписанные и описанные тела",
        formulas: [
            { name: "Шар вписан в куб", formula: "r = \\frac{a}{2}" },
            { name: "Шар описан около куба", formula: "R = \\frac{a\\sqrt{3}}{2}" },
            { name: "Шар вписан в цилиндр", formula: "r = R, \\quad H = 2R" },
            { name: "Шар описан около цилиндра", formula: "R_{\\text{сф}} = \\sqrt{R^2 + \\frac{H^2}{4}}" },
            { name: "Шар вписан в конус", formula: "r = \\frac{RH}{l + R}" },
            { name: "Шар описан около конуса", formula: "R_{\\text{сф}} = \\frac{l^2}{2H}" },
            { name: "Цилиндр вписан в конус", formula: "\\frac{r}{R} = \\frac{H - h}{H}" }
        ]
    },

    // Координаты и векторы в пространстве
    coordinates3d: {
        title: "Координаты и векторы в пространстве",
        formulas: [
            { name: "Расстояние между точками", formula: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}" },
            { name: "Середина отрезка", formula: "M = \\left(\\frac{x_1+x_2}{2}; \\frac{y_1+y_2}{2}; \\frac{z_1+z_2}{2}\\right)" },
            { name: "Длина вектора", formula: "|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}" },
            { name: "Скалярное произведение", formula: "\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2 + z_1z_2" },
            { name: "Косинус угла между векторами", formula: "\\cos\\alpha = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}" },
            { name: "Уравнение плоскости", formula: "ax + by + cz + d = 0" },
            { name: "Расстояние от точки до плоскости", formula: "d = \\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}" },
            { name: "Уравнение сферы", formula: "(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2" }
        ]
    },

    // Углы и расстояния
    anglesDistances: {
        title: "Углы и расстояния в пространстве",
        formulas: [
            { name: "Угол между прямыми", formula: "\\cos\\alpha = \\frac{|\\vec{a} \\cdot \\vec{b}|}{|\\vec{a}| \\cdot |\\vec{b}|}" },
            { name: "Угол между прямой и плоскостью", formula: "\\sin\\alpha = \\cos(90° - \\alpha)" },
            { name: "Угол между плоскостями (двугранный)", formula: "\\cos\\alpha = \\frac{\\vec{n_1} \\cdot \\vec{n_2}}{|\\vec{n_1}| \\cdot |\\vec{n_2}|}" },
            { name: "Теорема о трёх перпендикулярах", formula: "a \\perp AB, \\, AB \\subset \\alpha \\Rightarrow a \\perp \\alpha" },
            { name: "Расстояние между скрещивающимися", formula: "d = \\frac{|(\\vec{AB}, \\vec{a}, \\vec{b})|}{|\\vec{a} \\times \\vec{b}|}" }
        ]
    }
};

// Функции для работы с данными

function getAllPlanimetryFormulas() {
    const all = [];
    for (const [key, section] of Object.entries(PLANIMETRY_FORMULAS)) {
        section.formulas.forEach(f => {
            all.push({ ...f, category: section.title });
        });
    }
    return all;
}

function getAllStereometryFormulas() {
    const all = [];
    for (const [key, section] of Object.entries(STEREOMETRY_FORMULAS)) {
        section.formulas.forEach(f => {
            all.push({ ...f, category: section.title });
        });
    }
    return all;
}

function getPlanimetryFormulasCount() {
    let count = 0;
    for (const section of Object.values(PLANIMETRY_FORMULAS)) {
        count += section.formulas.length;
    }
    return count;
}

function getStereometryFormulasCount() {
    let count = 0;
    for (const section of Object.values(STEREOMETRY_FORMULAS)) {
        count += section.formulas.length;
    }
    return count;
}

function getGeometryFormulasCount() {
    return getPlanimetryFormulasCount() + getStereometryFormulasCount();
}
