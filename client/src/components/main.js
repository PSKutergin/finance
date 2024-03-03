import pieChart from '../modules/charts';
import { Operation } from "../services/operation";
import Calendar from "./calendar";

export class Main {
    filterBtns = null
    dateIntervalContainer = null

    constructor() {
        this.incomeChart = null
        this.expenseChart = null
        this.init();
    }
    init() {
        this.popup = document.querySelector('.content__popup');
        this.filterBtns = document.querySelectorAll('.content__nav-item');
        this.dateIntervalContainer = document.getElementById('dateInterval');
        this.chartIncome = document.getElementById('chart-income');
        this.chartExpense = document.getElementById('chart-expense');
        this.noIncome = document.getElementById('no-income');
        this.noExpense = document.getElementById('no-expense');
        this.incomeChartElement = document.getElementById('pie-chart-income');
        this.expenseChartElement = document.getElementById('pie-chart-expense');
        this.inputDateFrom = document.getElementById('dateFrom');
        this.inputDateTo = document.getElementById('dateTo');
        this.calendarBoxFrom = document.getElementById('calendarFrom');
        this.calendarBoxTo = document.getElementById('calendarTo');

        if (this.filterBtns) {
            this.filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.classList.add('active');

                    this.query = e.target.id;
                    if (this.query === 'interval') {
                        this.isOpenDateIntervalContainer()
                        console.log('interval');
                    } else {
                        this.isCloseDateIntervalContainer();
                        this.getOperations(this.query)
                    }

                    this.filterBtns.forEach(item => {
                        if (item !== e.target) {
                            item.classList.remove('active');
                        }
                    })
                })
            })
        }

        if (this.incomeChartElement && this.expenseChartElement) {
            this.incomeChart = pieChart(this.incomeChartElement, 'Доходы', [], []);
            this.expenseChart = pieChart(this.expenseChartElement, 'Расходы', [], []);
        }

        if (this.inputDateFrom && this.inputDateTo && this.calendarBoxFrom && this.calendarBoxTo) {
            this.currentCalendarFrom = new Calendar(this.calendarBoxFrom, this.inputDateFrom);
            this.currentCalendarTo = new Calendar(this.calendarBoxTo, this.inputDateTo);
            this.initInputs();
        }

        this.getOperations(this.query)
    }

    isOpenDateIntervalContainer() {
        this.dateIntervalContainer.classList.add('open');
    }

    isCloseDateIntervalContainer() {
        this.dateIntervalContainer.classList.remove('open');
    }

    initInputs() {
        this.inputDateFrom.addEventListener('click', (e) => {
            this.currentCalendarFrom.showCalendar();
        })
        this.inputDateTo.addEventListener('click', (e) => {
            this.currentCalendarTo.showCalendar();
        })

        document.addEventListener('click', (e) => {
            if (e.target !== this.inputDateFrom && !e.target.closest('#prevMonth') && !e.target.closest('#nextMonth')) {
                this.calendarBoxFrom.classList.remove('open');
            }
            if (e.target !== this.inputDateTo && !e.target.closest('#prevMonth') && !e.target.closest('#nextMonth')) {
                this.calendarBoxTo.classList.remove('open');
            }
        });
    }

    async getOperations(interval = null, dateFrom = null, dateTo = null) {
        try {
            let respons
            if (interval && dateFrom && dateTo) {
                respons = await Operation.getOperations(interval, dateFrom, dateTo);
            } else if (interval && !dateFrom && !dateTo) {
                respons = await Operation.getOperations(interval);
            } else {
                respons = await Operation.getOperations();
            }
            this.renderCharts(respons.data);
        } catch (error) {
            console.log(error);
        }
    }

    renderCharts(data) {
        const { incomeValues, expenseValues } = data.reduce((acc, curr) => {
            const { type, category, amount } = curr;
            if (type === 'income') {
                acc.incomeValues.set(category, (acc.incomeValues.get(category) || 0) + amount);
            } else if (type === 'expense') {
                acc.expenseValues.set(category, (acc.expenseValues.get(category) || 0) + amount);
            }
            return acc;
        }, {
            incomeValues: new Map(),
            expenseValues: new Map()
        });

        if (this.noIncome && this.incomeChart) {
            if ([...incomeValues.keys()].length) {
                this.chartIncome.classList.remove('hide');
                this.noIncome.classList.add('hide');
                this.incomeChart.data.labels = [...incomeValues.keys()];
                this.incomeChart.data.datasets[0].data = [...incomeValues.values()];
                this.incomeChart.update();
            } else {
                this.chartIncome.classList.add('hide');
                this.noIncome.classList.remove('hide');
            }
        }

        if (this.noExpense && this.expenseChart) {
            if ([...expenseValues.keys()].length) {
                this.chartExpense.classList.remove('hide');
                this.noExpense.classList.add('hide');
                this.expenseChart.data.labels = [...expenseValues.keys()];
                this.expenseChart.data.datasets[0].data = [...expenseValues.values()];
                this.expenseChart.update();
            } else {
                this.chartExpense.classList.add('hide');
                this.noExpense.classList.remove('hide');
            }
        }
    }
}