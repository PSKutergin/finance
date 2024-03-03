import { Operation } from '../services/operation';

export class AddEditOperations {
    constructor(mode) {
        this.mode = mode;
        this.title = '';
        this.textBtn = '';
        this.idOperation = null;
        this.currentType = null;
        this.contentTitle = null;
        this.contentBtn = null;
        this.currentMonth = null;
        this.currentYear = null;
        this.init();
    }

    init() {
        this.currentMonth = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
        this.currentType = window.currentType.getType();
        this.contentTitle = document.querySelector('.content__title');
        this.contentBtn = document.querySelector('.content__button');
        this.contentBtnCnl = document.querySelector('.content__button-cancel');
        this.contentForm = document.querySelector('.content__form');
        this.typeSelect = document.getElementById('type');
        this.categorySelect = document.getElementById('category_id');
        this.inputAmount = document.getElementById('amount');
        this.inputDate = document.getElementById('date');
        this.calendar = document.getElementById('calendar');

        if (this.contentTitle && this.contentBtn) {
            if (this.mode === 'edit') {
                this.idOperation = window.location.hash.split('/')[2];
                this.title = 'Редактирование дохода/расхода';
                this.textBtn = 'Сохранить';

                try {
                    this.getOperationFromApi();
                } catch (error) {
                    console.log(error);
                }
            } else if (this.mode === 'new') {
                this.title = 'Создание дохода/расхода';
                this.textBtn = 'Создать';
                this.typeSelect.value = this.currentType;
                this.renderCategoriesSelect(this.currentType);
            }

            this.contentTitle.textContent = this.title;
            this.contentBtn.textContent = this.textBtn;
        }

        if (this.contentBtnCnl && this.contentBtn) {
            this.initButtons();
        }

        if (this.inputDate && this.calendar && this.inputAmount) {
            this.initInputs();
        }

        if (this.typeSelect) {
            this.typeSelect.addEventListener('change', (e) => {
                this.renderCategoriesSelect(e.target.value);
            })
        }
    }

    initButtons() {
        this.contentBtn.addEventListener('click', () => {
            if (this.mode === 'edit') {
                this.editOperation();
            } else if (this.mode === 'new') {
                this.addOperation();
            }
        })

        this.contentBtnCnl.addEventListener('click', () => {
            window.location.hash = `#/balance`;
        })
    }

    initInputs() {
        this.inputDate.addEventListener('click', (e) => {
            this.showCalendar(this.inputDate, this.calendar);
        })

        document.addEventListener('click', (e) => {
            if (e.target !== this.inputDate && !e.target.closest('#prevMonth') && !e.target.closest('#nextMonth')) {
                this.calendar.classList.remove('open');
            }
        });

        this.inputAmount.addEventListener('input', (event) => {
            let value = event.target.value;
            value = value.replace(/[^\d.]/g, '');
            if (!/^\d*\.?\d*$/.test(value)) {
                value = value.slice(0, -1);
            }
            event.target.value = value;
        });
    }

    renderCategoriesSelect(type) {
        const categoriesList = window.categories.getCategories(type);
        this.categorySelect.innerHTML = '';

        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Категория...';
        option.disabled = true;
        option.selected = true;
        this.categorySelect.appendChild(option);

        if (this.categorySelect) {
            categoriesList.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.title;
                this.categorySelect.appendChild(option);
            })
        }
    }

    async getOperationFromApi() {
        const res = await Operation.getOperation(this.idOperation);
        const operationData = res.data;
        this.currentType = operationData.type;

        const categoriesList = await window.categories.getCategories(this.currentType);
        this.renderCategoriesSelect(this.currentType);

        Array.from(this.contentForm.elements).forEach((elem) => {
            Object.keys(operationData).forEach((item) => {
                if (elem.name === 'category_id' && operationData.category) {
                    const categoryId = categoriesList.find((el) => el.title === operationData.category)?.id;
                    if (categoryId !== undefined) {
                        elem.value = categoryId;
                    }
                } else if (elem.name === item) {
                    elem.value = operationData[item];
                }
            });
        });
    }

    async editOperation() {
        const formData = new FormData(this.contentForm);
        const { category, ...operationData } = {
            ...Object.fromEntries(formData),
            amount: +formData.get('amount'),
            category_id: +formData.get('category_id')
        }
        try {
            await Operation.editOperation(this.idOperation, operationData);
            window.location.hash = `#/balance`;
        } catch (error) {
            console.log(error);
        }
    }

    async addOperation() {
        const formData = new FormData(this.contentForm);
        const { category, ...operationData } = {
            ...Object.fromEntries(formData),
            amount: +formData.get('amount'),
            category_id: +formData.get('category_id')
        }
        try {
            await Operation.setOperations(operationData);
            window.location.hash = `#/balance`;
        } catch (error) {
            console.log(error);
        }
    }

    showCalendar() {
        let calendarHTML = '<div class="calendar-header">';
        calendarHTML += '<button id="prevMonth">&#60;</button>';
        calendarHTML += '<span>' + this.currentYear + ' - ' + this.currentMonth + '</span>';
        calendarHTML += '<button id="nextMonth">&#62;</button>';
        calendarHTML += '</div>';
        calendarHTML += '<table>';
        calendarHTML += '<thead><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr></thead>';
        calendarHTML += '<tbody>';

        // Определяем первый день месяца
        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
        // Определяем день недели, с которого начинается календарь (0 - Воскресенье, 1 - Понедельник, ..., 6 - Суббота)
        const startingDayOfWeek = 1; // Начало недели с Понедельника (1)
        let offset = firstDayOfMonth - startingDayOfWeek;
        if (offset < 0) {
            offset += 7;
        }

        // Добавляем пустые ячейки перед первым днем месяца
        calendarHTML += '<tr>';
        for (let i = 0; i < offset; i++) {
            calendarHTML += '<td></td>';
        }

        // Добавляем дни месяца
        const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            if (offset % 7 === 0) {
                calendarHTML += '</tr><tr>'; // Начинаем новую строку для следующей недели
            }
            calendarHTML += '<td>' + day + '</td>';
            offset++;
        }

        calendarHTML += '</tr></tbody></table>';

        this.calendar.innerHTML = calendarHTML;
        this.calendar.classList.add('open');

        this.calendar.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if (target.tagName === 'TD' && target.innerHTML !== '') {
                const selectedDate = this.currentYear + '-' + this.currentMonth.toString().padStart(2, '0') + '-' + target.innerHTML.padStart(2, '0');
                this.inputDate.value = selectedDate;
                this.calendar.classList.remove('open');
            }
        });

        this.initMonthSwitching();
    }

    initMonthSwitching() {
        const prevMonthButton = document.getElementById('prevMonth');
        const nextMonthButton = document.getElementById('nextMonth');
        prevMonthButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.currentMonth--;
            if (this.currentMonth < 1) {
                this.currentMonth = 12;
                this.currentYear--;
            }
            this.showCalendar();
        });
        nextMonthButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.currentMonth++;
            if (this.currentMonth > 12) {
                this.currentMonth = 1;
                this.currentYear++;
            }
            this.showCalendar();
        });
    }
}