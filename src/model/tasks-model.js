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
		return this.#taskBoard.find((task) => task.id == id);
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
