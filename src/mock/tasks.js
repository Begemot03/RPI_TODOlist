import { Statuses } from "../consts.js";

const tasks =  [
    {
        id: 1,
        name: "посажу сына",
        status: Statuses.primary,
    },
    {
        id: 2,
        name: "выращу дом",
        status: Statuses.primary,
    },
    {
        id: 3,
        name: "построю дерево",
        status: Statuses.success,
    },
    {
        id: 4,
        name: "перейти дорогу на красный",
        status: Statuses.info,
    },
];


export default tasks;