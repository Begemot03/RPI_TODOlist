import BaseComponent from "../framework/base-component.js";

function createTaskListComponentTemplate(name, status) {
    return (
        `
        <div class="task-list task-list_${status}">
            <div class="task-list__title task-list__title-primary">${name}</div>
            <div class="task-list__body">
            </div>
        </div>
        `
    );

    
}

export default class TaskListComponent extends BaseComponent {
    constructor({ name, status }) {
        super();
        this.name = name;
        this.status = status;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.name, this.status);
    }
}