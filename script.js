const form = document.getElementById("to-do-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", addTask);

// Load any existing tasks from local storage
loadTasks();

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Please add a task.");
        return;
    }
    const li = document.createElement("li");
    const task = document.createElement("span");
    task.innerHTML = taskInput.value;
    li.appendChild(task);
    const taskControls = document.createElement("div");
    taskControls.classList.add("task-controls");
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click", function(){editTask(task)});
    taskControls.appendChild(editBtn);
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "&#x2713;";
    completeBtn.addEventListener("click", function(){
        task.classList.toggle("completed");
        saveTasks();
    });
    taskControls.appendChild(completeBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#x2715;";
    deleteBtn.addEventListener("click", function(){
        li.remove();
        saveTasks();
    });
    taskControls.appendChild(deleteBtn);
    li.appendChild(taskControls);
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}


function editTask(task){
    let taskText = task.innerHTML;
    task.innerHTML = "";
    let input = document.createElement("input");
    input.value = taskText;
    task.appendChild(input);
    input.focus();
    input.addEventListener("blur", function(){
        task.innerHTML = this.value;
        saveTasks();
    });
}


function completeTask() {
  task.classList.toggle("completed");
  saveTasks();
}

function deleteTask() {
  li.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  for (let task of taskList.children) {
    tasks.push(task.firstChild.innerHTML);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let task of tasks) {
      taskInput.value = task;
      addTask(new Event("submit"));
    }
  }

  
  
