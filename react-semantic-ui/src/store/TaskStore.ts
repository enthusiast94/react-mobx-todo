import { observable, action, computed } from "mobx";
import * as uuid from "uuid/v4";
import Task from "../domain/Task";

export default class TaskStore {
  @observable public tasks: Task[] = [];

  constructor(tasks?: Task[]) {
    if (tasks) {
      this.tasks = tasks;
    }
  }

  @action
  public addTask(title: string, body: string): void {
    const currentMillis = Date.now();
    const task = new Task(
      uuid(),
      title,
      body,
      currentMillis,
      currentMillis,
      false
    );

    this.tasks.push(task);
  }

  @action
  public deleteTask(task: Task) {
    const taskIndex = this.tasks.indexOf(task);
    if (taskIndex === -1) {
      throw new Error(`Could not find task with id [${task.id}]`);
    }

    this.tasks.splice(taskIndex, 1);
  }

  @action
  public toggleCompleted(task: Task): void {
    const taskToUpdate = this.tasks.find(t => t.id === task.id);
    if (!taskToUpdate) {
      throw new Error(`Could not find task with id [${task.id}]`);
    } 

    taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
    taskToUpdate.updatedAt = Date.now();
  }

  @computed
  public get getPendingTaskCount() {
    return this.tasks.filter(t => !t.isCompleted).length;
  }
}
