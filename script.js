let tasks = loadTasks() || [];


function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    
    if (!title || !dueDate) {
        alert("Title and Due Date are required!");
        return;
    }

    tasks.push({
        id: Date.now(),
        title,
        description,
        dueDate,
        status: "Pending"
    });

    saveTasks();
    clearInputs();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) return;
    
    taskList.innerHTML = tasks.map(task => `
        <div class="task" >
            <strong>${task.title}</strong> - ${task.description} <br>
            <small>Due: ${task.dueDate}</small> <br>
            Status: 
            <select onchange="updateStatus(${task.id}, this.value)">
                <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>Pending</option>
                <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
            </select>
            <button onclick="deleteTask(${task.id})" class="btn btn-danger">Delete</button>
            <hr>
            <br>
        </div>
    `).join('');
}

function updateStatus(id, status) {
    tasks = tasks.map(task => task.id === id ? { ...task, status } : task);
    saveTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
}

function loadTasks() {
    const tasksString = localStorage.getItem("tasks") || "";
    return tasksString.split(";").map(taskString => {
        const [id, title, description, dueDate, status] = taskString.split(",");
        return { id: Number(id), title, description, dueDate, status };
    }).filter(task => task.title); 
}

function saveTasks() {
    const tasksString = tasks.map(task => `${task.id},${task.title},${task.description},${task.dueDate},${task.status}`).join(";");
    localStorage.setItem("tasks", tasksString);
    displayTasks();
}


function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
}

document.addEventListener("DOMContentLoaded", displayTasks);
