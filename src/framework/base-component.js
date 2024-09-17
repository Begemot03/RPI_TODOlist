import { createElement } from "./render.js";

export default class BaseComponent {
    getTemplate() {

    }

    getElement(args) {
        if(!this.element) {
            this.element = createElement(this.getTemplate(args));
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}