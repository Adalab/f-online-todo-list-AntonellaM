'use strict';

const dateContainerEl = document.querySelector('.card-header__date');
const taskContainerEl = document.querySelector('.task-container');
const addingButtonEl = document.querySelector('.task-adding-section__button');
const taskInputEl = document.querySelector('.add-task-modal__content');
const addTaskModalEl = document.querySelector('.add-task-modal');
const addTaskButtonEl = document.querySelector('.add-task-modal__button');
const taskCheckboxes = [];

let taskCounter = 0;
setDate();

function createElement(element, className, text, parent) {
    const newElement = document.createElement(element);
    newElement.classList.add(className);
    const newText = document.createTextNode(text);
    newElement.appendChild(newText);
    parent.appendChild(newElement);
}

function setDate() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('es-ES', options).replace(new RegExp('de ', 'g'), '').replace(',', '');
    const dateArray = currentDate.split(' ');

    createElement('p', 'weekday', dateArray[0], dateContainerEl);
    createElement('p', 'day', dateArray[1], dateContainerEl);
    createElement('p', 'month-year', (dateArray[2] + ', ' + dateArray[3]), dateContainerEl);
}

function toggleClass(element, className) {
    element.classList.toggle(className);
}

function createTask(text) {
    const taskItemEl = document.createElement('li');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.id = `task-${taskCounter + 1}`;
    taskCheckboxes.push(checkboxEl);

    const taskTextEl = document.createElement('h2');
    taskTextEl.setAttribute('data-id', `task-${taskCounter + 1}`);
    const taskText = document.createTextNode(text);
    taskTextEl.appendChild(taskText);

    taskItemEl.appendChild(checkboxEl);
    taskItemEl.appendChild(taskTextEl);
    taskContainerEl.appendChild(taskItemEl);

    toggleClass(addTaskModalEl, '--active');
    taskCheckboxes.forEach(checkbox => {
        console.log(checkbox);
        checkbox.addEventListener('click', handleCheckbox)
    });
}

function handlerAddButton() {
    toggleClass(addTaskModalEl, '--active');
}

addingButtonEl.addEventListener('click', handlerAddButton);

function handleAddTaskButton() {
    const newTask = taskInputEl.value;
    createTask(newTask);
    taskInputEl.value = '';
}

addTaskButtonEl.addEventListener('click', handleAddTaskButton);

function handleCheckbox(event) {
    const taskIdentifier = event.currentTarget.id;
    document.getElementById(taskIdentifier).checked ? false : true;
    toggleClass(document.querySelector(`h2[data-id=${taskIdentifier}]`), '--crossed');
}
