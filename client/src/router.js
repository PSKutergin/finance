import { Auth } from './services/auth.js';
import { Form } from './components/form.js';
import { Sidebar } from './components/sidebar.js';
import { Main } from './components/main.js';
import { Balance } from './components/balance.js';
import { Categories } from './components/categories.js';
import { AddEditType } from './components/addEditType.js';
import { AddEditCateg } from './components/addEditCateg.js';

export class Router {
    appElement = null;
    contentElement = null;
    titleElement = null;

    constructor() {
        this.appElement = document.getElementById('app');
        this.titleElement = document.getElementById('page-title');

        this.routes = [
            {
                route: '#/',
                template: 'pages/layout.html',
                load: () => {
                    new Sidebar(window.location.hash);
                }
            },
            {
                route: '#/signup',
                template: 'pages/signup.html',
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: '#/login',
                template: 'pages/login.html',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/main',
                template: 'pages/main.html',
                load: () => {
                    new Main();
                }
            },
            {
                route: '#/categories-income',
                template: 'pages/categories-income.html',
                load: () => {
                    new Categories();
                }
            },
            {
                route: '#/categories-expense',
                template: 'pages/categories-expense.html',
                load: () => {
                    new Categories();
                }
            },
            {
                route: '#/new-type',
                template: 'pages/addEditType.html',
                load: () => {
                    new AddEditType('new');
                }
            },
            {
                route: '#/edit-type',
                template: 'pages/addEditType.html',
                load: () => {
                    new AddEditType('edit');
                }
            },
            {
                route: '#/new-categories',
                template: 'pages/addEditCateg.html',
                load: () => {
                    new AddEditCateg('new');
                }
            },
            {
                route: '#/edit-categories',
                template: 'pages/addEditCateg.html',
                load: () => {
                    new AddEditCateg('edit');
                }
            },
            {
                route: '#/balance',
                template: 'pages/balance.html',
                load: () => {
                    new Balance();
                }
            },
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];

        if (urlRoute === '#/logout') {
            Auth.logout();
            window.location.hash = '#/login';
            return;
        }

        const newRoute = this.routes.find(item => item.route === urlRoute);
        const userInfo = Auth.getUserInfo();

        if (!newRoute || urlRoute === '#/') {
            window.location.hash = '#/login';
            return;
        };

        if (urlRoute === '#/signup' || urlRoute === '#/login') {
            this.fetchApp(newRoute)
            return;
        }

        if (userInfo) {
            this.fetchApp(this.routes.find(item => item.route === '#/'), newRoute);
            this.fetchPages(newRoute);
        } else {
            window.location.hash = '#/login';
        }
    }

    fetchApp(route, internalRoute = null) {
        fetch(route.template).then(async (res) => {
            this.appElement.innerHTML = await res.text()
            route.load();
            if (internalRoute) {
                this.fetchPages(internalRoute);
            }
        })
    }

    fetchPages(route) {
        this.contentElement = document.getElementById('content');
        if (!this.contentElement) {
            return;
        }
        fetch(route.template).then(async (res) => {
            this.contentElement.innerHTML = await res.text()
            route.load();
        })
    }


}