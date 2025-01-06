import Task from "./task";

const taskHandler = () => {
  // Variables & such
  const addTaskBtn = document.querySelector(".add-task-btn");
  const taskModal = document.querySelector(".task-form--container");
  const taskForm = document.querySelector(".task-form");
  const taskTitleInput = document.querySelector("#task-title");
  const taskNotesInput = document.querySelector("#task-description");
  const taskDueDateInput = document.querySelector("#task-due-date");
  const taskListSelectInput = document.querySelector("#task-list--select");
  const taskSubmitBtn = document.querySelector("#task-form--submit-btn");
  const currentTaskList = document.querySelector(".current-task-list");

  let allTasksArray = [];

  // Event-Listeners

  //Toogle Task Modal
  addTaskBtn.addEventListener("click", () => {
    toggleTaskModal();
  });

  // Submit Task Form
  taskSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
    toggleTaskModal();
    renderTasks(taskListSelectInput.value);
  });

  // Delete Task Btn
  currentTaskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task-btn")) {
      deleteTask();
    }
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
    const taskNotes = taskNotesInput.value || "";
    const taskDueDate = taskDueDateInput.value || "Whenever";
    const taskPriority =
      document.querySelector('input[name="task-priority"]:checked')?.id ||
      "task-priority--input-green";
    const taskList = taskListSelectInput.value.trim().toLowerCase() || "All";
    const newTask = new Task(
      taskTitle,
      taskNotes,
      taskDueDate,
      taskPriority,
      taskList
    );

    allTasksArray.push(newTask);

    taskForm.reset();
  };

  // Delete Task
  /**
   * Handles task deletion by removing the task from the array and re-rendering tasks.
   * @param {Event} e - The event object triggered by the click listener.
   */
  const deleteTask = (e) => {
    const taskIndex = e.target.getAttribute("data-index");
    allTasksArray.splice(taskIndex, 1);
    renderTasks();
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
  const renderTasks = (filter = "All") => {
    console.log("All tasks:", allTasksArray);
    console.log("Render filter passed: ", filter);

    // Clear previous tasks
    currentTaskList.innerHTML = "";

    // Render only tasks of the selected filter
    const tasksToRender =
      filter.trim().toLowerCase() === "all"
        ? allTasksArray
        : allTasksArray.filter(
            (task) =>
              task.list.trim().toLowerCase() === filter.trim().toLowerCase()
          );

    console.log(`Tasks for ${filter}`, tasksToRender);

    // Loop through taskToRender and create elements
    tasksToRender.forEach((task, index) => {
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
      currentTaskList.appendChild(taskElement);
    });
  };

  return { renderTasks };
};

export default taskHandler;
