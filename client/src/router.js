import { Auth } from './services/auth.js';

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
                load: () => { }
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
                route: '#/categories',
                template: 'pages/categories.html',
                load: () => {
                    new Categories();
                }
            },
            {
                route: '#/add-edit-type',
                template: 'pages/addEditType.html',
                load: () => {
                    new AddEditType();
                }
            },
            {
                route: '#/add-edit-category',
                template: 'pages/addEditCateg.html',
                load: () => {
                    new AddEditCateg();
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

    openRoute() {
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
            this.fetchApp(this.routes.find(item => item.route === '#/'));
            this.fetchPages(newRoute);
            newRoute.load();
        } else {
            window.location.hash = '#/login';
        }
    }

    authPages() {

    }

    fetchApp(route) {
        fetch(route.template).then(async (res) => this.appElement.innerHTML = await res.text())
    }

    fetchPages(route) {
        this.contentElement = document.getElementById('content');
        fetch(route.template).then(async (res) => this.contentElement.innerHTML = await res.text())
    }


}