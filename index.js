'use strict';

const dateContainerEl = document.querySelector('.main-header__date');
const taskContainerEl = document.querySelector('.task-container');
const addingButtonEl = document.querySelector('.task-adding-section__button');
const taskInputEl = document.querySelector('.add-task-modal__content');
const addTaskModalEl = document.querySelector('.add-task-modal');
const addTaskButtonEl = document.querySelector('.add-task-modal__button');
const taskCheckboxes = [];

dateContainerEl.innerHTML = new Date();
let taskCounter = 0;

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
