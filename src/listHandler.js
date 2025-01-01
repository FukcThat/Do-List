const listHandler = () => {
  const toggleListModalBtn = document.querySelector(".list--open-modal-btn");
  const customLists = document.querySelector(".list-option--custom-lists");
  const listModal = document.querySelector(".list--modal");
  const newListInput = document.querySelector(".modal--input");
  const addListBtn = document.querySelector(".modal-add-list-btn");
  const customListOption = document.querySelector(".list-option--custom-lists");

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
    const newListName = newListInput.value;
    listArray.push(newListName);

    toggleListModal();
    newListInput.value = "";

    renderLists(listArray);
  });

  // Switch Lists
  customListOption.addEventListener("click", (e) => {
    if (e.target.classList.contains("list-modal--list-btn")) {
      const selectedList = e.target.textContent;
      document.querySelector("#task-list--select").value = selectedList;
      renderTasks();
    }
  });

  // Render Lists
  const renderLists = (array) => {
    customLists.innerHTML = "";
    const taskListSelect = document.querySelector("#task-list--select");

    array.forEach((list) => {
      // Render in Nav
      const listBtn = document.createElement("div");
      listBtn.textContent = list;
      listBtn.classList.add("list-modal--list-btn", "nav-btn");
      customLists.appendChild(listBtn);

      // Add to list select input
      const listOption = document.createElement("option");
      listOption.value = list;
      listOption.textContent = list;
      taskListSelect.appendChild(listOption);
    });
  };
};

export default listHandler;
