export default class Calendar {
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth() + 1;
    currentDay = new Date().getDate();

    constructor(calendar, inputDate) {
        this.calendar = calendar;
        this.inputDate = inputDate;
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