import * as React from "react";
import { TaskList } from "./components/TaskList";
import TaskStore from "./store/TaskStore";
import "./App.css";
import { Container, Header } from "semantic-ui-react";
import { observer } from "mobx-react";

interface AppProps {
  taskStore: TaskStore;
}

@observer
class App extends React.Component<AppProps, {}> {
  public render() {
    return (
      <div>
        <Container>
          <br />
          <Header as="h1" textAlign="center" block>
            {`Pending Tasks: ${this.props.taskStore.getPendingTaskCount}`}
          </Header>
          <TaskList taskStore={this.props.taskStore} />
        </Container>
      </div>
    );
  }
}

export default App;
