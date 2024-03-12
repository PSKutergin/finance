export default class CurrentType {
    constructor() {
        this.type = null;
        this.init();
    }

    init() {
        const link = window.location.hash.split('?')[0];

        if (link.includes('expense')) {
            this.type = 'expense';
        } else {
            this.type = 'income';
        }
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type
    }
}