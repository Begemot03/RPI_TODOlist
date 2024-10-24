import BaseComponent from '../framework/base-component.js';

function createFormAddTaskComponentTemplate() {
	return `<section>
            <div class="container">
                <div class="card">
                    <div class="card__title">Новая задача</div>
                    <form class="card__body">
                        <input class="add-task__input" type="text" placeholder="Название задачи...">
                        <button type="submit" class="btn btn-primary">+ Добавить</button>
                    </form>
                </div>
            </div>
        </section>`;
}

export default class FormAddTaskComponent extends BaseComponent {
	#handleClick = null;

	constructor({ onClick }) {
		super();
		this.#handleClick = onClick;
	}

	getTemplate() {
		return createFormAddTaskComponentTemplate();
	}

	onMount() {
		this.element.querySelector('form').addEventListener('submit', (e) => {
			e.preventDefault();
			this.#handleClick();
		});
	}
}
