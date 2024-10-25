import BaseComponent from '../framework/base-component.js';

function createTaskListComponentTemplate(list) {
	return `
        <div class="task-list task-list_${list.status}">
            <div class="task-list__title task-list__title-primary">${list.name}</div>
            <div class="task-list__body"></div>
			<div class="task-list__footer"></div>
        </div>
        `;
}

export default class TaskListComponent extends BaseComponent {
	#onTaskDrop = null;

	constructor(list, container, onTaskDrop) {
		super();
		this.list = list;
		this.container = container;
		this.rootSelector = '.task-list__body';
		this.#onTaskDrop = onTaskDrop;
		this.render();
	}

	getTemplate() {
		return createTaskListComponentTemplate(this.list);
	}

	onMount() {
		this.element.addEventListener('dragover', (e) => {
			e.preventDefault();
		});
		
		this.element.addEventListener('drop', (e) => {
			e.preventDefault();
			const taskId = e.dataTransfer.getData('text/plain');

			this.#onTaskDrop(taskId, this.list.status);
		});
	}
}
