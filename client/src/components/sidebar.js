// import CurrentType from "../store/currentType";
import User from "../store/user";
import { Balance } from '../services/balance'

export class Sidebar {
    constructor(page) {
        this.page = page.split('#/')[1];
        this.init();
    }

    async init() {
        this.layout = document.querySelector('.layout');
        this.navList = document.querySelector('.sidebar__list');
        this.navSubList = document.querySelector('.sidebar__sublist');
        this.navItems = document.querySelectorAll('.sidebar__item');
        this.navItemsSub = document.querySelectorAll('.sidebar__sublist-item');
        this.categoriesItem = document.querySelector('.sidebar__item--categories');
        this.balanceElem = document.getElementById('balance-value')
        this.btnLogOut = document.querySelector('.sidebar__user-logout');

        this.userName = document.getElementById('userName');
        this.userName.textContent = User.getFullName();

        const currentType = window.currentType.getType();

        this.navItemsSub.forEach(item => {
            if (item.dataset.hash === this.page) item.classList.add('active');
            else item.classList.remove('active');

            this.categoriesItem.setAttribute('data-hash', `categories-${currentType}`);
        })

        this.navItemsSub.forEach(item => {
            if (item.dataset.hash.split('-')[1] === currentType) item.classList.add('active');
            else item.classList.remove('active');
        })

        this.navItems.forEach(item => {
            if (item.dataset.hash === this.page) item.classList.add('active');
            else item.classList.remove('active');
        });

        if (this.page.includes('categories') || this.page.includes('operation')) {
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
                window.currentType.setType(link.dataset.hash.split('-')[1]);
                window.location.hash = `#/${link.dataset.hash}`
            }
        })

        this.layout.addEventListener('click', (e) => {
            if (e.target.closest('.sidebar__user')) {
                this.btnLogOut.classList.toggle('hidden');
            }

            if (e.target.closest('.sidebar__user-logout')) {
                User.logout();
                window.location.hash = '#/login';
            }
        })

        this.getBalanceFromApi();
    }

    async getBalanceFromApi() {
        try {
            const res = await Balance.getBalance()

            this.balanceElem.textContent = `${res.data.balance}$`
        } catch (error) {
            console.log(error);
        }
    }
}