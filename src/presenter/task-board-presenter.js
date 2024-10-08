import { ListNamesByStatus, Statuses } from "../consts.js";
import { render, RenderPosition } from "../framework/render.js"
import TaskBoardComponent from "../view/task-board-component.js";
import TaskItemComponent from "../view/task-item-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskMockItemComponent from "../view/task-mock-item-component.js";
import ResetBtnComponent from "../view/reset-btn-component.js";


export default class TaskBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #tasksModel = null;

    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(() => this.#renderBoard());
    }

    init() {
        this.#renderBoard();
    }

    #renderTask(task, container) {
        const taskItemComponent = new TaskItemComponent({ name: task.name });
        render(taskItemComponent, container);
    }

    #renderEmptyList(container) {
        const emptyListTaskItem = new TaskMockItemComponent();
        render(emptyListTaskItem, container);
    }

    #renderBoard() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];
        this.#cleanBoard();

        render(this.#taskBoardComponent, this.#boardContainer);        

        Object.values(Statuses).forEach(status => {
            this.#renderBoardList(status, this.#taskBoardComponent.getRoot(".task-board"));
        });
    }

    #renderBoardList(listStatus, container) {
        const taskListComponent = new TaskListComponent({ name: ListNamesByStatus[listStatus], status: listStatus });
        render(taskListComponent, container);

        const concreteTasks = this.#boardTasks.filter(task => task.status === listStatus);

        if(concreteTasks.length > 0) {
            concreteTasks.forEach(task => {
                this.#renderTask(task, taskListComponent.getRoot(".task-list__body"));
            });
        } else {
            this.#renderEmptyList(taskListComponent.getRoot(".task-list__body"));
        }

        if(listStatus == Statuses.danger) {
            this.#renderResetBtn(taskListComponent.getRoot(".task-list__body"));
        }
    }

    #renderResetBtn(container) {
        const disabled = this.#tasksModel.getTasks().filter(task => task.status == Statuses.danger) == 0;
        const resetBtn = new ResetBtnComponent({ onClick : () => this.#tasksModel.clearTrash(), disabled });
        render(resetBtn, container);
    }

    #cleanBoard() {
        if(this.#taskBoardComponent.getElement() != null) this.#taskBoardComponent.getRoot(".task-board").innerHTML = "";
    }

    createTask () {
        const taskTitle = document.querySelector(".add-task__input").value.trim();
        if(!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);
        document.querySelector(".add-task__input").value = "";
    }
}