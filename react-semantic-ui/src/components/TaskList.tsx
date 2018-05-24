import * as React from "react";
import { observer } from "mobx-react";
import { List } from "semantic-ui-react";
import TaskStore from "../store/TaskStore";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  taskStore: TaskStore;
}

@observer
export class TaskList extends React.Component<TaskListProps, {}> {
  public render() {
    const tasks = this.props.taskStore.tasks.map(t => (
      <TaskItem key={t.id} task={t} taskStore={this.props.taskStore} />
    ));
    
    return (
      <List divided relaxed selection size="huge">
        {tasks.length > 0 && tasks}
        {tasks.length === 0 && <div className="no-tasks-found-text" style={{textAlign: 'center'}}>No tasks found</div>}
      </List>
    );
  }
}
