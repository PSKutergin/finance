export class CurrentType {
    constructor() {
        this.type = null;
    }

    static setType(type) {
        this.type = type;
    }

    static getType() {
        return this.type
    }
}