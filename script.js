const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    // Texto de la tarea
    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.textDecoration = task.completed ? "line-through" : "none";
    li.appendChild(span);

    // Botón completar
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "✅" : "⬜";
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
    li.appendChild(completeBtn);

    // Botón editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newText = prompt("Editar tarea:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };
    li.appendChild(editBtn);

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Render inicial
renderTasks();
