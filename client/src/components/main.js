import pieChart from './charts';

export class Main {
    filterBtns = null
    dateIntervalContainer = null

    constructor() {
        this.init();
    }
    init() {
        this.filterBtns = document.querySelectorAll('.content__nav-item');
        this.dateIntervalContainer = document.getElementById('dateInterval');

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

        pieChart();
    }

    isOpenDateIntervalContainer() {
        this.dateIntervalContainer.classList.add('open');
    }

    isCloseDateIntervalContainer() {
        this.dateIntervalContainer.classList.remove('open');
    }
}