import Task from "./task";

const taskHandler = () => {
  // Variables & such
  const addTaskBtn = document.querySelector(".add-task-btn");
  const taskModal = document.querySelector(".task-form--container");
  const taskForm = document.querySelector(".task-form");
  const taskTitleInput = document.querySelector("#task-title");
  const taskNotesInput = document.querySelector("#task-description");
  const taskDueDateInput = document.querySelector("#task-due-date");
  const taskPriorityInput = document.querySelector(
    'input[name="task-priority"]:checked'
  )?.id;
  const taskListSelectInput = document.querySelector("#task-list--select");
  const taskSubmitBtn = document.querySelector("#task-form--submit-btn");

  let allTasksArray = [];

  // Event-Listeners

  //Toogle Task Modal
  addTaskBtn.addEventListener("click", () => {
    toggleTaskModal();
  });

  // Submit Task Form
  taskSubmitBtn.addEventListener("click", () => {
    addTask();
  });

  // Toggle Task creation modal
  const toggleTaskModal = () => {
    if (taskModal.classList.contains("hidden")) {
      taskModal.classList.remove("hidden");
      taskModal.classList.add("flex");
    } else {
      taskModal.classList.add("hidden");
      taskModal.classList.remove("flex");
    }
  };

  // Create Tasks from form inputs
  const addTask = () => {
    const taskTitle = taskTitleInput.value;
    const taskNotes = taskNotesInput.value;
    const taskDueDate = taskDueDateInput.value;
    const taskPriority = taskPriorityInput;
    const taskList = taskListSelectInput.value;

    const newTask = new Task(
      taskTitle,
      taskNotes,
      taskDueDate,
      taskPriority,
      taskList
    );

    allTasksArray.push(newTask);
  };

  // Render Tasks
  const renderTasks = (filter = {}) => {
    const taskContainer = document.querySelector(".task-list--container");
    taskContainer.innerHTML = "";

    // Filter tasks based on criteria
    const filteredTasks = allTasksArray.filter((task) => {
      if (filter.priority && task.priority !== filter.priority) return false;
      if (filter.list && task.list !== filter.list) return false;
      return true;
    });

    filteredTasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-item");

      taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.notes || "No notes provided"}</p>
        <p>Due: ${task.dueDate}</p>
        <p>Priority: ${task.priority
          .replace("task-priority--input-", "")
          .toUpperCase()}</p>
        <p>List: ${task.list}</p>
        <button class="delete-task-btn" data-index="${index}">Delete</button>
      `;

      taskContainer.appendChild(taskElement);
    });
  };
};

export default taskHandler;
