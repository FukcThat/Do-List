import "./styles.css";
import { preloadedLists } from "./preloadData";
import listHandler from "./listHandler";
import taskHandler from "./taskHandler";

// Initialize Task Handler
const { renderTasks } = taskHandler;

// Initialize List Handler
const ListHandler = listHandler(renderTasks);

// Preload Lists
preloadedLists.forEach((list) => {
  ListHandler.addList(list);
});

renderTasks();
