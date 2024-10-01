import { createElement } from "./render.js";

export default class BaseComponent {
    #element = null;

    constructor()
    {
        if(new.target === BaseComponent)
        {
            throw new Error("Can't instantinate BaseComponent, only concrete one");
        }
    }

    getTemplate() {
        throw new Error("Abstract method not implemented: get template");
    }

    getElement() {
        if(!this.#element) {
            this.#element = createElement(this.getTemplate());
        }

        return this.#element;
    }

    getRoot(rootSelector) {
        return this.#element.querySelector(rootSelector);
    }

    removeElement() {
        this.#element = null;
    }
}