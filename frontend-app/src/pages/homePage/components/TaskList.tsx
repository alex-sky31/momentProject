import React, { useState } from 'react';
import { Task } from '../../../@types/Task.type';
import classNames from 'classnames';
import Modal from '../../../components/Moal';
import TaskForm from './TaskForm';
import { InfoIcon, TrashIcon } from '../../../assets/icons';

interface TaskListProps {
  sortedTasks: Task[];
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => void;
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ sortedTasks, handleDelete, title }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const closeModal = () => setModalOpen(false);

  const openModal = (id: string) => {
    setModalOpen(true);
    setSelectedTaskId(id);
  };
  return (
    <div className="flex flex-col w-[350px] h-auto rounded-xl bg-[#F3F5F6] p-2 gap-y-2 overflow-y-auto max-h-[500px]">
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Ajouter une tache">
        <TaskForm taskId={selectedTaskId} />
      </Modal>
      <div className="flex justify-between">
        <span>{title}</span> <span>{sortedTasks.length}</span>
      </div>
      {sortedTasks?.map((task, index) => (
        <div
          id="taskCard"
          className="flex w-full min-h-[120px] max-h-[380px] h-auto bg-white rounded p-2 flex-col space-y-2"
          key={index}>
          <span className="text-lg font-semibold flex justify-between items-center">
            {task.title}
            <div className="flex gap-x-2">
              <span onClick={() => openModal(task.id)} className="cursor-pointer">
                <InfoIcon />
              </span>
              <span onClick={() => handleDelete(task.id)} className="cursor-pointer">
                <TrashIcon />
              </span>
            </div>
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
          <p className="hidden md:block">{task.text}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
