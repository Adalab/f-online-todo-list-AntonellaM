'use strict';

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
let taskList = [];
setDate();
getLocalStorage('tasks');

function setLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

function getLocalStorage(name) {
    const savedTasks = JSON.parse(localStorage.getItem(name));
    savedTasks ? taskList = savedTasks : taskList = [];
    savedTasks && taskList.forEach(element => createTask(element.task, element.checked));
}

function createElement(element, classNames, text, parent) {
    const newElement = document.createElement(element);
    classNames && classNames.forEach(className => newElement.classList.add(className));
    const newText = document.createTextNode(text);
    text && newElement.appendChild(newText);
    parent && parent.appendChild(newElement);
    return newElement;
}

function setDate() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('es-ES', options).replace(new RegExp('de ', 'g'), '').replace(',', '');
    const dateArray = currentDate.split(' ');

    createElement('p', ['weekday'], dateArray[0], dateContainerEl);
    createElement('p', ['day'], dateArray[1], dateContainerEl);
    createElement('p', ['month-year'], (dateArray[2] + ', ' + dateArray[3]), dateContainerEl);
}

function toggleClass(element, className) {
    element.classList.toggle(className);
}

function createTask(text, state) {
    taskCounter += 1;

    const taskItemEl = createElement('li', ['task-item']);
    const checkboxEl = createElement('input')
    checkboxEl.type = 'checkbox';
    checkboxEl.id = `task-${taskCounter}`;

    state ? checkboxEl.checked === true : checkboxEl.checked === false;

    const labelEl = createElement('label', ['task__label'], null, taskItemEl);
    labelEl.setAttribute('for', `task-${taskCounter}`);
    taskCheckboxes.push(labelEl);

    const taskTextEl = createElement('h2', ['task__title'], text); 
    taskTextEl.setAttribute('data-id', `task-${taskCounter}`);
    
    taskItemEl.appendChild(checkboxEl);
    taskItemEl.appendChild(taskTextEl);
    taskContainerEl.appendChild(taskItemEl);

    if (checkboxEl.checked) {
        labelEl.classList.add('--active');
        taskTextEl.classList.add('--crossed');
    }

    toggleClass(addTaskModalEl, '--active');
    toggleClass(transparentEl, '--active');

    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', handleCheckbox)
    });

    const taskObject = {'task': taskTextEl.innerHTML, 'checked': checkboxEl.checked};

    return taskObject;
}

function handlerAddButton() {
    toggleClass(addTaskModalEl, '--active');
    toggleClass(transparentEl, '--active');
    addTaskContentEl.focus();
}

addingButtonEl.addEventListener('click', handlerAddButton);

function handleAddTaskButton() {
    const newTask = taskInputEl.value;
    taskInputEl.value = '';
    const taskObject = createTask(newTask, false);
    taskList.push(taskObject);
    setLocalStorage('tasks', taskList);
}

addTaskButtonEl.addEventListener('click', handleAddTaskButton);

function handleCheckbox(event) {
    const taskIdentifier = event.currentTarget.getAttribute('for');
    const taskChecked = document.getElementById(taskIdentifier).checked ? false : true;
    const taskSelected = document.querySelector(`h2[data-id=${taskIdentifier}]`).innerHTML;
    const taskInList = taskList.findIndex(task => task.task.includes(taskSelected));
    console.log(taskInList);
    if (taskInList !== -1) {
        taskList[taskInList].checked = taskChecked;
        setLocalStorage('tasks', taskList);
    }
    toggleClass(document.querySelector(`h2[data-id=${taskIdentifier}]`), '--crossed');
    toggleClass(document.querySelector(`label[for=${taskIdentifier}]`), '--active');
}
