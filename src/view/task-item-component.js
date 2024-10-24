import BaseComponent from '../framework/base-component.js';

function createTaskItemComponentTemplate(task) {
	return `<div class="task-list__item" data-key="${task.id}">
            <span class="task-list__item-title">${task.name}</span>
            <input class="task-list__item-input hidden" type="text" placeholder="Название задачи...">
            <button class="task-list__item-btn btn-primary btn hidden">OK</button>
        </div>`;
}

export default class TaskItemComponent extends BaseComponent {
	constructor(task, container) {
		super();
		this.task = task;
		this.container = container;
		this.render();
	}

	getTemplate() {
		return createTaskItemComponentTemplate(this.task);
	}

	onUpdate(task) {
		this.task = task;
	}

	onMount() {
		this.element.setAttribute('draggable', true);

		this.element.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text/plain', this.task.id);
		});
	}
}
