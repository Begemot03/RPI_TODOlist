import { render, RenderPosition } from "../framework/render.js"
import TaskBoardComponent from "../view/task-board-component.js";
import TaskItemComponent from "../view/task-item-component.js";
import TaskListComponent from "../view/task-list-component.js";


export default class TaskBoardPresenter {
    taskBoardComponent = new TaskBoardComponent();
    tasksModel = [];

    constructor({ boardContainer, tasksModel }) {
        this.boardContainer = boardContainer;
        this.tasksModel = tasksModel;
    }

    init() {
        render(this.taskBoardComponent, this.boardContainer, RenderPosition.BEFOREEND);

        this.tasksModel.getTasks().forEach(list => {
            const taskListComponent = new TaskListComponent({ name: list.name, status: list.status });
            render(taskListComponent, this.taskBoardComponent.getElement().querySelector(".task-board"));

            list.tasks.forEach(task => {
                const taskItemComponent = new TaskItemComponent({ name: task.name });
                render(taskItemComponent, taskListComponent.getElement().querySelector(".task-list__body"));
            });
        });
    }
}