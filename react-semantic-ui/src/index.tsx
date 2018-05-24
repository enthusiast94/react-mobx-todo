import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import registerServiceWorker from "./registerServiceWorker";
import TaskStore from "./store/TaskStore";
import Task from "./domain/Task";

const initialTasks: Task[] = [
  new Task(
    "1",
    "This is a sample title",
    "Just a body?",
    Date.now(),
    Date.now(),
    false
  ),
  new Task(
    "2",
    "This is a sample title part 2",
    "Just a body maybe?",
    Date.now(),
    Date.now(),
    false
  ),
  new Task(
    "3",
    "This is a sample title part 3",
    "Just another body perhaps?",
    Date.now(),
    Date.now(),
    false
  )
];
const taskStore = new TaskStore(initialTasks);
ReactDOM.render(<App taskStore={taskStore} />, document.getElementById(
  "root"
) as HTMLElement);
registerServiceWorker();
