// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display saved tasks
tasks.forEach((task) => renderTask(task));

// Event: Add button clicked
addBtn.addEventListener("click", addTask);

// Event: Press Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();

  renderTask(task);
  taskInput.value = "";
}

// Render a task in the DOM
function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  // Add completed style if applicable
  if (task.completed) li.classList.add("completed");

  // Toggle complete on click
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering li click
    taskList.removeChild(li);
    tasks = tasks.filter((t) => t !== task);
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
