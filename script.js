const btnEl = document.getElementById("task-btn");
const inputEl = document.getElementById("task");
const listEl = document.getElementById("list-ele");
const clearEl = document.getElementById("clear-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

render(tasks);

clearEl.addEventListener("dblclick",()=>{
    localStorage.clear();
    tasks = [];
    render(tasks);
})

btnEl.addEventListener("click", function () {
    const task = inputEl.value.trim();
    if(!task){
        alert("Please enter a valid task");
        return;
    }
    tasks.push(task);
    inputEl.value = "";
    saveToLocalStorage();
    render(tasks);
});

function render(tasksArray) {
    listEl.innerHTML = ""; 
    tasksArray.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `${task} <button class="btn btn-danger btn-sm" ondblclick="deleteTask(${index})">Delete</button>`;
        listEl.appendChild(li);
    });
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
    tasks.splice(index, 1); 
    saveToLocalStorage();
    render(tasks);
}
