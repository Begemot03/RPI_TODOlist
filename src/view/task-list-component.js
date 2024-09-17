import BaseComponent from "../framework/base-component.js";
import TaskItemComponent from "./task-item-component.js";

function createTaskListComponentTemplate(list) {
    console.log()
    const tasksTemplate = list.tasks.map(task => new TaskItemComponent().getTemplate(task)).join("");

    return (
        `
        <div class="task-list task-list_primary">
            <div class="task-list__title task-list__title-primary">${list.name}</div>
            <div class="task-list__body">
                ${tasksTemplate}
            </div>
        </div>
        `
    );

    
}

export default class TaskListComponent extends BaseComponent {
    getTemplate(args) {
        return createTaskListComponentTemplate(args);
    }
}