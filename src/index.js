import "./styles.css";

import listHandler from "./listHandler";
import taskHandler from "./taskHandler";

const TaskHandler = taskHandler();
listHandler(TaskHandler.renderTasks);
