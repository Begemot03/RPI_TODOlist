import { createElement } from './render.js';

export default class BaseComponent {
	element = null;

	constructor() {
		if (new.target === BaseComponent) {
			throw new Error("Can't instantinate BaseComponent, only concrete one");
		}
	}

	getTemplate() {
		throw new Error('Abstract method not implemented: get template');
	}

	onMount() {}

	getElement() {
		if (!this.element) {
			this.element = createElement(this.getTemplate());
			this.onMount();
		}

		return this.element;
	}

	getRoot(rootSelector) {
		return this.element.querySelector(rootSelector);
	}

	removeElement() {
		this.element = null;
	}
}
