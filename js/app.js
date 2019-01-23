import {TaskList, Task} from './lib.js';

const formEl = document.querySelector('#task-form');
const nameEl = document.querySelector('#task-name');
const listEl = document.querySelector('#task-list');

const taskList = new TaskList();

formEl.addEventListener('submit', function (evt) {
    evt.preventDefault(); // просим браузер не делать  по умолчанию, по нажатию на кнопку стр не обновляется
    const name = nameEl.value;
    //TODO: валидация
    const task = new Task(name);
    taskList.add(task);
    nameEl.value = ''; //очистка формы

    //создали эл-т
    const liEl = document.createElement('li');
    //подставили textContent
    liEl.textContent = task.name;
    liEl.className = 'list-group-item';

    listEl.appendChild(liEl);

    let innerHTML = `${task.name}`;
    if (liEl.previousElementSibling !== null) {
        innerHTML += `<button class = "btn btn-success btn-sm float-right">Up</button>`
    }
    if (liEl.nextElementSibling !== null) {
        innerHTML += `<button class = "btn btn-success btn-sm float-right">Down</button>`
    }
    innerHTML += `<button class = "btn btn-danger btn-sm float-right">Remove</button>`;
    liEl.innerHTML = innerHTML;


    rebuildTree(listEl, taskList);
});

function rebuildTree(container, list) {
    container.innerHTML = ''; // вырезать всех child
    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item';

        liEl.innerHTML = `
        <span data-id="text">${item.name}</span>   
        <button data-id="up" class = "btn btn-danger btn-sm float-right">&uarr;</button>
        <button data-id="down" class = "btn btn-danger btn-sm float-right">&darr;</button>
        <button data-id="remove" class = "btn btn-danger btn-sm float-right">Remove</button>
        `;

        const textEl = liEl.querySelector('[data-id=text]');
        if (item.done) {
            textEl.classList.add('task-done');
        }
        textEl.addEventListener('click', function (evt) {
            item.done = !item.done;
            rebuildTree(container, list);
        });

        const upEl = liEl.querySelector('[data-id=up]');
        upEl.addEventListener('click', function (evt) {
            taskList.up(item);
            rebuildTree(container, list);
        });

        const downEl = liEl.querySelector('[data-id=down]');
        downEl.addEventListener('click', function (evt) {
            taskList.down(item);
            rebuildTree(container, list);
        });
        // data-<name>="remove" - где data обязательно, <name> можно менять на любое
        const removeEl = liEl.querySelector('[data-id=remove]'); //ищем внутри эл-та
        removeEl.addEventListener('click', function (evt) {
            taskList.remove(item);
            rebuildTree(container, list);
        });


        container.appendChild(liEl);
    }

    // const children = Array.from(container.children);
    if (list.items.length !== 0) {

    const first = container.firstElementChild;
    // classList - работа со списком, add - добавляет класс
    first.querySelector('[data-id=up]').classList.add('invisible');

    const last = container.lastElementChild;
    last.querySelector('[data-id=down]').classList.add('invisible');
}
}
