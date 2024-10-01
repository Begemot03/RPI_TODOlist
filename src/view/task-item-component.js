import BaseComponent from "../framework/base-component.js";

function createTaskItemComponentTemplate(name) {
    return(
        `<div class="task-list__item">
            <span class="task-list__item-title">${name}</span>
            <input class="task-list__item-input hidden" type="text" placeholder="Название задачи...">
            <button class="task-list__item-btn btn-primary btn hidden">OK</button>
        </div>`
    );
}

export default class TaskItemComponent extends BaseComponent {
    constructor({ name }) {
        super();
        this.name = name;
    }

    getTemplate() {
        return createTaskItemComponentTemplate(this.name);
    }
}