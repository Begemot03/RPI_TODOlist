import taskBoard from "../mock/task-board.js";

export default class TasksModel {
    taskBoard = taskBoard;

    getTasks() {
        return this.taskBoard;
    }
}