import { observable, action } from "mobx";
import * as uuid from "uuid/v4";
import Task from "../domain/Task";

export default class TaskStore {
  @observable 
  public tasks: Task[] = [];

  @action
  public addTask(title: string, body: string): void {
    const currentMillis = Date.now();
    const task = Object.freeze(
      new Task(uuid(), title, body, currentMillis, currentMillis, false)
    );
    this.tasks.push(task);
  }

  @action
  public deleteTask(task: Task): void {
    const taskIndex = this.tasks.indexOf(task);
    if (taskIndex === -1) {
      throw new Error(`Could not find task with id [${task.id}]`);
    }

    this.tasks.splice(taskIndex, 1);
  }

  @action
  public updateTask(task: Task): void {
    let taskIndex = -1;
    this.tasks.forEach((t, index) => {
      if (t.id === task.id) {
        taskIndex = index;
      }
    });

    if (taskIndex === -1) {
      throw new Error(`Could not find task with id [${task.id}]`);
    }

    this.tasks.splice(taskIndex, 1, task);  
  }
}
