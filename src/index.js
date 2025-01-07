import "./styles.css";
import { preloadedLists, preloadedTasks } from "./preloadData";
import listHandler from "./listHandler";
import taskHandler from "./taskHandler";

// Initialize Task Handler
const TaskHandler = taskHandler();
const { renderTasks } = TaskHandler;

// Initialize List Handler
const ListHandler = listHandler(renderTasks);

// Preload Lists
preloadedLists.forEach((list) => {
  ListHandler.addList(list);
});

// Preload Tasks
preloadedTasks.forEach((task) => {
  TaskHandler.addTask(task);
});

renderTasks();
