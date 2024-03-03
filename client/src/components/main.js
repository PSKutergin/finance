import pieChart from '../modules/charts';
import { Operation } from "../services/operation";

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

        this.getOperations(this.query)
    }

    isOpenDateIntervalContainer() {
        this.dateIntervalContainer.classList.add('open');
    }

    isCloseDateIntervalContainer() {
        this.dateIntervalContainer.classList.remove('open');
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