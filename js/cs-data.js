/**
 * Данные для раздела «Информатика»
 * Формулы + шаблоны решений на Python
 * Актуально для ЕГЭ-2026 (КЕГЭ)
 */

// ===== ФОРМУЛЫ ИНФОРМАТИКИ =====
const CS_FORMULAS = {
    numSystems: {
        title: "Системы счисления (задания 1, 8, 14)",
        formulas: [
            { name: "Позиционная запись числа", formula: "N = a_{n}\\cdot q^{n} + a_{n-1}\\cdot q^{n-1} + \\ldots + a_1\\cdot q + a_0" },
            { name: "Перевод из q в 10", formula: "N_q = \\sum_{i=0}^{n} a_i \\cdot q^i" },
            { name: "Связь двоичной и восьмеричной", formula: "1 \\text{ разряд}_8 = 3 \\text{ разряда}_2 \\quad (\\text{триады})" },
            { name: "Связь двоичной и 16-ричной", formula: "1 \\text{ разряд}_{16} = 4 \\text{ разряда}_2 \\quad (\\text{тетрады})" },
            { name: "Максимальное n-разрядное число", formula: "N_{\\max} = q^n - 1" },
            { name: "Количество n-разрядных чисел", formula: "K = q^n - q^{n-1} = q^{n-1}(q - 1)" },
            { name: "Количество всех чисел до n разрядов", formula: "K = q^n" }
        ]
    },
    logic: {
        title: "Логика (задания 2, 15)",
        formulas: [
            { name: "Конъюнкция (И, AND, &)", formula: "A \\wedge B = 1 \\Leftrightarrow A = 1 \\text{ и } B = 1" },
            { name: "Дизъюнкция (ИЛИ, OR, |)", formula: "A \\vee B = 0 \\Leftrightarrow A = 0 \\text{ и } B = 0" },
            { name: "Отрицание (НЕ, NOT)", formula: "\\neg A = 1 - A" },
            { name: "Импликация (следование)", formula: "A \\to B = \\neg A \\vee B" },
            { name: "Импликация ложна", formula: "A \\to B = 0 \\;\\Leftrightarrow\\; A = 1,\\; B = 0" },
            { name: "Эквиваленция (XNOR)", formula: "A \\leftrightarrow B = (A \\wedge B) \\vee (\\neg A \\wedge \\neg B)" },
            { name: "Исключающее ИЛИ (XOR)", formula: "A \\oplus B = (A \\vee B) \\wedge \\neg(A \\wedge B)" },
            { name: "Закон де Моргана (1)", formula: "\\neg(A \\wedge B) = \\neg A \\vee \\neg B" },
            { name: "Закон де Моргана (2)", formula: "\\neg(A \\vee B) = \\neg A \\wedge \\neg B" },
            { name: "Закон контрапозиции", formula: "A \\to B \\;\\equiv\\; \\neg B \\to \\neg A" },
            { name: "Закон поглощения", formula: "A \\vee (A \\wedge B) = A" },
            { name: "Дистрибутивность И по ИЛИ", formula: "A \\wedge (B \\vee C) = (A \\wedge B) \\vee (A \\wedge C)" },
            { name: "Дистрибутивность ИЛИ по И", formula: "A \\vee (B \\wedge C) = (A \\vee B) \\wedge (A \\vee C)" }
        ]
    },
    information: {
        title: "Теория информации (задания 7, 11)",
        formulas: [
            { name: "Формула Хартли", formula: "I = \\log_2 N, \\quad N = 2^I" },
            { name: "Мощность алфавита и вес символа", formula: "N = 2^i \\;\\Rightarrow\\; i = \\log_2 N \\text{ бит}" },
            { name: "Информационный объём текста", formula: "V = K \\cdot i \\quad (K \\text{ — символов, } i \\text{ — бит на символ})" },
            { name: "Объём растрового изображения", formula: "V = W \\times H \\times i, \\quad i = \\log_2 (\\text{кол-во цветов})" },
            { name: "Объём звукового файла", formula: "V = f \\cdot i \\cdot t \\cdot c \\quad (f\\text{ — частота Гц, } i\\text{ — глубина бит, } t\\text{ — секунды, } c\\text{ — каналы})" },
            { name: "Единицы измерения", formula: "1\\text{ байт} = 8\\text{ бит}, \\quad 1\\text{ Кб} = 2^{10}\\text{ байт}, \\quad 1\\text{ Мб} = 2^{20}\\text{ байт}" },
            { name: "Скорость передачи данных", formula: "v = \\frac{V}{t}, \\quad V = v \\cdot t" }
        ]
    },
    coding: {
        title: "Кодирование (задание 4)",
        formulas: [
            { name: "Условие Фано", formula: "\\text{Ни одно кодовое слово не является началом другого}" },
            { name: "Неравенство Крафта", formula: "\\sum_{i=1}^{n} 2^{-l_i} \\le 1 \\quad (l_i \\text{ — длина } i\\text{-го кодового слова})" },
            { name: "Минимальная длина кодового слова", formula: "l_{\\min} = \\lceil \\log_2 n \\rceil" },
            { name: "Количество кодовых слов длины k", formula: "N = m^k \\quad (m \\text{ — мощность кодового алфавита})" }
        ]
    },
    combinatorics: {
        title: "Комбинаторика (задания 8, 10)",
        formulas: [
            { name: "Правило произведения", formula: "\\text{Если } A \\text{ и } B \\text{ независимы} \\Rightarrow |A \\times B| = |A| \\cdot |B|" },
            { name: "Правило суммы", formula: "\\text{Если } A \\text{ или } B \\Rightarrow |A \\cup B| = |A| + |B| - |A \\cap B|" },
            { name: "Перестановки", formula: "P_n = n!" },
            { name: "Размещения без повторений", formula: "A_n^k = \\frac{n!}{(n-k)!}" },
            { name: "Сочетания", formula: "C_n^k = \\frac{n!}{k! \\cdot (n-k)!}" },
            { name: "Количество слов длины k из алфавита n", formula: "N = n^k" }
        ]
    },
    networks: {
        title: "Сети и IP-адресация (задание 13)",
        formulas: [
            { name: "Адрес сети (побитовое И)", formula: "\\text{IP}_{\\text{сети}} = \\text{IP} \\;\\&\\; \\text{Маска}" },
            { name: "Количество узлов в подсети", formula: "K = 2^{32 - n} - 2 \\quad (n \\text{ — кол-во единиц в маске})" },
            { name: "Маска /24 (пример)", formula: "/24 \\Rightarrow 255.255.255.0 \\Rightarrow 2^8 - 2 = 254 \\text{ узла}" },
            { name: "Время передачи файла", formula: "t = \\frac{V}{v}" }
        ]
    },
    turtle: {
        title: "Геометрия Черепахи (задание 6)",
        formulas: [
            { name: "Правильный n-угольник", formula: "\\text{Угол поворота} = \\frac{360°}{n}" },
            { name: "Вершины правильного n-угольника", formula: "x_k = R \\cos\\frac{2\\pi k}{n}, \\quad y_k = R \\sin\\frac{2\\pi k}{n}" },
            { name: "Площадь по формуле Шнурка (Гаусса)", formula: "S = \\frac{1}{2}\\left|\\sum_{i=0}^{n-1}(x_i y_{i+1} - x_{i+1} y_i)\\right|" },
            { name: "Точки с целыми координатами (формула Пика)", formula: "S = I + \\frac{B}{2} - 1 \\quad (I\\text{ — внутренние, } B\\text{ — на границе})" },
            { name: "Перемещение Черепахи", formula: "x' = x + n \\cdot \\cos\\alpha, \\quad y' = y + n \\cdot \\sin\\alpha" }
        ]
    },
    gameTheory: {
        title: "Теория игр (задания 19–21)",
        formulas: [
            { name: "Позиция проигрышная", formula: "\\text{Все ходы ведут в выигрышные позиции}" },
            { name: "Позиция выигрышная", formula: "\\exists \\text{ ход, ведущий в проигрышную позицию}" },
            { name: "Выигрыш за 1 ход", formula: "\\exists \\text{ ход из } S \\text{ в конечную позицию}" },
            { name: "Выигрыш за 2 хода", formula: "\\exists \\text{ ход из } S \\text{ в позицию, откуда все ходы ведут в выигрышные за 1}" }
        ]
    },
    algorithms: {
        title: "Алгоритмы (задания 5, 16, 23)",
        formulas: [
            { name: "Динамическое программирование (пути)", formula: "\\text{dp}[v] = \\sum_{u \\to v} \\text{dp}[u]" },
            { name: "Числа Фибоначчи", formula: "F_n = F_{n-1} + F_{n-2}, \\quad F_0 = 0,\\; F_1 = 1" },
            { name: "Линейный поиск", formula: "O(n)" },
            { name: "Бинарный поиск", formula: "O(\\log_2 n), \\quad k = \\lceil \\log_2 (n+1) \\rceil \\text{ шагов}" },
            { name: "Сортировка (лучшие алгоритмы)", formula: "O(n \\log n)" },
            { name: "Евклидово расстояние", formula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" }
        ]
    }
};

// ===== ШАБЛОНЫ PYTHON =====
const CS_TEMPLATES = {
    task6: {
        title: "Задание 6 — Черепаха (turtle)",
        templates: [
            {
                name: "Базовый шаблон Черепахи",
                description: "Рисование по алгоритму из условия и визуализация",
                code: `import turtle

t = turtle.Turtle()
t.speed(0)
turtle.tracer(0)    # отключаем анимацию
t.left(90)          # нос вверх (как в условии)

# Переписываем алгоритм из задания:
# Повтори 4 [Вперёд 100 Направо 90]
for i in range(4):
    t.forward(100)
    t.right(90)

turtle.update()     # показать результат
turtle.mainloop()`
            },
            {
                name: "Подсчёт целочисленных точек внутри фигуры",
                description: "Рисуем фигуру, затем проверяем точки сеткой",
                code: `import turtle

t = turtle.Turtle()
t.speed(0)
turtle.tracer(0)
t.left(90)

# Масштаб для видимости
m = 30

# Повтори 6 [Вперёд 10 Направо 60]
for i in range(6):
    t.forward(10 * m)
    t.right(60)

# Рисуем сетку для подсчёта точек
t.penup()
t.color('red')
for x in range(-5, 15):
    for y in range(-5, 15):
        t.goto(x * m, y * m)
        t.dot(3)

turtle.update()
turtle.mainloop()`
            },
            {
                name: "Программный подсчёт точек (без визуализации)",
                description: "Точный подсчёт целочисленных точек внутри многоугольника",
                code: `import math

# Собираем вершины многоугольника
x, y, angle = 0.0, 0.0, 90.0  # начало, угол в градусах
vertices = [(x, y)]

commands = [(10, 60)] * 6  # (вперёд, направо) × 6

for fwd, turn in commands:
    rad = math.radians(angle)
    x += fwd * math.cos(rad)
    y += fwd * math.sin(rad)
    vertices.append((round(x, 6), round(y, 6)))
    angle -= turn  # направо = минус

# Проверяем точки методом луча (ray casting)
def inside(px, py, polygon):
    n = len(polygon)
    inside = False
    j = n - 1
    for i in range(n):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        if ((yi > py) != (yj > py)) and \\
           (px < (xj - xi) * (py - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside

# Перебор точек с целыми координатами
count = 0
for px in range(-20, 20):
    for py in range(-20, 20):
        if inside(px, py, vertices):
            count += 1

# Добавляем точки на границе
print(count)`
            }
        ]
    },
    task12: {
        title: "Задание 12 — Редактор и Машина Тьюринга",
        templates: [
            {
                name: "Исполнитель Редактор",
                description: "Моделирование работы Редактора со строками",
                code: `# Команды Редактора:
# нашлась(s) — проверяет, есть ли подстрока s
# заменить(s1, s2) — заменяет первое вхождение

def editor(string, program):
    s = string
    while True:
        changed = False
        for cond, old, new in program:
            if cond in s:
                s = s.replace(old, new, 1)
                changed = True
                break  # начинаем сначала
        if not changed:
            break
    return s

# Пример: пока нашлось "22", заменить "22" на "2"
# Получим: сколько раз "2" встретится
s = "22122212"
program = [("22", "22", "2")]
print(editor(s, program))`
            },
            {
                name: "Машина Тьюринга",
                description: "Моделирование работы Машины Тьюринга",
                code: `def turing(tape_str, start_state, rules):
    tape = list(tape_str)
    pos = 0
    state = start_state

    for _ in range(10000):  # защита от зацикливания
        if pos < 0:
            tape.insert(0, 'λ')
            pos = 0
        if pos >= len(tape):
            tape.append('λ')

        ch = tape[pos]
        key = (state, ch)
        if key not in rules:
            break

        new_ch, move, new_state = rules[key]
        tape[pos] = new_ch
        state = new_state

        if move == 'R':
            pos += 1
        elif move == 'L':
            pos -= 1
        # 'N' — не двигаемся

    return ''.join(c for c in tape if c != 'λ')

# Пример: инвертирование битов
rules = {
    ('q0', '0'): ('1', 'R', 'q0'),
    ('q0', '1'): ('0', 'R', 'q0'),
    ('q0', 'λ'): ('λ', 'N', 'q1'),  # конец
}
print(turing("10110", "q0", rules))  # 01001`
            }
        ]
    },
    task16: {
        title: "Задание 16 — Рекуррентные выражения",
        templates: [
            {
                name: "Две взаимные функции F(n) и G(n)",
                description: "Типовой формат: F зависит от G, G зависит от себя",
                code: `from functools import lru_cache
import sys
sys.setrecursionlimit(100000)

@lru_cache(maxsize=None)
def F(n):
    return G(n) * G(n - 4)

@lru_cache(maxsize=None)
def G(n):
    if n < 10:
        return 5
    return G(n - 5) + 1

print(F(5000))`
            },
            {
                name: "Итеративное вычисление (без рекурсии)",
                description: "Замена рекурсии на массив — надёжнее для больших n",
                code: `n = 9000

# Вычисляем G(i) итеративно
g = [0] * (n + 1)
for i in range(n + 1):
    if i < 7:
        g[i] = 2
    else:
        g[i] = g[i - 2] + 3

# Вычисляем F(n) = G(n-1) - G(n-3)
result = g[n - 1] - g[n - 3]
print(result)`
            }
        ]
    },
    task17: {
        title: "Задание 17 — Обработка последовательности из файла",
        templates: [
            {
                name: "Пары подряд идущих элементов",
                description: "Подсчёт пар и экстремум — типовая задача",
                code: `with open('17.txt') as f:
    n = int(f.readline())
    prev = int(f.readline())
    count = 0
    max_sum = None

    for _ in range(n - 1):
        cur = int(f.readline())
        s = prev + cur
        if s % 23 == 0:         # условие на пару
            count += 1
            if max_sum is None or s > max_sum:
                max_sum = s
        prev = cur

print(count, max_sum)`
            },
            {
                name: "Два прохода: запомнить max/min, потом искать пары",
                description: "Когда условие зависит от глобального max/min",
                code: `with open('17.txt') as f:
    n = int(f.readline())
    a = [int(f.readline()) for _ in range(n)]

# Первый проход: находим максимум
max_val = max(a)

# Второй проход: ищем пары с условием
count = 0
best = None
for i in range(n - 1):
    if a[i] + a[i + 1] < max_val:  # условие
        count += 1
        s = a[i] + a[i + 1]
        if best is None or s > best:
            best = s

print(count, best)`
            },
            {
                name: "Оптимизация O(n): раздельные max по чётным/нечётным",
                description: "Когда нужно max произведения пары с условием чётности",
                code: `with open('17.txt') as f:
    n = int(f.readline())
    a = [int(f.readline()) for _ in range(n)]

# Два наибольших среди положительных чётных
even = sorted([x for x in a if x > 0 and x % 2 == 0],
              reverse=True)[:2]
# Два наибольших среди положительных нечётных
odd = sorted([x for x in a if x > 0 and x % 2 != 0],
             reverse=True)[:2]

results = []
if len(even) >= 2:
    results.append(even[0] * even[1])
if len(odd) >= 2:
    results.append(odd[0] * odd[1])

print(max(results))`
            }
        ]
    },
    task18: {
        title: "Задание 18 — Робот-сборщик (ДП на сетке)",
        templates: [
            {
                name: "Максимальная сумма монет (только вправо и вниз)",
                description: "Классическое ДП на сетке — робот собирает максимум",
                code: `# Сетка монет (0 — пусто, число — кол-во монет)
grid = [
    [1, 3, 1, 0],
    [2, 0, 5, 1],
    [4, 2, 0, 3],
    [0, 1, 2, 1]
]

n = len(grid)
m = len(grid[0])

# dp[i][j] = максимальная сумма до клетки (i, j)
dp = [[0] * m for _ in range(n)]
dp[0][0] = grid[0][0]

for i in range(1, n):
    dp[i][0] = dp[i - 1][0] + grid[i][0]
for j in range(1, m):
    dp[0][j] = dp[0][j - 1] + grid[0][j]

for i in range(1, n):
    for j in range(1, m):
        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]

print("Максимум:", dp[n - 1][m - 1])`
            },
            {
                name: "Минимальная и максимальная сумма одновременно",
                description: "Робот-сборщик: найти и min, и max пути",
                code: `grid = [
    [1, 3, 1],
    [2, 0, 5],
    [4, 2, 1]
]

n = len(grid)
m = len(grid[0])
INF = float('inf')

dp_max = [[-INF] * m for _ in range(n)]
dp_min = [[INF] * m for _ in range(n)]
dp_max[0][0] = dp_min[0][0] = grid[0][0]

for i in range(n):
    for j in range(m):
        if i == 0 and j == 0:
            continue
        vals = []
        if i > 0:
            vals.append((dp_max[i-1][j], dp_min[i-1][j]))
        if j > 0:
            vals.append((dp_max[i][j-1], dp_min[i][j-1]))
        dp_max[i][j] = max(v[0] for v in vals) + grid[i][j]
        dp_min[i][j] = min(v[1] for v in vals) + grid[i][j]

print("Макс:", dp_max[n-1][m-1])
print("Мин:", dp_min[n-1][m-1])`
            }
        ]
    },
    task19_21: {
        title: "Задания 19–21 — Теория игр",
        templates: [
            {
                name: "Анализ игры с кучей камней",
                description: "Два игрока, куча камней, операции +1, +3, ×2 и т.д.",
                code: `# Определяем позиции: W = выигрышная, L = проигрышная
# Позиция >= target — конец игры (кто довёл, тот выиграл)

target = 25  # целевое значение

def moves(s):
    """Возможные ходы из позиции s"""
    return [s + 1, s + 3, s * 2]

# Строим таблицу: 'W' или 'L' для каждой позиции
pos = {}
for s in range(target, target + 100):
    pos[s] = 'L'  # >= target — предыдущий игрок выиграл

for s in range(target - 1, 0, -1):
    # Если есть ход в проигрышную — это выигрышная
    if any(pos.get(m, 'L') == 'L' for m in moves(s)):
        pos[s] = 'W'
    else:
        pos[s] = 'L'

# Задание 19: первый выигрывает за 1 ход
for s in range(1, target):
    if any(m >= target for m in moves(s)):
        has_win1 = True
    else:
        has_win1 = False
    # тут можно дополнить вывод`
            },
            {
                name: "Полный анализ: выигрыш за 1 и 2 хода",
                description: "Классификация позиций для заданий 19, 20, 21",
                code: `target = 44

def moves(s):
    return [s + 1, s + 4, s * 3]

# Помечаем позиции
# 'W1' — выигрыш за 1 ход
# 'L1' — проигрыш: все ходы в W1
# 'W2' — выигрыш за 2 хода: есть ход в L1
mark = {}

for s in range(target + 100, 0, -1):
    if s >= target:
        mark[s] = 'end'
        continue

    m = moves(s)
    # Можно ли выиграть за 1 ход?
    if any(x >= target for x in m):
        mark[s] = 'W1'
    # Все ходы ведут в W1? Тогда проигрыш
    elif all(mark.get(x, '') == 'W1' for x in m):
        mark[s] = 'L1'
    # Есть ход в L1? Тогда выигрыш за 2
    elif any(mark.get(x, '') == 'L1' for x in m):
        mark[s] = 'W2'
    else:
        mark[s] = 'other'

# Задание 19: S, где 1-й не может выиграть за 1 ход,
# но 2-й выигрывает при любом ходе 1-го
for s in range(1, target):
    if mark[s] == 'L1':
        print(f"Задание 19/20: S = {s}")

# Задание 21: S, откуда 1-й выигрывает за 2 хода
for s in range(1, target):
    if mark[s] == 'W2':
        print(f"Задание 21: S = {s}")`
            },
            {
                name: "Игра с двумя кучами",
                description: "Когда позиция задаётся парой (a, b)",
                code: `target = 70

def moves(a, b):
    return [
        (a + 1, b), (a, b + 1),
        (a * 2, b), (a, b * 2)
    ]

def is_end(a, b):
    return a + b >= target

mark = {}

# Обратный ход: от больших к меньшим
for total in range(2 * target, -1, -1):
    for a in range(total + 1):
        b = total - a
        if a < 0 or b < 0:
            continue
        if is_end(a, b):
            mark[(a, b)] = 'end'
            continue
        m = moves(a, b)
        if any(is_end(x, y) for x, y in m):
            mark[(a, b)] = 'W1'
        elif all(mark.get((x, y), '') == 'W1'
                 for x, y in m if not is_end(x, y)):
            mark[(a, b)] = 'L1'
        elif any(mark.get((x, y), '') == 'L1' for x, y in m):
            mark[(a, b)] = 'W2'
        else:
            mark[(a, b)] = 'other'

# Поиск ответа
for a in range(1, target):
    for b in range(1, target - a):
        if mark.get((a, b)) == 'L1':
            print(f"L1: ({a}, {b})")`
            }
        ]
    },
    task22: {
        title: "Задание 22 — Параллельные процессы",
        templates: [
            {
                name: "Планирование с зависимостями",
                description: "Вычисление времени завершения процессов с зависимостями",
                code: `# Процессы: (id, длительность, [зависимости])
processes = [
    (1, 5, []),
    (2, 3, []),
    (3, 4, [1]),
    (4, 2, [1, 2]),
    (5, 6, [3]),
    (6, 3, [4]),
    (7, 1, [5, 6]),
]

# Вычисляем время завершения каждого процесса
finish = {}
for pid, dur, deps in processes:
    start = max((finish[d] for d in deps), default=0)
    finish[pid] = start + dur

# Общее время
print("Время завершения:", max(finish.values()))

# Сколько процессов начинается после момента T?
T = 5
starts = {}
for pid, dur, deps in processes:
    starts[pid] = max((finish[d] for d in deps), default=0)

after_T = sum(1 for s in starts.values() if s >= T)
print(f"Процессов после t={T}:", after_T)`
            },
            {
                name: "Максимум одновременных процессов",
                description: "Подсчёт максимального числа параллельных процессов",
                code: `processes = [
    (1, 5, []),
    (2, 3, []),
    (3, 4, [1]),
    (4, 2, [1, 2]),
    (5, 6, [3]),
    (6, 3, [4]),
    (7, 1, [5, 6]),
]

# Вычисляем начало и конец
finish = {}
start_time = {}
for pid, dur, deps in processes:
    s = max((finish[d] for d in deps), default=0)
    start_time[pid] = s
    finish[pid] = s + dur

total_time = max(finish.values())

# Для каждого момента считаем активные процессы
max_parallel = 0
for t in range(total_time):
    active = sum(
        1 for pid in finish
        if start_time[pid] <= t < finish[pid]
    )
    max_parallel = max(max_parallel, active)

print("Макс. параллельных:", max_parallel)`
            }
        ]
    },
    task23: {
        title: "Задание 23 — Подсчёт программ для исполнителя",
        templates: [
            {
                name: "ДП: подсчёт программ (числовой исполнитель)",
                description: "Исполнитель с командами +1, +2, ×3 и т.д.",
                code: `# Исполнитель с командами: +1, +2, *3
start = 1
end = 20

dp = [0] * (end + 1)
dp[start] = 1

for i in range(start, end + 1):
    if dp[i] == 0:
        continue
    # Команда +1
    if i + 1 <= end:
        dp[i + 1] += dp[i]
    # Команда +2
    if i + 2 <= end:
        dp[i + 2] += dp[i]
    # Команда *3
    if i * 3 <= end:
        dp[i * 3] += dp[i]

print(dp[end])`
            },
            {
                name: "ДП с запрещёнными промежуточными значениями",
                description: "Некоторые числа нельзя использовать как промежуточные",
                code: `start = 2
end = 30
forbidden = {10, 15, 20}  # запрещённые позиции

dp = [0] * (end + 1)
dp[start] = 1

for i in range(start, end + 1):
    if dp[i] == 0 or (i in forbidden and i != end):
        continue
    if i + 1 <= end:
        dp[i + 1] += dp[i]
    if i + 3 <= end:
        dp[i + 3] += dp[i]
    if i * 2 <= end:
        dp[i * 2] += dp[i]

print(dp[end])`
            },
            {
                name: "Подсчёт путей в графе (матрица)",
                description: "Граф задан матрицей смежности — считаем пути",
                code: `# Матрица смежности
matrix = [
    [0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0]
]

n = len(matrix)
dp = [0] * n
dp[0] = 1  # стартовая вершина

for i in range(n):
    for j in range(n):
        if matrix[i][j] == 1:
            dp[j] += dp[i]

print("Путей:", dp[n - 1])`
            }
        ]
    },
    task24: {
        title: "Задание 24 — Обработка строк из файла",
        templates: [
            {
                name: "Максимальная подстрока с условием",
                description: "Скользящее окно: макс. длина подстроки, где символ X встречается ≤ K раз",
                code: `with open('24.txt') as f:
    s = f.readline().strip()

target = 'A'  # символ
k = 3          # макс. вхождений

best = 0
count = 0
left = 0

for right in range(len(s)):
    if s[right] == target:
        count += 1
    while count > k:
        if s[left] == target:
            count -= 1
        left += 1
    best = max(best, right - left + 1)

print(best)`
            },
            {
                name: "Подсчёт подстрок в строке",
                description: "Количество вхождений подстроки",
                code: `with open('24.txt') as f:
    s = f.readline().strip()

sub = 'ab'
count = 0
for i in range(len(s) - len(sub) + 1):
    if s[i:i + len(sub)] == sub:
        count += 1

# Или короче:
count = s.count(sub)
print(count)`
            },
            {
                name: "Максимальная цепочка одинаковых символов",
                description: "Длина самой длинной непрерывной последовательности",
                code: `with open('24.txt') as f:
    s = f.readline().strip()

max_len = 1
cur_len = 1
max_char = s[0]

for i in range(1, len(s)):
    if s[i] == s[i - 1]:
        cur_len += 1
        if cur_len > max_len:
            max_len = cur_len
            max_char = s[i]
    else:
        cur_len = 1

print(f"Символ '{max_char}', длина {max_len}")`
            }
        ]
    },
    task25: {
        title: "Задание 25 — Делители и целочисленная обработка",
        templates: [
            {
                name: "Все делители числа (до √n)",
                description: "Эффективный перебор делителей",
                code: `def divisors(n):
    result = []
    i = 1
    while i * i <= n:
        if n % i == 0:
            result.append(i)
            if i != n // i:
                result.append(n // i)
        i += 1
    return sorted(result)

print(divisors(120))`
            },
            {
                name: "Проверка на простоту и простые числа",
                description: "Перебор и решето Эратосфена",
                code: `def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True

# Простые числа до N (решето Эратосфена)
def sieve(n):
    s = [True] * (n + 1)
    s[0] = s[1] = False
    for i in range(2, int(n**0.5) + 1):
        if s[i]:
            for j in range(i*i, n + 1, i):
                s[j] = False
    return [i for i in range(n + 1) if s[i]]

print(sieve(100))`
            },
            {
                name: "Перебор чисел с условием на делители",
                description: "Поиск чисел по свойствам делителей",
                code: `def divisors(n):
    result = []
    i = 1
    while i * i <= n:
        if n % i == 0:
            result.append(i)
            if i != n // i:
                result.append(n // i)
        i += 1
    return sorted(result)

# Числа с ровно 6 делителями, где сумма делителей чётна
for n in range(2, 10001):
    d = divisors(n)
    if len(d) == 6 and sum(d) % 2 == 0:
        print(n, d)`
            },
            {
                name: "НОД и НОК (алгоритм Евклида)",
                description: "Наибольший общий делитель и наименьшее общее кратное",
                code: `from math import gcd

# НОД
def my_gcd(a, b):
    while b:
        a, b = b, a % b
    return a

# НОК
def lcm(a, b):
    return a * b // gcd(a, b)

print(gcd(48, 18))   # 6
print(lcm(12, 18))   # 36`
            }
        ]
    },
    task26: {
        title: "Задание 26 — Сортировка и оптимизация (2 балла)",
        templates: [
            {
                name: "Чтение данных и сортировка",
                description: "Базовый шаблон чтения файла с парами значений",
                code: `with open('26.txt') as f:
    n = int(f.readline())
    data = []
    for _ in range(n):
        a, b = map(int, f.readline().split())
        data.append((a, b))

# Сортировка по первому полю
data.sort()

# Или по второму полю в обратном порядке:
# data.sort(key=lambda x: x[1], reverse=True)`
            },
            {
                name: "Максимальная цепочка вложений",
                description: "Задача про вложенные ящики / отрезки (жадный + сортировка)",
                code: `with open('26.txt') as f:
    n = int(f.readline())
    data = []
    for _ in range(n):
        size = int(f.readline())
        data.append(size)

data.sort()
d = 5  # минимальная разница

# Жадный алгоритм: берём элемент, если он >= prev + d
chain = [data[0]]
for i in range(1, n):
    if data[i] >= chain[-1] + d:
        chain.append(data[i])

print("Длина цепочки:", len(chain))
print("Минимальный элемент:", chain[0])`
            },
            {
                name: "Два указателя на отсортированном массиве",
                description: "Подсчёт пар с условием на сумму/разность",
                code: `with open('26.txt') as f:
    n = int(f.readline())
    a = sorted(int(f.readline()) for _ in range(n))

target = 100
count = 0
left, right = 0, n - 1

while left < right:
    s = a[left] + a[right]
    if s == target:
        count += 1
        left += 1
        right -= 1
    elif s < target:
        left += 1
    else:
        right -= 1

print(count)`
            },
            {
                name: "Задача про расписание / интервалы",
                description: "Максимум непересекающихся отрезков (жадный)",
                code: `with open('26.txt') as f:
    n = int(f.readline())
    intervals = []
    for _ in range(n):
        start, end = map(int, f.readline().split())
        intervals.append((end, start))

# Сортируем по времени окончания
intervals.sort()

count = 0
last_end = -1

for end, start in intervals:
    if start >= last_end:
        count += 1
        last_end = end

print("Макс. непересекающихся:", count)`
            }
        ]
    },
    task27: {
        title: "Задание 27 — Анализ данных (2 балла)",
        templates: [
            {
                name: "Кластеризация точек в прямоугольники",
                description: "Разбиение точек на кластеры с ограничением H × W",
                code: `with open('27.txt') as f:
    n = int(f.readline())
    points = []
    for _ in range(n):
        x, y = map(int, f.readline().split())
        points.append((x, y))

H, W = 10, 10  # размеры прямоугольника кластера

# Сортируем по x
points.sort()

# Жадная кластеризация
clusters = []
used = [False] * n

for i in range(n):
    if used[i]:
        continue
    cluster = [points[i]]
    used[i] = True
    x0, y0 = points[i]
    for j in range(i + 1, n):
        if used[j]:
            continue
        xj, yj = points[j]
        if abs(xj - x0) <= W and abs(yj - y0) <= H:
            cluster.append(points[j])
            used[j] = True
    clusters.append(cluster)

for i, c in enumerate(clusters):
    print(f"Кластер {i+1}: {len(c)} точек")`
            },
            {
                name: "Фильтрация аномалий и статистика",
                description: "Удаление выбросов и вычисление средних",
                code: `import math

with open('27.txt') as f:
    n = int(f.readline())
    points = []
    for _ in range(n):
        x, y = map(int, f.readline().split())
        points.append((x, y))

# Центр масс
cx = sum(x for x, y in points) / n
cy = sum(y for x, y in points) / n

# Убираем аномалии (точки далее порога)
threshold = 50
clean = [(x, y) for x, y in points
         if math.sqrt((x - cx)**2 + (y - cy)**2) < threshold]

print(f"До очистки: {n}, после: {len(clean)}")
print(f"Среднее X: {sum(x for x,y in clean)/len(clean):.2f}")
print(f"Среднее Y: {sum(y for x,y in clean)/len(clean):.2f}")`
            },
            {
                name: "Группировка и агрегация данных",
                description: "Группировка по категориям и подсчёт статистики",
                code: `from collections import defaultdict

with open('27.txt') as f:
    n = int(f.readline())
    data = []
    for _ in range(n):
        parts = f.readline().split()
        group = int(parts[0])
        value = int(parts[1])
        data.append((group, value))

# Группировка
groups = defaultdict(list)
for g, v in data:
    groups[g].append(v)

# Статистика по группам
for g in sorted(groups):
    vals = groups[g]
    print(f"Группа {g}: n={len(vals)}, "
          f"sum={sum(vals)}, "
          f"avg={sum(vals)/len(vals):.1f}, "
          f"max={max(vals)}")`
            },
            {
                name: "Пары строк с условием (оптимизация)",
                description: "Перебор пар с отсечением через сортировку",
                code: `with open('27.txt') as f:
    n = int(f.readline())
    data = []
    for _ in range(n):
        a, b = map(int, f.readline().split())
        data.append((a, b))

data.sort()  # сортировка для отсечения

best = -1
for i in range(n):
    for j in range(i + 1, n):
        # Отсечение: если разница по 1-му полю > 5, дальше не ищем
        if data[j][0] - data[i][0] > 5:
            break
        val = data[i][1] + data[j][1]
        best = max(best, val)

print(best)`
            }
        ]
    },
    task14: {
        title: "Задание 14 — Системы счисления (программирование)",
        templates: [
            {
                name: "Перевод числа в другую систему счисления",
                description: "Получение записи числа в системе с основанием base",
                code: `def to_base(n, base):
    if n == 0:
        return '0'
    digits = []
    while n > 0:
        digits.append(str(n % base))
        n //= base
    return ''.join(reversed(digits))

print(to_base(255, 2))   # 11111111
print(to_base(255, 8))   # 377
print(to_base(255, 16))  # 15 15 (FF)`
            },
            {
                name: "Подсчёт цифр в записи числа",
                description: "Сколько определённых цифр в записи числа",
                code: `def count_digit(n, base, digit):
    count = 0
    while n > 0:
        if n % base == digit:
            count += 1
        n //= base
    return count

# Сколько единиц в двоичной записи 255?
print(count_digit(255, 2, 1))  # 8

# Сумма цифр в троичной записи
def digit_sum(n, base):
    s = 0
    while n > 0:
        s += n % base
        n //= base
    return s

print(digit_sum(100, 3))`
            },
            {
                name: "Перебор оснований по условию",
                description: "Найти основание, при котором запись удовлетворяет условию",
                code: `def to_digits(n, base):
    digits = []
    while n > 0:
        digits.append(n % base)
        n //= base
    return digits[::-1]

n = 1000
for base in range(2, 37):
    d = to_digits(n, base)
    if sum(d) == 10:
        print(f"Основание {base}: {''.join(map(str, d))}")`
            }
        ]
    }
};

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

function getCSFormulasCount() {
    let count = 0;
    for (const section of Object.values(CS_FORMULAS)) {
        count += section.formulas.length;
    }
    return count;
}

function getCSTemplatesCount() {
    let count = 0;
    for (const section of Object.values(CS_TEMPLATES)) {
        count += section.templates.length;
    }
    return count;
}
