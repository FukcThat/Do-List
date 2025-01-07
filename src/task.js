class Task {
  constructor(
    id,
    title = "Untitled Task",
    notes = "",
    dueDate = "Whenever",
    priority = "task-priority--input-green",
    list = "All"
  ) {
    this.id = id;
    this.title = title;
    this.notes = notes;
    this.dueDate - dueDate;
    this.priority = priority;
    this.list = list;
  }
}

export default Task;
