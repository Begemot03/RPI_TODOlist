import TasksModel from './model/tasks-model.js';
import TaskBoardPresenter from './presenter/task-board-presenter.js';
import FormAddTaskComponent from './view/form-add-task-component.js.js';
import HeaderComponent from './view/header-component.js';

window.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('.app');
	new HeaderComponent(app);

	const tasksModel = new TasksModel();
	const taskBoardPresenter = new TaskBoardPresenter(tasksModel);

	new FormAddTaskComponent(app, () => taskBoardPresenter.createTask());

	taskBoardPresenter.init(app);
});
