import BaseComponent from "../framework/base-component.js";
import TaskListComponent from "./task-list-component.js";

function createTaskBoardComponentTemplate() {
    return (
        `
        <section>
            <div class="container task-board">
            </div>
        </section>
        `
    );
}

export default class TaskBoardComponent extends BaseComponent {
    getTemplate(args) {
        return createTaskBoardComponentTemplate(args);
    }
}