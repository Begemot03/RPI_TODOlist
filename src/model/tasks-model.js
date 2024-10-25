import { API_URL, Statuses } from '../consts.js';

export default class TasksModel {
	#taskBoard = [];
	#observers = [];

	isLoading = false;

	constructor() {
		this.loadTasks();
	}

	async loadTasks() {
		this.#startLoading();

		const response = await fetch(`${API_URL}/todos`);
		const data = await response.json();

		this.#taskBoard = data;

		this._nofify();

		this.#stopLoading();
	}

	getTasks() {
		return this.#taskBoard;
	}

	getTaskById(id) {
		return this.#taskBoard.find((task) => task.id == id);
	}

	async addTask(name) {
		this.#startLoading();

		await fetch(`${API_URL}/todos`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				name,
				status: Statuses.primary,
			}),
		});

		await this.loadTasks();

		this._nofify();

		this.#stopLoading();
	}

	async updateTaskStatus(taskId, newStatus) {
		this.#startLoading();

		await fetch(`${API_URL}/todos/${taskId}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				status: newStatus,
			}),
		});

		await this.loadTasks();

		this._nofify();

		this.#stopLoading();
	}

	isTrashEmpty() {
		return (
			this.#taskBoard.filter((task) => task.status == 'danger').length == 0
		);
	}

	async clearTrash() {
		this.#startLoading();

		const taskInTrash = this.#taskBoard.filter(
			(task) => task.status == Statuses.danger
		);

		await Promise.all(
			taskInTrash.map((task) =>
				fetch(`${API_URL}/todos/${task.id}`, {
					method: 'delete',
				})
			)
		);

		await this.loadTasks();

		this._nofify();

		this.#stopLoading();
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

	#loader = document.querySelector(".loading");

	#startLoading() {
		this.isLoading = true;
		this.#loader.classList.remove("hidden");
	}

	#stopLoading() {
		this.isLoading = false;
		this.#loader.classList.add("hidden");
	}
}
