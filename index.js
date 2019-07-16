'use strict';

console.log('hello')

const dateContainerEl = document.querySelector('.card-header__date');
const taskContainerEl = document.querySelector('.task-container');
const addingButtonEl = document.querySelector('.add__button');
const taskInputEl = document.querySelector('.add-task-modal__content');
const addTaskModalEl = document.querySelector('.add-task-modal');
const addTaskContentEl = document.querySelector('.add-task-modal__content');
const addTaskButtonEl = document.querySelector('.add-task-modal__button');
const transparentEl = document.querySelector('.transparent-layer');
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
    taskCounter += 1;

    const taskItemEl = document.createElement('li');
    taskItemEl.classList.add('task-item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.id = `task-${taskCounter}`;

    const labelEl = document.createElement('label');
    labelEl.classList.add('task__label');
    labelEl.setAttribute('for', `task-${taskCounter}`);
    taskItemEl.appendChild(labelEl);
    taskCheckboxes.push(labelEl);


    const taskTextEl = document.createElement('h2');
    taskTextEl.classList.add('task__title');
    taskTextEl.setAttribute('data-id', `task-${taskCounter}`);
    const taskText = document.createTextNode(text);
    taskTextEl.appendChild(taskText);

    taskItemEl.appendChild(checkboxEl);
    taskItemEl.appendChild(taskTextEl);
    taskContainerEl.appendChild(taskItemEl);

    toggleClass(addTaskModalEl, '--active');
    toggleClass(transparentEl, '--active');

    taskCheckboxes.forEach(checkbox => {
        console.log(checkbox);
        checkbox.addEventListener('click', handleCheckbox)
    });
}

function handlerAddButton() {
    toggleClass(addTaskModalEl, '--active');
    toggleClass(transparentEl, '--active');
    addTaskContentEl.focus();
}

addingButtonEl.addEventListener('click', handlerAddButton);

function handleAddTaskButton() {
    const newTask = taskInputEl.value;
    createTask(newTask);
    taskInputEl.value = '';
}

addTaskButtonEl.addEventListener('click', handleAddTaskButton);

function handleCheckbox(event) {
    const taskIdentifier = event.currentTarget.getAttribute('for');
    document.getElementById(taskIdentifier).checked ? false : true;
    toggleClass(document.querySelector(`h2[data-id=${taskIdentifier}]`), '--crossed');
    toggleClass(document.querySelector(`label[for=${taskIdentifier}]`), '--active');
}
