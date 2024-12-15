const taskHandler = () => {
  // Variables & such
  const addTaskBtn = document.querySelector(".add-task-btn");
  const taskModal = document.querySelector(".task-form--container");
  const taskFormInput = document.querySelector(".task-form");
  const taskTitleInput = document.querySelector("#task-title");
  const taskNotesInput = document.querySelector("#task-description");
  const taskDueDateInput = document.querySelector("#task-due-date");
  const taskPriorityGroup = document.querySelector(".task-priority--inputs");
  const taskListSelectInput = document.querySelector("#task-list--select");
  const taskSubmitBtn = document.querySelector("#task-form--submit-btn");

  // Event-Listeners

  //Toogle Task Modal
  addTaskBtn.addEventListener("click", () => {
    toggleTaskModal();
  });

  // Submit Task Form
  taskSubmitBtn.addEventListener("click", () => {
    // Convert form values into a whole task
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
};

export default taskHandler;
