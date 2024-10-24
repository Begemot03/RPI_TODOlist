import BaseComponent from '../framework/base-component.js';

function createHeaderComponent() {
	return `<header class="header bg-primary">
            <div class="container">
                <h1 class="logo">Список задач</h1>
            </div>
        </header>`;
}

export default class HeaderComponent extends BaseComponent {
	constructor(container) {
		super();
		this.container = container;
		this.render();
	}

	getTemplate() {
		return createHeaderComponent();
	}
}
