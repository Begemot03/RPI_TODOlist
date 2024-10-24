import BaseComponent from './base-component.js';

const RenderPosition = {
	BEFOREBEGIN: 'beforebegin',
	AFTERBEGIN: 'afterbegin',
	BEFOREEND: 'beforeend',
	AFTEREND: 'afterend',
};

function createElement(template) {
	const newElement = document.createElement('div');
	newElement.innerHTML = template;

	return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
	if (!(component instanceof BaseComponent)) {
		throw new Error("Can't render only component");
	}

	if (container == null) {
		throw new Error('Container is null');
	}

	container.insertAdjacentElement(place, component.getElement());
}

export { RenderPosition, createElement, render };
