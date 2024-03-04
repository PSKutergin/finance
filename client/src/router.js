import User from './store/user.js';
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
        const newRoute = this.routes.find(item => item.route === urlRoute);
        const token = Auth.getToken(Auth.accessTokenKey);

        if (!newRoute || urlRoute === '#/') {
            window.location.hash = '#/login';
            return;
        };

        if (token && urlRoute === '#/signup') {
            console.log('token', token);
            window.location.hash = '#/main';
            return;
        }

        if (urlRoute === '#/signup' || urlRoute === '#/login') {
            this.fetchApp(newRoute)
            return;
        }

        if (token) {
            this.fetchApp(this.routes.find(item => item.route === '#/'), newRoute);
            this.fetchPages(newRoute);
        } else {
            User.removeUser();
            Auth.removeTokens();
            window.location.hash = '#/login';
        }
    }

    async fetchApp(route, internalRoute = null) {
        const res = await fetch(route.template);
        this.appElement.innerHTML = await res.text()
        await route.load();
        if (internalRoute) {
            this.fetchPages(internalRoute);
        }
    }

    async fetchPages(route) {
        this.contentElement = document.getElementById('content');
        if (!this.contentElement) {
            return;
        }
        const res = await fetch(route.template);
        this.contentElement.innerHTML = await res.text()
        await route.load();
    }


}