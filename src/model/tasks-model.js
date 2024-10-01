import tasks from "../mock/tasks.js";

export default class TasksModel {
    #taskBoard = tasks;

    getTasks() {
        return this.#taskBoard;
    }
}