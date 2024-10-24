import { Statuses } from '../consts.js';
import tasks from '../mock/tasks.js';
import { uuid } from '../utils.js';

export default class TasksModel {
	#taskBoard = tasks;
	#observers = [];

	getTasks() {
		return this.#taskBoard;
	}

	getTaskById(id) {
		return this.#taskBoard.find(task => task.id == id);		
	}

	addTask(title) {
		this.#taskBoard.push({
			id: uuid(),
			name: title,
			status: Statuses.primary,
		});

		this._nofify();
	}

	updateTaskStatus(taskId, newStatus) {
		const task = this.#taskBoard.find((task) => task.id == taskId);

		if (task) {
			task.status = newStatus;
			this._nofify();
		}
	}

	isTrashEmpty() {
		return (
			this.#taskBoard.filter((task) => task.status == 'danger').length == 0
		);
	}

	moveTaskToPosition(taskId, targetTaskId, dropPosition) {
		const task = this.#taskBoard.find((t) => t.id === taskId);
		const targetTaskIndex = this.#taskBoard.findIndex((t) => t.id === targetTaskId);

		if (!task || targetTaskIndex === -1) return;

		this.#taskBoard = this.#taskBoard.filter((t) => t.id !== taskId);

		if (dropPosition === 'before') {
			this.#taskBoard.splice(targetTaskIndex, 0, task);
		} else {
			this.#taskBoard.splice(targetTaskIndex + 1, 0, task);
		}

		this._nofify();
	}

	moveTaskToEnd(taskId) {
		const task = this.#taskBoard.find((t) => t.id === taskId);
		if (!task) return;

		this.#taskBoard = this.#taskBoard.filter((t) => t.id !== taskId);

		this.#taskBoard.push(task);

		this._nofify();
	}

	clearTrash() {
		this.#taskBoard = this.#taskBoard.filter(
			(task) => task.status != Statuses.danger
		);
		this._nofify();
	}

	addObserver(newObserver) {
		this.#observers.push(newObserver);
	}

	removeObserver(removableObserver) {
		this.#observers = this.#observers.filter(
			(observer) => observer !== removableObserver
		);
	}

	_nofify() {
		this.#observers.forEach((observer) => observer());
	}
}
