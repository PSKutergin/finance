import './assets/scss/index.scss';
import './assets/scss/form.scss';
import './assets/scss/layout.scss';
import './assets/scss/main.scss';
import './assets/scss/categories.scss';
import './assets/scss/addEdit.scss';
import './assets/scss/balance.scss';

import { Main } from './components/main';
import pieChart from './components/charts';
import { Router } from "./router.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this))
    }

    handleRouteChanging() {
        this.router.openRoute();
    }
};

(new App());