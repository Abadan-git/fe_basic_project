import Element from './Element.js';

export default class CreateImage extends Element {
    constructor(src, alt = '', attributes = {}) {
        super('img', attributes);
        this.element.src = src;
        this.element.alt = alt;
    }
}
