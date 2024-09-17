import BaseComponent from "../framework/base-component.js";
import TaskListComponent from "./task-list-component.js";

function createTaskBoardComponentTemplate(lists) {
    const listsTemplate = lists.map(list => new TaskListComponent().getTemplate(list)).join("");
    return (
        `
        <section>
            <div class="container task-board">
                ${listsTemplate}
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