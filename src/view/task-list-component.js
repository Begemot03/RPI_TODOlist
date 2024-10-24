import BaseComponent from '../framework/base-component.js';

function createTaskListComponentTemplate(name, status) {
	return `
        <div class="task-list task-list_${status}">
            <div class="task-list__title task-list__title-primary">${name}</div>
            <div class="task-list__body">
            </div>
        </div>
        `;
}

export default class TaskListComponent extends BaseComponent {
	#onTaskDrop = null;

	constructor({ name, status, onTaskDrop }) {
		super();
		this.name = name;
		this.status = status;
		this.#onTaskDrop = onTaskDrop;
	}

	getTemplate() {
		return createTaskListComponentTemplate(this.name, this.status);
	}

	onMount() {
		this.element.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		this.element.addEventListener('drop', (e) => {
			e.preventDefault();
			const taskId = e.dataTransfer.getData('text/plain');

			this.#onTaskDrop(taskId, this.status);
		});
	}
}
