import { Task } from '../../../@types/Task.type';

export const sortedTasksUtils = (
  tasks: Task[]
): { todo: Task[]; inprogress: Task[]; done: Task[] } => {
  return tasks.reduce<{ todo: Task[]; inprogress: Task[]; done: Task[] }>(
    (acc, task) => {
      if (task.status === 'todo') {
        acc.todo.push(task);
      } else if (task.status === 'inprogress') {
        acc.inprogress.push(task);
      } else if (task.status === 'done') {
        acc.done.push(task);
      }
      return acc;
    },
    { todo: [], inprogress: [], done: [] }
  );
};
