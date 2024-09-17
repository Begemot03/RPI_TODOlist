import BaseComponent from "../framework/base-component.js";

function createTaskItemComponentTemplate(task) {
    console.log(task)
    return(
        `<div class="task-list__item">
            <span class="task-list__item-title">${task.name}</span>
            <input class="task-list__item-input hidden" type="text" placeholder="Название задачи...">
            <button class="task-list__item-btn btn-primary btn hidden">OK</button>
        </div>`
    );
}

export default class TaskItemComponent extends BaseComponent {
    getTemplate(args) {
        return createTaskItemComponentTemplate(args);
    }
}