import * as React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import TaskStore from "../store/TaskStore";

interface AddTaskProps {
  taskStore: TaskStore;
}

interface AddTaskState {
  showingForm: boolean;
  errorMessage?: string;
  title: string;
  body: string;
}

export class AddTask extends React.Component<AddTaskProps, AddTaskState> {
  public constructor(props: AddTaskProps) {
    super(props);
    this.state = {
      body: "",
      errorMessage: undefined,
      showingForm: false,
      title: ""
    };
    this.onAddTaskClicked = this.onAddTaskClicked.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);
  }

  public render() {
    return (
      <div>
        {this.state.showingForm &&
          this.state.errorMessage && (
            <Message negative>
              <p>{this.state.errorMessage}</p>
            </Message>
          )}
        {this.state.showingForm && (
          <div>
            <Form>
              <Form.Input
                placeholder="Title"
                value={this.state.title}
                onChange={(e, {value}) =>
                  this.setState({ ...this.state, title: value })
                }
              />
              <Form.TextArea
                placeholder="Body"
                value={this.state.body}
                onChange={(e, {value}) =>
                  value && this.setState({ ...this.state, body: value.toString() })
                }
              />
            </Form>
            <br/>
          </div>
        )}
        <Button primary content="Add Task" onClick={this.onAddTaskClicked} />
        {this.state.showingForm && (
          <Button content="Cancel" onClick={this.onCloseClicked} />
        )}
      </div>
    );
  }

  private onAddTaskClicked() {
    if (!this.state.showingForm) {
      this.setState({ ...this.state, showingForm: true });
    } else {
      if (this.state.title.length === 0) {
        this.setState({ ...this.state, errorMessage: "Title is required" });
        return;
      }

      this.props.taskStore.addTask(this.state.title, this.state.body);
      this.setState({
        ...this.state,
        body: "",
        errorMessage: undefined,
        showingForm: false,
        title: ""
      });
    }
  }

  private onCloseClicked() {
    this.setState({
      ...this.state,
      body: "",
      errorMessage: undefined,
      showingForm: false,
      title: ""
    });
  }
}
