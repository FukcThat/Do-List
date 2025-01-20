const listHandler = (renderTasks) => {
  const toggleListModalBtn = document.querySelector(".list--open-modal-btn");
  const customLists = document.querySelector(".list-option--custom-lists");
  const listModal = document.querySelector(".list--modal");
  const newListInput = document.querySelector(".modal--input");
  const addListBtn = document.querySelector(".modal-add-list-btn");
  const customListOption = document.querySelector(".list-option--custom-lists");
  const allListOption = document.querySelector(".task-filter--option-all");
  const todayListOption = document.querySelector(".task-filter--option-today");
  const weekListOption = document.querySelector(".task-filter--option-week");
  const deleteListModal = document.querySelector("#delete-list-modal");
  const listNamePlaceholder = document.querySelector("#list-name-placeholder");
  const keepTasksBtn = document.querySelector("#keep-tasks-btn");
  const deleteTasksBtn = document.querySelector("#delete-tasks-btn");
  const cancelBtn = document.querySelector("#cancel-btn");

  let listArray = [];

  // Toggle List creation modal
  const toggleListModal = () => {
    if (listModal.classList.contains("hidden")) {
      listModal.classList.remove("hidden");
      listModal.classList.add("flex");
    } else {
      listModal.classList.add("hidden");
      listModal.classList.remove("flex");
    }
  };

  toggleListModalBtn.addEventListener("click", () => {
    toggleListModal();
  });

  // Submit new list
  addListBtn.addEventListener("click", () => {
    addList();
  });

  // Add List Helper
  const addList = (newListName) => {
    // If there's no List name provided (from preload), take input from form & render Lists
    if (!newListName) {
      newListName = newListInput.value.trim();

      // Reset the input value & toggle the modal
      newListInput.value = "";
      toggleListModal();
    }

    // Avoid duplicates and unnamed lists
    if (newListName && !listArray.includes(newListName)) {
      listArray.push(newListName);
      renderLists(listArray);
    }
  };

  // Switch Lists
  customListOption.addEventListener("click", (e) => {
    if (e.target.classList.contains("list-modal--list-btn")) {
      const selectedList = e.target.textContent;
      document.querySelector("#task-list--select").value = selectedList;
      renderTasks(selectedList);
    }
  });

  // Delete Lists
  const deleteList = (listName) => {
    openDeleteListModal();
    keepTasksBtn.addEventListener("click", () => {
      keepTasks();
    });

    deleteTasksBtn.addEventListener("click", () => {
      deleteListsAndTasks();

      cancelBtn.addEventListener("click", () => {
        deleteListModal.classList.add("hidden");
      });
    });
  };

  // Helper - Open Delete List Modal
  const openDeleteListModal = () => {
    deleteListModal.classList.remove("hidden");
    listNamePlaceholder.textContent = listName;
  };

  // Helper - Keep tasks of deleted list
  const keepTasks = () => {
    // Reset list to All for tasks in the list
    allTasksArray.forEach((task) => {
      if (task.list === listName.toLowerCase()) {
        task.list = "all";
      }
    });

    // Remove List
    listArray = listArray.filter((list) => list !== listName);

    renderLists();
    renderTasks();

    // Close Modal
    deleteListModal.classList.add("hidden");
  };

  // Helper - Delete Lists and all Tasks in it
  const deleteListsAndTasks = () => {
    //Remove the tasks
    allTasksArray = allTasksArray.filter(
      (task) => task.list !== listName.toLowerCase()
    );

    //Remove the list
    listArray = listArray.filter((list) => list !== listName);

    renderLists();
    renderTasks();

    //Close the Modal
    deleteListModal.classList.add("hidden");
  };

  // Render Lists
  const renderLists = (array) => {
    customLists.innerHTML = "";
    const taskListSelect = document.querySelector("#task-list--select");

    // Clear the dropdown and add the default "All" option
    taskListSelect.innerHTML = `<option value="All">All</option>`;

    array.forEach((list) => {
      // Render in Nav
      const listBtn = document.createElement("div");
      listBtn.textContent = list;
      listBtn.classList.add("list-modal--list-btn", "nav-btn");
      customLists.appendChild(listBtn);

      // Add Event Listener to filter tasks
      listBtn.addEventListener("click", () => {
        const listName = listBtn.textContent.trim().toLowerCase();
        console.log("Clicked custom List: ", listName);
        renderTasks(listName);
      });

      // Add to list select input
      const listOption = document.createElement("option");
      listOption.value = list;
      listOption.textContent = list;
      taskListSelect.appendChild(listOption);
    });
  };

  allListOption.addEventListener("click", () => {
    console.log("Clicked All");
    renderTasks("All");
  });

  todayListOption.addEventListener("click", () => {
    console.log("Clicked Today");
    renderTasks("Today");
  });

  weekListOption.addEventListener("click", () => {
    console.log("Clicked This Week");
    renderTasks("Week");
  });

  return {
    addList,
    renderLists,
  };
};

export default listHandler;
