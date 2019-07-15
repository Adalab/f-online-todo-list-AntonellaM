'use strict';

const dateContainerEl = document.querySelector('.main-header__date');
const taskContainerEl = document.querySelector('.task-container');
const addingButtonEl = document.querySelector('.task-adding-section__button');
const taskInputEl = document.querySelector('.add-task-modal__content');
const addTaskModalEl = document.querySelector('.add-task-modal');
const addTaskButtonEl = document.querySelector('.add-task-modal__button');

dateContainerEl.innerHTML = new Date();
let taskCounter = 0;

function createTask(text) {
    const taskItemEl = document.createElement('li');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.id = taskCounter + 1;

    const taskTextEl = document.createElement('h2');
    const taskText = document.createTextNode(text);
    taskTextEl.appendChild(taskText);

    taskItemEl.appendChild(checkboxEl);
    taskItemEl.appendChild(taskTextEl);
    taskContainerEl.appendChild(taskItemEl);

    addTaskModalEl.classList.remove('--active');

}

function handlerAddButton() {
    addTaskModalEl.classList.add('--active');
}

addingButtonEl.addEventListener('click', handlerAddButton);

function handleAddTaskButton() {
    const newTask = taskInputEl.value;
    createTask(newTask);
    taskInputEl.value = '';
}

addTaskButtonEl.addEventListener('click', handleAddTaskButton);