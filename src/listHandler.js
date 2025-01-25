import taskHandler from "./taskHandler";

const { allTasksArray, createElement } = taskHandler;

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
  const taskListSelect = document.querySelector("#task-list--select");

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

  // Rename Lists
  const renameLists = (oldName, newName) => {
    if (!newName || oldName === newName) return;

    const listIndex = listArray.findIndex((list) => list === oldName);
    if (listIndex !== -1) {
      listArray[listIndex] = newName;
    }

    allTasksArray.forEach((task) => {
      if (task.list === oldName.toLowerCase()) {
        task.list = newName.toLowerCase();
      }
    });

    renderLists();
    renderTasks();

    updateEditDropdowns();
  };

  // Update Task Creation Dropdown
  const updateNewTaskDropdown = () => {
    taskListSelect.innerHTML = `<option value="All">All</option>`;
    listArray.forEach((list) => {
      const option = createElement("option", list, [], {
        value: list.toLowerCase(),
      });
      taskListSelect.appendChild(option);
    });
  };

  // Update Task Expansion Dropdowns
  const updateEditDropdowns = () => {
    const taskDropdowns = document.querySelectorAll(".task-list-dropdown");

    taskDropdowns.forEach((dropdown) => {
      dropdown.innerHTML = "";

      listArray.forEach((list) => {
        const listOption = createElement("option", list, [], {
          value: list.toLowerCase(),
          selected: dropdown.dataset.currentList === list.toLowerCase(),
        });

        dropdown.appendChild(listOption);
      });
    });
  };

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
        deleteListModal.classList.remove("flex");
      });
    });
  };

  // Helper - Open Delete List Modal
  const openDeleteListModal = (listName) => {
    deleteListModal.classList.remove("hidden");
    deleteListModal.classList.add("flex");
    listNamePlaceholder.textContent = listName;
  };

  // Helper - Keep tasks of deleted list
  const keepTasks = (listName) => {
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
  const deleteListsAndTasks = (listName) => {
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
  const renderLists = () => {
    customLists.innerHTML = "";
    const taskListSelect = document.querySelector("#task-list--select");

    // Clear the dropdown and add the default "All" option
    taskListSelect.innerHTML = `<option value="All">All</option>`;

    listArray.forEach((list) => {
      // Render in Nav
      const listContainer = taskHandler.createElement(
        "div",
        "",
        ["list-item-container", "flex"],
        {}
      );

      const listInput = taskHandler.createElement(
        "input",
        "",
        ["nav--list-input"],
        {
          type: "text",
          value: list,
          readonly: true,
        }
      );

      listContainer.addEventListener("click", () => {
        if (!listInput.classList.contains("editable")) {
          renderTasks(list.toLowerCase());
        }
      });

      // Renaming Lists
      const renameListBtn = taskHandler.createElement(
        "button",
        "✏️",
        ["rename-list-button"],
        {}
      );
      renameListBtn.addEventListener("click", () => {
        listInput.classList.add("editable");
        listInput.removeAttribute("readonly");
        listInput.value = "";
        listInput.focus();
      });

      listInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          listInput.blur(); // Trigger blur to finalize
        }
      });

      listInput.addEventListener("blur", (e) => {
        const newListName = e.target.value.trim();
        if (newListName && newListName !== list) {
          renameLists(list, newListName);
          updateEditDropdowns(list, newListName);
        } else {
          listInput.value = list;
        }

        listInput.setAttribute("readonly", true);
        listInput.classList.remove("editable");

        console.log(listInput.classList);
      });

      // Deleting Lists
      const deleteListBtn = taskHandler.createElement(
        "button",
        "🗑️",
        ["delete-list-button"],
        {}
      );
      deleteListBtn.addEventListener("click", () => {
        deleteList(list);
      });

      listContainer.appendChild(listInput);
      listContainer.appendChild(renameListBtn);
      listContainer.appendChild(deleteListBtn);

      customLists.appendChild(listContainer);

      // Add to list select input
      const listOption = document.createElement("option");
      listOption.value = list;
      listOption.textContent = list;
      taskListSelect.appendChild(listOption);
    });

    updateNewTaskDropdown();
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
