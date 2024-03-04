export default class CurrentType {
    static type = 'income';

    static setType(type) {
        this.type = type;
    }

    static getType() {
        return this.type
    }
}