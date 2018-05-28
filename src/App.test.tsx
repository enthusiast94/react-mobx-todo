import { mount } from "enzyme";
import * as React from "react";
import App from "./App";
import TaskStore from "./store/TaskStore";
import { TaskItem } from "./components/TaskItem";
import { Header, List, Button, Form } from "semantic-ui-react";
import Task from "./domain/Task";
import { AddTask } from "./components/AddTask";

describe("<App/>", () => {
  it("should have no tasks when task store is empty", () => {
    const store = new TaskStore();
    const wrapper = mount(<App taskStore={store} />);
    expect(wrapper.find(TaskItem).length).toBe(0);
    expect(wrapper.find('.no-tasks-found-text').length).toBe(1);
    expect(wrapper.find(Header).text()).toBe("Pending Tasks: 0");
  });

  it("should show tasks and pending tasks count", () => {
    const store = new TaskStore([new Task("1", "title", "body", 1, 1, false)]);
    const wrapper = mount(<App taskStore={store} />);
    
    const taskItems = wrapper.find(TaskItem)
    expect(taskItems.length).toBe(1);
    const taskItem = taskItems.childAt(0);
    expect(taskItem.find(List.Header).text()).toBe('title');
    expect(taskItem.find(List.Description).text()).toBe('body');
    expect(taskItem.find(List.Icon).props().name).toBe('square outline');
    expect(wrapper.find(Header).text()).toBe("Pending Tasks: 1");
    expect(wrapper.find('.no-tasks-found-text').length).toBe(0);
  });

  it('should toggle task completion when clicked', () => {
    const store = new TaskStore([new Task("1", "title", "body", 1, 1, false)]);
    const wrapper = mount(<App taskStore={store} />);

    wrapper.find(TaskItem).childAt(0).find(List.Item).simulate('click');
    expect(wrapper.find(TaskItem).childAt(0).find(List.Icon).props().name).toBe('checkmark box');
    expect(wrapper.find(Header).text()).toBe("Pending Tasks: 0");
    
    wrapper.find(TaskItem).childAt(0).find(List.Item).simulate('click');
    expect(wrapper.find(TaskItem).childAt(0).find(List.Icon).props().name).toBe('square outline');
    expect(wrapper.find(Header).text()).toBe("Pending Tasks: 1");
  });

  it('should add task', () => {
    const store = new TaskStore();
    const wrapper = mount(<App taskStore={store}/>);
    
    expect(wrapper.find(AddTask).find(Form).length).toBe(0);
    wrapper.find(AddTask).find(Button).simulate('click');
    expect(wrapper.find(AddTask).find(Form).length).toBe(1);
    const addTaskComponent = wrapper.find(AddTask);
    addTaskComponent.find('input').simulate('change', {target: {value: 'title'}});
    addTaskComponent.find('textarea').simulate('change', {target: {value: 'body'}});
    addTaskComponent.find('button').at(0).simulate('click');
    const taskItems = wrapper.find(TaskItem);
    expect(taskItems.length).toBe(1);
    const taskItem = taskItems.at(0);
    expect(taskItem.find(List.Header).text()).toBe('title');
    expect(taskItem.find(List.Description).text()).toBe('body');
    expect(taskItem.find(List.Icon).props().name).toBe('square outline');
  });
});
