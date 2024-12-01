import Element from './Element.js';

export default class CreateOption extends Element {
    constructor(value, text, attributes = {}) {
        super('option', attributes);
        this.element.value = value;
        this.element.text = text;
    }
}