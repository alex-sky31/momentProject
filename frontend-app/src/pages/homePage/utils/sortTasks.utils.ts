import { Task } from '../../../@types/Task.type';

enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  DONE = 'done'
}

export const sortedTasksUtils = (
  tasks: Task[]
): { todo: Task[]; inprogress: Task[]; done: Task[] } => {
  return tasks.reduce<{ todo: Task[]; inprogress: Task[]; done: Task[] }>(
    (acc, task) => {
      if (task.status === TaskStatus.TODO) {
        acc.todo.push(task);
      } else if (task.status === TaskStatus.IN_PROGRESS) {
        acc.inprogress.push(task);
      } else if (task.status === TaskStatus.DONE) {
        acc.done.push(task);
      }
      return acc;
    },
    { todo: [], inprogress: [], done: [] }
  );
};
