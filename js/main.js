const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task))
}

checkEmptyList()
function addTask (event) {

    event.preventDefault()

    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    tasks.push(newTask)

    saveToLocalStorage()

    renderTask(newTask)

    taskInput.value = ''
    taskInput.focus()
    checkEmptyList()
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return

    const parentNode = event.target.closest('.list-group-item')
    parentNode.remove()

    const id = Number(parentNode.id)

    // const index = tasks.findIndex((task) => task.id === id)
    // tasks.splice(index, 1)

    tasks = tasks.filter((task) => task.id !== id)
    checkEmptyList()

    saveToLocalStorage()
}

function doneTask (event) {
    if (event.target.dataset.action !== 'done') return

    const parentNode = event.target.closest('.list-group-item')
    const taskTitle = parentNode.querySelector('.task-title')

    const id = Number(parentNode.id)
    const task = tasks.find((task) => task.id === id)
    task.done = !task.done

    taskTitle.classList.toggle('task-title--done')

    saveToLocalStorage()
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
    \t\t\t\t<li id="emptyList" class="list-group-item empty-list">
    \t\t\t\t\t<div class="empty-list__title">NO дел NO проблемЪ</div>
    \t\t\t\t\t<img src="./img/Trollface.svg" alt="Empty" width="120" class="mt-3">
    \t\t\t\t</li>`

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')

        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const addClass = task.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML = `
\t\t\t\t<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
\t\t\t\t\t<span class="${addClass}">${task.text}</span>
\t\t\t\t\t<div class="task-item__buttons">
\t\t\t\t\t\t<button type="button" data-action="done" class="btn-action">
\t\t\t\t\t\t\t<img src="./img/Meme-me-gusta-mas.svg" alt="Done" width="100" height="100">
\t\t\t\t\t\t</button>
\t\t\t\t\t\t<button type="button" data-action="delete" class="btn-action">
\t\t\t\t\t\t\t<img src="./img/Meme-me-gusta.svg" alt="Done" width="100" height="100">
\t\t\t\t\t\t</button>
\t\t\t\t\t</div>
\t\t\t\t</li>
`

    tasksList.insertAdjacentHTML("beforeend", taskHTML)
}




