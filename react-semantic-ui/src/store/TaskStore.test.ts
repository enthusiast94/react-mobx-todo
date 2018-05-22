import TaskStore from "./TaskStore";

describe('TaskStore', () => {
    
    let store: TaskStore;
    Date.now = jest.fn(() => 1);

    beforeEach(() => {
        store = new TaskStore();
    });

    it('should have no tasks at initialization', () => {
        expect(store.tasks.length).toBe(0);
    });

    it('should add task', () => {
        store.addTask('title', 'body');
        expect(store.tasks.length).toBe(1);
        const task = store.tasks[0];
        expect(task.title).toBe('title');
        expect(task.body).toBe('body');
        expect(task.isCompleted).toBe(false);
        expect(task.id).not.toBeUndefined();
        expect(task.createdAt).toEqual(1);
        expect(task.updatedAt).toEqual(1);
    });

    it('should delete task', () => {
        store.addTask('title1', 'body1');
        store.addTask('title2', 'body2');
        store.deleteTask(store.tasks[1]);
        expect(store.tasks.length).toBe(1);
        const remainingTask = store.tasks[0];
        expect(remainingTask.title).toBe('title1');
        expect(remainingTask.body).toBe('body1');
    });

    it('should update task', () => {
        store.addTask('title1', 'body1');
        store.updateTask({...store.tasks[0], title: 't', body: 'b'});
        expect(store.tasks[0].title).toBe('t');
        expect(store.tasks[0].body).toBe('b');
    });

});