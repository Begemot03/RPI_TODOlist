import { ListNamesByStatus, Statuses } from '../consts.js';
import TaskBoardComponent from '../view/task-board-component.js';
import TaskItemComponent from '../view/task-item-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskMockItemComponent from '../view/task-mock-item-component.js';
import ResetBtnComponent from '../view/reset-btn-component.js';

export default class TaskBoardPresenter {
	#taskBoardComponent = null;
	#tasksModel = null;
	#boardTasks = [];
	#tasksComponents = new Map();
	#listsComponents = new Map();
	#mockTaskListComponents = new Map();
	#resetBtn = null;

	constructor(tasksModel) {
		this.#tasksModel = tasksModel;
		this.#tasksModel.addObserver(() => this.#onUpdate());
	}

	init(appContainer) {
		this.#taskBoardComponent = new TaskBoardComponent(appContainer);

		this.#createLists();
		this.#createResetBtn();
		this.#onUpdate();
	}

	#createLists() {
		Object.values(Statuses).forEach((status) => {
			const list = new TaskListComponent(
				{
					name: ListNamesByStatus[status],
					status,
				},
				this.#taskBoardComponent.root(),
				this.#handleTaskDrop.bind(this)
			);

			this.#listsComponents.set(status, list);
		});
	}

	#onUpdate() {
		const changes = this.#differences(
			this.#boardTasks,
			this.#tasksModel.getTasks()
		);

		if (!changes.hasChanges) return;

		this.#updateResetBtn();
		this.#handleEmptyAndFilledLists(changes);
		this.#removeTasks(changes.removed);
		this.#addTasks(changes.added);

		this.#boardTasks = JSON.parse(JSON.stringify(this.#tasksModel.getTasks()));
	}

	#handleEmptyAndFilledLists(changes) {
		changes.emptyListsStatus.forEach((status) => {
			if (!this.#mockTaskListComponents.has(status)) {
				const emptyListTaskItem = new TaskMockItemComponent(
					this.#listsComponents.get(status).root()
				);
				this.#mockTaskListComponents.set(status, emptyListTaskItem);
			}
		});

		changes.fillListsStatus.forEach((status) => {
			if (this.#mockTaskListComponents.has(status)) {
				const mock = this.#mockTaskListComponents.get(status);
				mock.remove();
				this.#mockTaskListComponents.delete(status);
			}
		});
	}

	#removeTasks(removedTasks) {
		removedTasks.forEach((task) => {
			const taskComponent = this.#tasksComponents.get(task.id);
			if (taskComponent) {
				taskComponent.remove();
				this.#tasksComponents.delete(task.id);
			}
		});
	}

	#addTasks(addedTasks) {
		addedTasks.forEach((task) => {
			const taskComponent = new TaskItemComponent(
				task,
				this.#listsComponents.get(task.status).root()
			);
			this.#tasksComponents.set(task.id, taskComponent);
		});
	}

	#updateResetBtn() {
		this.#resetBtn.onUpdate(this.#tasksModel.isTrashEmpty());
	}

	#createResetBtn() {
		const disabled = this.#tasksModel.isTrashEmpty();

		const resetBtn = new ResetBtnComponent(
			this.#listsComponents
				.get('danger')
				.element.querySelector('.task-list__footer'),
			() => this.#tasksModel.clearTrash(),
			disabled
		);

		this.#resetBtn = resetBtn;
	}

	#handleTaskDrop(taskId, newStatus, targetTaskId, dropPosition) {
		console.log(taskId, targetTaskId, dropPosition)
		const task = this.#tasksModel.getTaskById(taskId);

		if (task.status !== newStatus) {
			this.#tasksModel.updateTaskStatus(taskId, newStatus);
		}

		if (targetTaskId) {
			this.#tasksModel.moveTaskToPosition(taskId, targetTaskId, dropPosition);
		} else if (dropPosition === 'end') {
			this.#tasksModel.moveTaskToEnd(taskId);
		}
	}

	#differences(oldTasks, newTasks) {
		const changes = {
			added: [],
			removed: [],
			emptyListsStatus: [],
			fillListsStatus: [],
			hasChanges: false,
		};

		const oldTasksMap = new Map(oldTasks.map((task) => [task.id, task]));
		const newTasksMap = new Map(newTasks.map((task) => [task.id, task]));

		Object.values(Statuses).forEach((status) => {
			if (newTasks.filter((task) => task.status == status).length == 0) {
				changes.emptyListsStatus.push(status);
			} else {
				changes.fillListsStatus.push(status);
			}
		});

		oldTasks.forEach((task) => {
			if (!newTasksMap.has(task.id)) {
				changes.removed.push(task);
			}
		});

		newTasks.forEach((newTask) => {
			const oldTask = oldTasksMap.get(newTask.id);
			if (!oldTask) {
				changes.added.push(newTask);
			} else if (JSON.stringify(oldTask) != JSON.stringify(newTask)) {
				changes.added.push(newTask);
				changes.removed.push(newTask);
			}
		});

		changes.hasChanges = changes.added.length > 0 || changes.removed.length > 0;

		return changes;
	}

	createTask() {
		const taskTitle = document.querySelector('.add-task__input').value.trim();

		if (!taskTitle) return;

		this.#tasksModel.addTask(taskTitle);
		document.querySelector('.add-task__input').value = '';
	}
}
