export default class Task {
  constructor(
    public id: string,
    public title: string,
    public body: string,
    public createdAt: number,
    public updatedAt: number,
    public isCompleted: boolean
  ) {}
}
