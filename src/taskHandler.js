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
    toggleTaskModal();
    renderTasks();
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

  // Helper - Creates HTML Elements
  /**
   * Utility function to create and style an element
   * @param {string} tag - The HTML tag to create (e.g., "div", "p", "h3").
   * @param {string} content - The text content of the element (default: empty string).
   * @param {string | string[]} classes - A single class or an array of classes to apply.
   * @param {Object} attributes - An object of attributes to set on the element (e.g., { id: "my-id", "data-index": 1 }).
   * @returns {HTMLElement} The configured HTML element.
   */
  const createElement = (tag, content = "", classes = [], attributes = {}) => {
    const element = document.createElement(tag);
    element.textContent = content;

    // Add classes if provided
    if (typeof classes === "string") {
      element.classList.add(classes);
    } else if (Array.isArray(classes)) {
      element.classList.add(...classes);
    }

    // Add attributes if provided
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }

    return element;
  };

  // Render Tasks
  const renderTasks = () => {
    const taskContainer = document.querySelector(".task-list--container");

    // Clear previous tasks
    taskContainer.innerHTML = "";

    // Loop through allTasksArray and create elements
    allTasksArray.forEach((task, index) => {
      // Create the task container
      const taskElement = createElement("div", "", ["task-item"]);

      // Create individual elements for task properties
      const titleElement = createElement("h3", task.title, "task-title");
      const notesElement = createElement("p", task.notes, "task-notes");
      const dueDateElement = createElement(
        "p",
        `Due: ${task.dueDate}`,
        "task-due-date"
      );
      const priorityElement = createElement(
        "p",
        `Priority: ${task.priority
          .replace("task-priority--input-", "")
          .toUpperCase()}`,
        "task-priority"
      );
      const listElement = createElement("p", `List: ${task.list}`, "task-list");

      // Create the delete button
      const deleteButton = createElement(
        "button",
        "Delete",
        ["delete-task-btn"],
        { "data-index": index }
      );

      // Append all elements to the task container
      taskElement.appendChild(titleElement);
      taskElement.appendChild(notesElement);
      taskElement.appendChild(dueDateElement);
      taskElement.appendChild(priorityElement);
      taskElement.appendChild(listElement);
      taskElement.appendChild(deleteButton);

      // Append the task container to the main task container
      taskContainer.appendChild(taskElement);
    });
  };
};

export default taskHandler;
