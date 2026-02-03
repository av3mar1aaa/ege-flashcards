/**
 * Панель инструментов
 * Управляет открытием/закрытием панели и переключением вкладок
 */
const Tools = {
    isOpen: false,
    currentTab: 'calculator',

    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('tools-btn').addEventListener('click', () => this.open());
        document.getElementById('tools-close-btn').addEventListener('click', () => this.close());

        document.getElementById('tools-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'tools-overlay') this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        document.querySelectorAll('.tools-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tool));
        });
    },

    open() {
        this.isOpen = true;
        document.getElementById('tools-overlay').classList.remove('hidden');
        this.onTabActivated(this.currentTab);
    },

    close() {
        this.isOpen = false;
        document.getElementById('tools-overlay').classList.add('hidden');
    },

    switchTab(tabName) {
        this.currentTab = tabName;

        document.querySelectorAll('.tools-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tool === tabName);
        });

        document.querySelectorAll('.tools-content').forEach(c => {
            c.classList.remove('active');
        });
        document.getElementById('tool-' + tabName).classList.add('active');

        this.onTabActivated(tabName);
    },

    onTabActivated(tabName) {
        if (tabName === 'calculator' && typeof Calculator !== 'undefined') Calculator.init();
        else if (tabName === 'focus' && typeof Focus !== 'undefined') Focus.init();
        else if (tabName === 'pomodoro' && typeof Pomodoro !== 'undefined') Pomodoro.init();
        else if (tabName === 'ide' && typeof IDE !== 'undefined') IDE.init();
    }
};
