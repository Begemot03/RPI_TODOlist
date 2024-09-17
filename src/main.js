import { render, RenderPosition } from "./framework/render.js"
import FormAddTaskComponent from "./view/form-add-task-component.js.js";
import HeaderComponent from "./view/header-component.js";
import TaskBoardComponent from "./view/task-board-component.js";
import TaskListComponent from "./view/task-list-component.js";

function dragStartHandler(ev) {
    if(ev.target.classList.contains("task-list__item-editable")) return;
    ev.target.classList.add("task-list__item-selected");
}

function dragEndHandler(ev) {
    ev.target.classList.remove("task-list__item-selected");
}

function dragOverHandler(ev) {
    ev.preventDefault();

    const activeElement = document.querySelector(".task-list__item-selected");
    const currentElement = ev.target;

    const isMoveable = activeElement != currentElement && currentElement.classList.contains("task-list__body");

    if(!isMoveable) return;

    currentElement.appendChild(activeElement);  
}


function saveContent(task) {
    return (ev) => {
        const content = task.querySelector(".task-list__item-input").value;

        task.querySelector(`.task-list__item-title`).textContent = content;

        completeEditTask(task);
    }
}

function editTask(task) {
    task.draggable = false;
    task.classList.add("task-list__item-editable");
    task.querySelector(".task-list__item-input").value = task.querySelector(".task-list__item-title").textContent;
    task.querySelector(".task-list__item-title").classList.add("hidden");
    task.querySelector(".task-list__item-input").classList.remove("hidden");
    task.querySelector(".task-list__item-btn").classList.remove("hidden");
}

function completeEditTask(task) {
    task.draggable = true;
    task.classList.remove("task-list__item-editable");
    task.querySelector(".task-list__item-title").classList.remove("hidden");
    task.querySelector(".task-list__item-input").classList.add("hidden");
    task.querySelector(".task-list__item-btn").classList.add("hidden");

    if(task.querySelector(".task-list__item-title").textContent == "") {
        task.remove();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector(".app");

    render(new HeaderComponent(), app, RenderPosition.BEFOREEND);
    render(new FormAddTaskComponent(), app, RenderPosition.BEFOREEND);
    render(new TaskBoardComponent(), app, RenderPosition.BEFOREEND, [
        {
            name: "List1",
            tasks: [
                { name: "Task1", },
                { name: "Task2", },
                { name: "Task3", },
            ]
        }, {
            name: "List2",
            tasks: [
                { name: "Task1", },
                { name: "Task2", },
                { name: "Task3", },
            ]
        }, {
            name: "List3",
            tasks: [
                { name: "Task1", },
                { name: "Task2", },
                { name: "Task3", },
            ]
        }, {
            name: "List4",
            tasks: [
                { name: "Task1", },
                { name: "Task2", },
                { name: "Task3", },
            ]
        }, {
            name: "List5",
            tasks: [
                { name: "Task1", },
                { name: "Task2", },
                { name: "Task3", },
            ]
        }, {
            name: "List6",
            tasks: [
                { name: "Task1", },
                { name: "Task2", },
                { name: "Task3", },
            ]
        },
    ]);
    const taskItems = document.querySelectorAll(".task-list__item");
    const taskLists = document.querySelectorAll(".task-list");

    taskItems.forEach(item => { 
        item.draggable = "true";
        item.addEventListener("dblclick", (ev) => editTask(ev.target));
        item.querySelector(".task-list__item-btn").addEventListener("click", saveContent(item));
    });

    taskLists.forEach(list => {
        list.addEventListener("dragstart", dragStartHandler);
        list.addEventListener("dragend", dragEndHandler);
        list.addEventListener("dragover", dragOverHandler);
    });
});