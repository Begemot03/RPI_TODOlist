import { Statuses } from "../consts.js";
import { uuid } from "../utils.js";

const tasks = [
    {
        id: uuid(),
        name: "Посадить дерево",
        status: Statuses.primary,
    },
    {
        id: uuid(),
        name: "Построить дом",
        status: Statuses.success,
    },
    {
        id: uuid(),
        name: "Воспитать сына",
        status: Statuses.primary,
    },
    {
        id: uuid(),
        name: "Закончить курсы по программированию",
        status: Statuses.info,
    },
    {
        id: uuid(),
        name: "Перейти на здоровое питание",
        status: Statuses.danger,
    },
];



export default tasks;