import BaseComponent from '../framework/base-component.js';

function createTaskBoardComponentTemplate() {
	return `
        <section>
            <div class="container task-board">
            </div>
        </section>
        `;
}

export default class TaskBoardComponent extends BaseComponent {
    constructor(container) {
        super();
        this.container = container;
        this.rootSelector = ".task-board";
        this.render();
    }
    
	getTemplate() {
        return createTaskBoardComponentTemplate();
	}
}
