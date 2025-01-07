import Task from "./task";

export const preloadedLists = ["Home", "Work", "Groceries"];

export const preloadedTasks = [
  new Task(
    Date.now() + 1,
    "Buy groceries",
    "Get milk, eggs, bread, and cheese",
    "2024-12-25",
    "task-priority--input-yellow",
    "groceries"
  ),
  new Task(
    Date.now() + 2,
    "Finish work report",
    "Prepare the monthly financial report",
    "2024-12-22",
    "task-priority--input-red",
    "work"
  ),
  new Task(
    Date.now() + 3,
    "Clean the kitchen",
    "Deep clean the sink, counters, and floor",
    "Whenever",
    "task-priority--input-green",
    "home"
  ),
];
