import BaseComponent from '../framework/base-component.js';

function createTaskMockItemComponent() {
	return `
    <div class="task-list__empty-item">
        <span class="task-list__empty-title">Перетащите карточку</span>
    </div>
    `;
}

export default class TaskMockItemComponent extends BaseComponent {
    constructor(container) {
        super();
        this.container = container;
        this.render();
    }

	getTemplate() {
		return createTaskMockItemComponent();
	}
}