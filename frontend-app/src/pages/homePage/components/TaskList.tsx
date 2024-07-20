import React from 'react';
import { Task } from '../../../@types/Task.type';
import { TrashIcon } from '../../../icons/TrashIcon';
import classNames from 'classnames';

interface TaskListProps {
  sortedTasks: Task[];
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => void;
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ sortedTasks, handleDelete, title }) => {
  return (
    <div className="flex flex-col w-[350px] h-auto rounded-xl bg-[#F3F5F6] p-2 gap-y-2">
      <span>{title}</span>
      {sortedTasks?.map((task, index) => (
        <div
          id="taskCard"
          className="flex w-full h-[120px] bg-white rounded p-2 flex-col space-y-2"
          key={index}>
          <span className="text-lg font-semibold flex justify-between items-center">
            {task.title}
            <span onClick={() => handleDelete(task.id)} className="cursor-pointer">
              <TrashIcon />
            </span>
          </span>
          <div className="flex justify-between">
            <span className="text-sm opacity-50">{task.id.split('-')[0]}</span>
            <span
              className={classNames(
                'uppercase text-sm rounded-full text-gray-500 px-1.5',
                task.status === 'done'
                  ? 'bg-green-300'
                  : task.status === 'todo'
                    ? 'bg-red-300'
                    : 'bg-purple-300'
              )}>
              {task.status}
            </span>
          </div>
          <p>{task.text}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
