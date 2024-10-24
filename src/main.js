import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';
import TaskBoardPresenter from './presenter/task-board-presenter.js';
import FormAddTaskComponent from './view/form-add-task-component.js.js';
import HeaderComponent from './view/header-component.js';
import TaskBoardComponent from './view/task-board-component.js';

function completeEditTask(task) {
	task.draggable = true;
	task.classList.remove('task-list__item-editable');
	task.querySelector('.task-list__item-title').classList.remove('hidden');
	task.querySelector('.task-list__item-input').classList.add('hidden');
	task.querySelector('.task-list__item-btn').classList.add('hidden');

	if (task.querySelector('.task-list__item-title').textContent == '') {
		task.remove();
	}
}

window.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('.app');

	const tasksModel = new TasksModel();
	const taskBoardPresenter = new TaskBoardPresenter({
		boardContainer: app,
		tasksModel,
	});

	render(new HeaderComponent(), app, RenderPosition.BEFOREEND);
	render(
		new FormAddTaskComponent({
			onClick: () => taskBoardPresenter.createTask(),
		}),
		app,
		RenderPosition.BEFOREEND
	);

	const taskBoardContainer = new TaskBoardComponent();
	render(taskBoardContainer, app, RenderPosition.BEFOREEND);

	taskBoardPresenter.init();
});
