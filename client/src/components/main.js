import Chart from 'chart.js/auto';
import pieChart from '../modules/charts';

export class Main {
    filterBtns = null
    dateIntervalContainer = null

    constructor() {
        this.init();
    }
    init() {
        this.popup = document.querySelector('.content__popup');
        this.filterBtns = document.querySelectorAll('.content__nav-item');
        this.dateIntervalContainer = document.getElementById('dateInterval');
        this.incomeChart = document.getElementById('pie-chart-income');
        this.expenseChart = document.getElementById('pie-chart-expense');

        const incomeCategories = ["Red", "Orange", "Yellow", "Green", "Blue"];
        const incomeValues = [2478, 5267, 734, 784, 433];

        const expensesCategories = ["Red", "Orange", "Yellow", "Green", "Blue"];
        const expensesValues = [2478, 5267, 734, 784, 433];

        if (this.incomeChart && this.expenseChart) {
            pieChart(this.incomeChart, 'Доходы', incomeCategories, incomeValues);
            pieChart(this.expenseChart, 'Расходы', expensesCategories, expensesValues);
        }

        if (this.filterBtns) {
            this.filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.classList.add('active');
                    this.filterBtns.forEach(item => {
                        if (item !== e.target) {
                            item.classList.remove('active');
                        }
                    })

                    e.target.id === 'dateIntervalBtn' ? this.isOpenDateIntervalContainer() : this.isCloseDateIntervalContainer();
                })
            })
        }
    }

    isOpenDateIntervalContainer() {
        this.dateIntervalContainer.classList.add('open');
    }

    isCloseDateIntervalContainer() {
        this.dateIntervalContainer.classList.remove('open');
    }
}