// DOM Elements
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const addTaskButton = document.getElementById("add-task-button") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;

// Task Array
interface Task {
  id: number;
  text: string;
  completed: boolean;
}
let tasks: Task[] = [];

// Add Task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
  }
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear existing tasks
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.completed ? "✔️" : "⬜";
    toggleButton.addEventListener("click", () => toggleTask(task.id));

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Delete Task
function deleteTask(taskId: number) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// Toggle Task
function toggleTask(taskId: number) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

