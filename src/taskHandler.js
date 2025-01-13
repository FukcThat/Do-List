import Task from "./task";

const taskHandler = (() => {
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
    const newTask = createTaskFromForm();
    if (newTask) {
      addTask(newTask);
      taskForm.reset();
      toggleTaskModal();
      renderTasks();
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
  const addTask = (task) => {
    if (!task || !task.title || !task.id) {
      console.error("Invalid task:", task);
      return;
    }
    allTasksArray.push(task);
    renderTasks();
  };

  // Create Task from Form
  const createTaskFromForm = () => {
    const taskTitle = taskTitleInput.value.trim();

    if (!taskTitle) {
      window.alert("Task title is required I guess");
      return null;
    }

    // Shuffle in the correct values for Elements
    const taskNotes = taskNotesInput.value || "";
    const taskDueDate = taskDueDateInput.value || "Whenever";
    const taskPriority =
      document.querySelector('input[name="task-priority"]:checked')?.id ||
      "task-priority--input-green";
    const taskList = taskListSelectInput.value.trim().toLowerCase() || "All";
    const taskId = Date.now();

    // Create new Task instance with those values
    const newTask = new Task(
      taskId,
      taskTitle,
      taskNotes,
      taskDueDate,
      taskPriority,
      taskList
    );

    return newTask;
  };

  // Delete Task
  /**
   * Handles task deletion by removing the task from the array and re-rendering tasks.
   * @param {number} taskIndex - The event object triggered by the click listener.
   */
  const deleteTask = (taskId) => {
    console.log("Deleting task with ID:", taskId);

    const taskIndex = allTasksArray.findIndex(
      (task) => task.id === parseInt(taskId)
    );

    if (taskIndex !== -1) {
      allTasksArray.splice(taskIndex, 1);
      renderTasks();
    } else {
      console.log("Task not found.");
    }
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

  // Helper - Toggles task Done / Undone checkmark
  const toggleTaskCheckbox = (taskId) => {
    const taskIndex = allTasksArray.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      allTasksArray[taskIndex].isDone = !allTasksArray[taskIndex].isDone;
      renderTasks();
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "task-priority--input-green":
        return "priority-green";
      case "task-priority--input-yellow":
        return "priority-yellow";
      case "task-priority--input-red":
        return "priority-red";
      default:
        return "priority-default"; // Fallback class
    }
  };

  // Render Tasks
  const renderTasks = (filter = "all") => {
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
    tasksToRender.forEach((task) => {
      console.log("Rendering task:", task);

      // Create the task container
      const taskElement = createElement("div", "", ["task-item"]);

      // Create individual elements for task properties
      const checkboxElement = createElement("input", "", ["task-checkbox"], {
        type: "checkbox",
      });
      checkboxElement.addEventListener("change", () =>
        toggleTaskCheckbox(task.id)
      );

      if (task.isDone) {
        taskElement.classList.add("completed-task");
        checkboxElement.checked = true;
      }

      const titleElement = createElement("h3", task.title, "task-title");
      const notesElement = createElement("p", task.notes, "task-notes");
      const dueDateElement = createElement(
        "p",
        `Due: ${task.dueDate}`,
        "task-due-date"
      );

      console.log(getPriorityClass(task.priority));
      taskElement.classList.add(getPriorityClass(task.priority));

      const listElement = createElement("p", `List: ${task.list}`, "task-list");

      // Create the delete button
      const deleteButton = createElement("button", "", ["delete-task-btn"]);
      deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm3.17-6.41a.996.996 0 1 1 1.41-1.41L12 12.59l1.41-1.41a.996.996 0 1 1 1.41 1.41L13.41 14l1.41 1.41a.996.996 0 1 1-1.41 1.41L12 15.41l-1.41 1.41a.996.996 0 1 1-1.41-1.41L10.59 14zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"/></svg>`;
      deleteButton.setAttribute("data-id", task.id);

      // Delete Btn EventListener
      deleteButton.addEventListener("click", (e) => {
        const button = e.target.closest(".delete-task-btn");
        const taskId = button?.getAttribute("data-id");

        console.log("Delete button clicked:", taskId);
        deleteTask(taskId);
      });

      // Append all elements to the task container
      taskElement.appendChild(checkboxElement);
      taskElement.appendChild(titleElement);
      taskElement.appendChild(notesElement);
      taskElement.appendChild(dueDateElement);
      taskElement.appendChild(listElement);
      taskElement.appendChild(deleteButton);

      // Append the task container to the main task container
      currentTaskList.appendChild(taskElement);
    });
  };
  return { renderTasks, addTask, createTaskFromForm };
})();

export default taskHandler;
