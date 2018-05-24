import { observable } from "mobx";

export default class Task {
  public id: string;
  @observable public title: string;
  @observable public body: string;
  @observable public createdAt: number;
  @observable public updatedAt: number;
  @observable public isCompleted: boolean;

  public constructor(
    id: string,
    title: string,
    body: string,
    createdAt: number,
    updatedAt: number,
    isCompleted: boolean
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isCompleted = isCompleted;
  }
}
