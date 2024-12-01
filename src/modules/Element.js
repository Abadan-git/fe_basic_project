export default class Element {
    constructor(tagName, attributes = {}) {
        this.element = document.createElement(tagName);
        this.setAttributes(attributes);
    }

    setAttributes(attributes) {
        for (let key in attributes) {
            if (key in this.element) {
                this.element[key] = attributes[key];
            } else {
                this.element.setAttribute(key, attributes[key]);
            }
        }
    }

    appendTo(parent) {
        parent.appendChild(this.element);
    }

    getElement() {
        return this.element;
    }
}
