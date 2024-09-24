const taskBoard =  [
    {
        name: "Может быть сделаю",
        status: "primary",
        tasks: [
            { name: "посажу сына", },
            { name: "выращу дом", },
            { name: "построю дерево", },
        ]
    }, {
        name: "Точно не сделаю",
        status: "danger",
        tasks: [
            { name: "съем говяжьи мозги", },
            { name: "останусь тут", },
            { name: "куплю айфон в кредит", },
        ]
    }, {
        name: "Как я вообще это придумал???",
        status: "success",
        tasks: [
            { name: "пока не придумал 1", },
            { name: "пока не придумал 2", },
            { name: "пока не придумал 3", },
        ]
    },
];


export default taskBoard;