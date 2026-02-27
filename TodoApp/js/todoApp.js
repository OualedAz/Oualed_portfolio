const addBtn = document.querySelector("#addBtn");
const inputAdd = document.querySelector("#todo-input");
const listItems = document.querySelector("#todo-list");
const checkIcon = document.querySelector(".custom-checkbox");
const errorMsg = document.querySelector("#error");
const completed = document.querySelector("#todoListCompleted");
const container = document.querySelector("#container");
const svgFill = `<svg fill ="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
const svgDelete = `<svg fill ="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
const svgEdit = `<svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24">
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
  <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
</svg>`;
let id = 0;

const svgFromString = (svgString) => {
  const template = document.createElement("template");
  template.innerHTML = svgString.trim();
  return template.content.firstChild;
};

const addTask = () => {
  if (!inputAdd.value) {
    errorMsg.textContent = "The input must be filled!";
    errorMsg.classList.add("error", "wrapper");
    setTimeout(() => {
      errorMsg.innerHTML = "";
      errorMsg.classList.remove("error", "wrapper");
    }, 2500);
  } else if (inputAdd.value) {
    const task = inputAdd.value.trim();

    //Creating the elements for the li
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const labelSvg = document.createElement("label");
    const labelText = document.createElement("label");
    const btnDelete = document.createElement("button");
    const btnEdit = document.createElement("button");
    const contentInput = document.createTextNode(`${task}`);

    //Icons
    const checkIcon = svgFromString(svgFill);
    const btnDelIcon = svgFromString(svgDelete);
    const editIcon = svgFromString(svgEdit);

    // Setting the tags and adding the classes from css
    li.classList.add("todo");
    checkbox.type = "checkbox";
    checkbox.id = `check-${id + 1}`;
    labelSvg.classList.add("custom-checkbox");
    labelSvg.htmlFor = `check-${id + 1}`;
    labelText.classList.add("todo-text");
    labelText.htmlFor = `check-${id + 1}`;
    btnDelete.classList.add("delete-button");
    btnEdit.classList.add("edit-button");

    // Every thing needs an appendChild
    labelSvg.appendChild(checkIcon);
    btnDelete.appendChild(btnDelIcon);
    labelText.appendChild(contentInput);
    btnEdit.appendChild(editIcon);
    li.appendChild(checkbox);
    li.appendChild(labelSvg);
    li.appendChild(labelText);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    listItems.appendChild(li);

    inputAdd.value = "";
    id++;
  }
};

const checkedTask = (checkbox) => {
  const li = checkbox.closest("li");

  if (checkbox.checked) {
    completed.appendChild(li);
  } else if (!checkbox.checked) {
    listItems.appendChild(li);
  }
};

const editTask = (button) => {
  const li = button.closest("li");
  const label = li.querySelector(".todo-text");

  if (label.contentEditable == "false") {
    label.contentEditable = true;
    label.focus();
    const range = document.createRange();
    range.selectNodeContents(label);
    range.collapse(false);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    label.contentEditable = false;
  }
};

//Events
addBtn.addEventListener("click", addTask);
container.addEventListener("click", function (event) {
  const checkbox = event.target.closest("input[type=checkbox]");
  if (checkbox) {
    checkedTask(checkbox);
    return;
  }
  const deleteBtn = event.target.closest(".delete-button");
  if (deleteBtn) {
    deleteBtn.closest("li").remove();
    return;
  }
  const editBtn = event.target.closest(".edit-button");
  if (editBtn) {
    editTask(editBtn);
    return;
  }
});
container.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    console.log(e.key);
    const editBtn = e.target.closest(".todo-text");
    if (editBtn) {
      editTask(editBtn);
      console.log(e.key);
      return;
    }
  }
});
