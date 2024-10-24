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
		this.rootSelector = ".task-list__body";
		this.#onTaskDrop = onTaskDrop;
		this.render();
	}

	getTemplate() {
		return createTaskListComponentTemplate(this.list);
	}

	onMount() {
		this.element.addEventListener('dragover', (e) => {
			e.preventDefault();
			const target = e.target.closest('.task-list__item');
			if (target) {
				const rect = target.getBoundingClientRect();
				const offset = e.clientY - rect.top;
				target.style.borderTop = offset < rect.height / 2 ? '2px solid blue' : '';
				target.style.borderBottom = offset >= rect.height / 2 ? '2px solid blue' : '';
			}
		});

		this.element.addEventListener('dragleave', (e) => {
			const target = e.target.closest('.task-list__item');
			if (target) {
				target.style.borderTop = '';
				target.style.borderBottom = '';
			}
		});

		this.element.addEventListener('drop', (e) => {
			e.preventDefault();
			const taskId = e.dataTransfer.getData('text/plain');
			const target = e.target.closest('.task-list__item');
			
			if (target) {
				target.style.borderTop = '';
				target.style.borderBottom = '';
				
				const rect = target.getBoundingClientRect();
				const offset = e.clientY - rect.top;
				const dropPosition = offset < rect.height / 2 ? 'before' : 'after';

				this.#onTaskDrop(taskId, this.list.status, target.dataset.key, dropPosition);
			} else {
				this.#onTaskDrop(taskId, this.list.status, null, 'end');
			}
		});
	}
}
