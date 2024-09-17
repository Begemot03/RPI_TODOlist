import BaseComponent from "../framework/base-component.js";

function createFormAddTaskComponentTemplate() {
    return (
        `<section>
            <div class="container">
                <div class="card">
                    <div class="card__title">Новая задача</div>
                    <form class="card__body">
                        <input type="text" placeholder="Название задачи...">
                        <button type="submit" class="btn btn-primary">+ Добавить</button>
                    </form>
                </div>
            </div>
        </section>`
    );
}

export default class FormAddTaskComponent extends BaseComponent {
    getTemplate() {
        return createFormAddTaskComponentTemplate();
    }
}