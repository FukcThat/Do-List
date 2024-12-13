const listHandler = () => {
  const toggleListModalBtn = document.querySelector(".list--open-modal-btn");
  const customLists = document.querySelector(".list-option--custom-lists");
  const listModal = document.querySelector(".list--modal");
  const newListInput = document.querySelector(".modal--input");
  const addListBtn = document.querySelector(".modal-add-list-btn");

  let listArray = [];

  // Toggle List creation modal
  toggleListModalBtn.addEventListener("click", () => {
    if (listModal.classList.contains("hidden")) {
      listModal.classList.remove("hidden");
      listModal.classList.add("flex");
    } else {
      listModal.classList.add("hidden");
      listModal.classList.remove("flex");
    }
  });

  // Submit new list
  addListBtn.addEventListener("click", () => {
    const newListName = newListInput.value;
    listArray.push(newListName);

    newListInput.value = "";

    renderLists(listArray);
  });

  // Render Lists
  const renderLists = (array) => {
    customLists.innerHTML = "";

    array.forEach((list) => {
      const listBtn = document.createElement("div");
      listBtn.textContent = list;
      listBtn.classList.add("list-modal--list-btn", "nav-btn");
      customLists.appendChild(listBtn);
    });
  };
};

export default listHandler;
