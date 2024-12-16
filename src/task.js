class Task {
  constructor(
    title = "Untitled Task",
    notes = "",
    dueDate = "Whenever",
    priority = "task-priority--input-green",
    list = "All"
  ) {
    this.title = title;
    this.notes = notes;
    this.dueDate - dueDate;
    this.priority = priority;
    this.list = list;
  }
}

export default Task;
