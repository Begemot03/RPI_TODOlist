import BaseComponent from '../framework/base-component.js';

function createResetBtnComponentTemplate() {
	return `
        <button class="btn btn-danger">Очистить</button>
    `;
}

export default class ResetBtnComponent extends BaseComponent {
	#handleClick = null;
	#disabled = false;

	constructor(container, onClick, disabled) {
		super();
		this.container = container;
		this.#handleClick = onClick;
		this.#disabled = disabled;
		this.render();
	}

	getTemplate() {
		return createResetBtnComponentTemplate();
	}

	onMount() {
		this.element.addEventListener('click', (e) => {
			e.preventDefault();
			this.#handleClick();
		});

		this.element.disabled = this.#disabled;
	}

	onUpdate(disabled) {
		this.#disabled = disabled;
		this.element.disabled = this.#disabled;
	}
}
