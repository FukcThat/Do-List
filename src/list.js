const makeListBtn = document.querySelector(".list-option--make-list");
const customLists = document.querySelector(".list-option--custom-lists");
const listModal = document.querySelector(".list--modal");
const newListInput = document.querySelector(".modal--input");
const addListBtn = document.querySelector(".modal-add-list-btn");

let listArray = [];

// onclick on add list btn to open add-list-modal
makeListBtn.addEventListener("click", () => {
  listModal.classList.remove("hidden");
});

addListBtn.addEventListener("click", () => {
  const newListName = newListInput.value;
  listArray.push(newListName);

  renderLists();
});

// Helper to render list in ul in nav
const renderLists = (array) => {
  customLists.innerHTML = "";

  array.forEach((list) => {
    const listBtn = document.createElement("button");
    listBtn.textContent = list;
    customLists.appendChild(listBtn);
  });
};
