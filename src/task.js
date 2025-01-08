class Task {
  constructor(id, isDone = false, title, notes, dueDate, priority, list) {
    this.id = id;
    this.isDone = isDone;
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    this.list = list;
  }
}

export default Task;
