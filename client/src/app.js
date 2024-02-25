import './assets/scss/index.scss';
import { Router } from "./router.js";
import CurrentType from './store/currentType.js';

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this))

        window.currentType = new CurrentType();
    }

    handleRouteChanging() {
        this.router.openRoute();
    }
};

(new App());