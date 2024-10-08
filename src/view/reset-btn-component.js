import BaseComponent from "../framework/base-component.js";

function createResetBtnComponentTemplate() {
    return (`
        <button class="btn btn-danger">Очистить</button>
    `);
}

export default class ResetBtnComponent extends BaseComponent{
    #handleClick = null;
    #disabled = false;

    constructor({ onClick, disabled }) {
        super();
        this.#handleClick = onClick;
        this.#disabled = disabled;
    }

    getTemplate() {
        return createResetBtnComponentTemplate();
    }

    onMount() {
        this.element.addEventListener("click", (e) => {
            e.preventDefault();
            this.#handleClick();
        });

        this.element.disabled = this.#disabled;
    }
}