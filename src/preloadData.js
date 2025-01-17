import taskHandler from "./taskHandler";
import Task from "./task";

export const preloadedLists = ["Home", "Work", "Groceries"];

taskHandler.addTask(
  new Task(
    Date.now() + 1,
    false,
    "Buy groceries",
    "Get milk, eggs, bread, and cheese",
    "2024-12-25",
    "task-priority--input-yellow",
    "groceries"
  ),
  false
);

taskHandler.addTask(
  new Task(
    Date.now() + 2,
    false,
    "Finish work report",
    "Prepare the monthly financial report",
    "2024-12-22",
    "task-priority--input-red",
    "work"
  ),
  false
);

taskHandler.addTask(
  new Task(
    Date.now() + 3,
    false,
    "Clean the kitchen",
    "Deep clean the sink, counters, and floor",
    "Whenever",
    "task-priority--input-green",
    "home"
  ),
  false
);

taskHandler.renderTasks();
