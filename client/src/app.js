import './assets/scss/index.scss';
import { Router } from "./router.js";
import CurrentType from './store/currentType';
import Categories from './store/categories';

class App {
    constructor() {
        this.init();
    }

    init() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this))

        window.currentType = new CurrentType();
        window.categories = new Categories();
    }

    handleRouteChanging() {
        this.router.openRoute();
    }
};

(new App());