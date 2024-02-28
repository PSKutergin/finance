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
        this.init();
    }

    init() {
        this.currentType = window.currentType.getType();
        this.contentTitle = document.querySelector('.content__title');
        this.contentBtn = document.querySelector('.content__button');
        this.contentBtnCnl = document.querySelector('.content__button-cancel');
        this.contentForm = document.querySelector('.content__form');

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
            }

            this.contentTitle.textContent = this.title;
            this.contentBtn.textContent = this.textBtn;
        }

        if (this.contentBtnCnl && this.contentBtn) {
            this.initButtons();
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

    async getOperationFromApi() {
        const res = await Operation.getOperation(this.idOperation)
        const operationData = res.data
        Array(...this.contentForm.elements).forEach((elem) => {
            for (const item in operationData) {
                if (elem.name === item) {
                    elem.value = operationData[item]
                }
            }
        })
    }

    async editOperation() {
        const operationData = {};
        Array(...this.contentForm.elements).forEach((elem) => {
            operationData[elem.name] = elem.value;
        })
        console.log(operationData);
        // try {
        //     await Operation.editOperation(this.idOperation, operationData);
        //     window.location.hash = `#/balance`;
        // } catch (error) {
        //     console.log(error);
        // }
    }
}