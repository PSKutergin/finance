import { Operation } from "../services/operation";
import { formatDate } from "../helpers/helpers";

export class Balance {
    constructor() {
        this.init();
    }

    init() {
        this.filterBtns = document.querySelectorAll('.content__nav-item');
        this.dateIntervalContainer = document.getElementById('dateInterval');
        this.contentTableBody = document.querySelector('.content__table-body');
        this.popup = document.querySelector('.content__popup');
        this.createIncomeBtn = document.querySelector('.content__button-income');
        this.createExpenseBtn = document.querySelector('.content__button-expense');

        if (this.filterBtns) {
            this.filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.classList.add('active');

                    const query = e.target.id;
                    if (query === 'interval') {
                        this.isOpenDateIntervalContainer()
                        console.log('interval');
                    } else {
                        this.isCloseDateIntervalContainer();
                        this.getOperations(query)
                    }



                    this.filterBtns.forEach(item => {
                        if (item !== e.target) {
                            item.classList.remove('active');
                        }
                    })
                })
            })
        }

        if (this.createIncomeBtn && this.createExpenseBtn) {
            this.createIncomeBtn.addEventListener('click', () => {
                window.currentType.setType('income');
                window.location.hash = `#/new-operation`
            })

            this.createExpenseBtn.addEventListener('click', () => {
                window.currentType.setType('expense');
                window.location.hash = `#/new-operation`
            })
        }

        if (this.popup) {
            this.popup.addEventListener('click', (e) => {
                if (e.target.closest('.popup__btn-cancel')) {
                    this.popup.classList.remove('open');
                }
            })
        }

        this.getOperations()
    }

    renderTable(data) {
        if (this.contentTableBody) this.contentTableBody.innerHTML = '';

        if (data.length && this.contentTableBody) {
            console.log(data);
            data.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach((item, index) => {
                this.contentTableBody.insertAdjacentHTML('beforeend', `
                    <tr data-id="${item.id}">
                        <td class="content__table-body-item">${index + 1}</td>
                        <td class="content__table-body-item" style="color: ${item.type === 'income' ? '#198754' : '#dc3545'};">${item.type === 'income' ? 'доход' : 'расход'}</td>
                        <td class="content__table-body-item">${item.category}</td>
                        <td class="content__table-body-item">${item.amount}$</td>
                        <td class="content__table-body-item">${formatDate(item.date)}</td>
                        <td class="content__table-body-item">${item.comment}</td>
                        <td class="content__table-body-item">
                            <button class="btn-delete"><img src="/images/delete.svg" alt="delete"></button>
                            <button class="btn-edit"><img src="/images/edit.svg" alt="edit"></button>
                        </td>
                    </tr>
                `)
            })

            this.initBtns();
        } else {
            this.contentTableBody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td class="content__table-body-item" colspan="7">За выбранный период нет операций. Выберите другой период</td>
                </tr>
            `)
        }
    }

    initBtns() {
        this.deleteCategoriesBtns = document.querySelectorAll('.btn-delete');
        this.editCategoriesBtns = document.querySelectorAll('.btn-edit');

        this.deleteCategoriesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.popup.classList.add('open');
            })
        })

        this.editCategoriesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.location.hash = `#/edit-operation/1`
            })
        })
    }

    async getOperations(interval = null, dateFrom = null, dateTo = null) {
        let respons
        if (interval && dateFrom && dateTo) {
            respons = await Operation.getOperations(interval, dateFrom, dateTo);
        } else if (interval && !dateFrom && !dateTo) {
            respons = await Operation.getOperations(interval);
        } else {
            respons = await Operation.getOperations();
        }
        this.renderTable(respons.data);
    }

    isOpenDateIntervalContainer() {
        this.dateIntervalContainer.classList.add('open');
    }

    isCloseDateIntervalContainer() {
        this.dateIntervalContainer.classList.remove('open');
    }
}