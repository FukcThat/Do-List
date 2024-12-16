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
};

export default taskHandler;
