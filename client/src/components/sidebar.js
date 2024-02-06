import { CurrentType } from "../store/currentType";

export class Sidebar {
    constructor(page) {
        this.page = page.split('#/')[1];
        this.init();
    }

    init() {
        this.navList = document.querySelector('.sidebar__list');
        this.navSubList = document.querySelector('.sidebar__sublist');
        this.navItems = document.querySelectorAll('.sidebar__item');
        this.navItemsSub = document.querySelectorAll('.sidebar__sublist-item');
        this.categoriesItem = document.querySelector('.sidebar__item--categories');

        const currentType = CurrentType.getType();

        console.log(currentType);

        this.navItemsSub.forEach(item => {
            if (item.dataset.hash === this.page) item.classList.add('active');
            else item.classList.remove('active');

            if (item.classList.contains('active')) {
                this.categoriesItem.setAttribute('data-hash', item.dataset.hash);
            } else {
                this.categoriesItem.setAttribute('data-hash', this.navItemsSub[0].dataset.hash);
            }
        })

        this.navItemsSub.forEach(item => {
            if (item.dataset.hash.split('-')[1] === currentType) item.classList.add('active');
            else item.classList.remove('active');
        })

        this.navItems.forEach(item => {
            if (item.dataset.hash === this.page) item.classList.add('active');
            else item.classList.remove('active');
        });

        if (this.page.includes('categories')) {
            this.categoriesItem.classList.add('active');
            this.navSubList.classList.add('open');
        } else {
            this.navSubList.classList.remove('open');
        }

        this.navList.addEventListener('click', (e) => {
            if (e.target.closest('.sidebar__item')) {
                if (e.target.closest('.sidebar__item--categories')) {
                    e.target.closest('.sidebar__item--categories').classList.add('active');
                    this.navSubList.classList.add('open');
                    const link = e.target.closest('.sidebar__item--categories');
                    window.location.hash = `#/${link.dataset.hash}`
                } else {
                    const link = e.target.closest('.sidebar__item');
                    window.location.hash = `#/${link.dataset.hash}`
                }
            }

            if (e.target.closest('.sidebar__sublist-item')) {
                const link = e.target.closest('.sidebar__sublist-item');
                CurrentType.setType(link.dataset.hash.split('-')[1]);
                window.location.hash = `#/${link.dataset.hash}`
            }
        })
    }
}