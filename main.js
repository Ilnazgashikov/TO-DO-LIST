"use strict";
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const  toDoList = localStorage.getItem("toDoList")
    ? JSON.parse(localStorage.getItem("toDoList"))
    : [];

const render = () => {

    todoCompleted.innerHTML = '';
    todoList.innerHTML = '';

    toDoList.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
        <span class="text-todo">${item.text}</span>
        <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>
        `;
        item.completed ? todoCompleted.append(li) :  todoList.append(li);

        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed;
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
            render();
        })
        li.querySelector('.todo-remove').addEventListener('click', event => {
            event.target.parentNode.parentNode.remove();
            toDoList.splice(toDoList.indexOf(item), 1);
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
            render();
        });

    })
}
render();

todoControl.addEventListener('submit', (event) => {
    console.log("sdfsdfsdfsdfsdf");
    event.preventDefault()
    const newToDo = {
        text: headerInput.value,
        completed: false,
    }
    if (headerInput.value !== '') {
        toDoList.push(newToDo)
        headerInput.value = ''
        localStorage.setItem("toDoList", JSON.stringify(toDoList))
        render();
    }

})