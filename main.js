let Input = document.getElementById("new-todo");
let addBtn = document.getElementById("add-btn");
let todos = document.querySelector(".todos");

let arrayOfTasks = [];

if (localStorage.getItem("todos")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("todos"));
}

addBtn.addEventListener("click", () => {
  if (Input.value !== "") {
    addTask();
    resetInput();
  }
});

function resetInput() {
  Input.value = "";
  Input.focus();
}

function addTask() {
  let task = {
    id: Date.now(),
    value: Input.value,
  };

  arrayOfTasks.push(task);
  showTasks(arrayOfTasks);
  addToLocalStorage(arrayOfTasks);
}

function showTasks(arrayOfTasks) {
  todos.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let todoContainer = document.createElement("div");
    let currentText = document.createElement("div");
    let currentTodo = document.createElement("input");
    let currentIcons = document.createElement("div");
    let editBtn = document.createElement("i");
    let deleteBtn = document.createElement("i");
    todoContainer.className = "todo";

    currentText.className = "current txt";

    currentTodo.className = "current-todo";
    currentTodo.setAttribute("readonly", "");
    currentTodo.id = task.id;
    currentTodo.value = task.value;

    currentIcons.className = "icons current-icons";

    editBtn.id = "edit-btn";
    editBtn.className = "far fa-edit";

    deleteBtn.id = "delete-btn";
    deleteBtn.className = "far fa-trash-alt";

    todoContainer.append(currentText);
    todoContainer.append(currentIcons);
    currentText.append(currentTodo);
    currentIcons.append(editBtn, deleteBtn);
    todos.append(todoContainer);

    editBtn.addEventListener("click", (e) => {
      let todoId =
        e.currentTarget.parentElement.parentElement.firstChild.firstChild.id;
      editTask(todoId);
    });

    deleteBtn.addEventListener("click", (e) => {
      todoContainer.remove();
      let todoId =
        e.currentTarget.parentElement.parentElement.firstChild.firstChild.id;
      deleteTask(todoId);
    });
    function editTask(todoId) {
      if (currentTodo.hasAttribute("readonly")) {
        currentTodo.removeAttribute("readonly");
        currentTodo.style.cssText = "cursor:unset; color:#eee";
        currentTodo.focus();
        editBtn.className = "far fa-check-square";
      } else {
        currentTodo.setAttribute("readonly", "");
        currentTodo.style.cssText = "color: rgba(#eee, 0.6)";
        editBtn.className = "far fa-edit";
        let updatedTask = "";
        arrayOfTasks.map(function (task) {
          if (task.id == todoId) {
            updatedTask = currentTodo.value;
            task.value = updatedTask;
          }
        });

        addToLocalStorage(arrayOfTasks);
      }
    }
  });
}

function deleteTask(todoId) {
  let newTasks = arrayOfTasks.filter((task) => task.id != todoId);
  addToLocalStorage(newTasks);
  location.reload();
}

function updatedValue(todoId) {
  let updatedTask = "";
  arrayOfTasks.map(function (task) {
    if (task.id == todoId) {
      updatedTask = task.value;
    }
  });

  console.log(updatedTask);
}

function addToLocalStorage(arrayOfTasks) {
  localStorage.setItem("todos", JSON.stringify(arrayOfTasks));
}
function getFromLocalStorage() {
  let data = localStorage.getItem("todos");
  if (data) {
    let tasks = JSON.parse(data);
    showTasks(tasks);
  }
}
getFromLocalStorage();
