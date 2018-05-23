import Task from "../domain/Task";
import * as React from "react";
import { List } from "semantic-ui-react";
import TaskStore from "../store/TaskStore";
import { observer } from "mobx-react";

interface TaskItemProps {
  task: Task;
  taskStore: TaskStore;
}

@observer
export class TaskItem extends React.Component<TaskItemProps, {}> {
  public task: Task;

  public constructor(props: TaskItemProps) {
    super(props);
    this.task = props.task;
    this.toggleTaskCompleted = this.toggleTaskCompleted.bind(this);
  }

  public render() {
    return (
      <List.Item key={this.task.id} onClick={this.toggleTaskCompleted}>
        <List.Icon
          name={this.task.isCompleted ? "checkmark box" : "square outline"}
          size="large"
          verticalAlign="middle"
        />
        <List.Content>
          <List.Header>{this.task.title}</List.Header>
          {this.task.body}
        </List.Content>
      </List.Item>
    );
  }

  private toggleTaskCompleted() {
    this.props.taskStore.toggleCompleted(this.task);
  }
}
