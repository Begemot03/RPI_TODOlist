import { createElement, render } from './render.js';

/*
	Жизненный цикл компонента
	1. Инициализация constructor
	2. Монтирование (один раз при соединению к контейнеру) onMount
	3. Обновление (каждый раз при обновлении свойств) onUpdate
	4. Открепление (контейнер удаляет компонент) onUnmount

*/

export default class BaseComponent {
	element = null;
	container = null;
	rootElement = null;
	rootSelector = '.root';

	constructor() {
		if (new.target === BaseComponent) {
			throw new Error("Can't instantinate BaseComponent, only concrete one");
		}
	}

	getTemplate() {
		throw new Error('Abstract method not implemented: get template');
	}

	onMount() {}

	onUpdate() {}

	onUnmount() {}

	render() {
		render(this, this.container);
	}

	root() {}

	getElement() {
		if (!this.element) {
			this.element = createElement(this.getTemplate());
			this.onMount();
		}

		return this.element;
	}

	remove() {
		this.onMount();
		this.element.remove();
	}

	root() {
		if (!this.element) return null;

		if (!this.rootElement) {
			this.rootElement = this.element.querySelector(this.rootSelector);
		}

		return this.rootElement;
	}
}
