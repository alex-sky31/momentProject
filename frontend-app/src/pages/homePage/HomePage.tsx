import useAuth from '../../hooks/useAuth';
import { useRecoilState } from 'recoil';
import { User } from '../../@types/User.type';
import { userStore } from '../../stores/UserStore.atom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/Moal';
import TaskForm from './components/TaskForm';
import { taskService } from '../../API/task/Task.service';
import { toast } from 'react-toastify';
import { Task } from '../../@types/Task.type';
import { sortedTasksUtils } from './utils/sortTasks.utils';
import TaskList from './components/TaskList';
import Background from '../../assets/backGround.png';

export const HomePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTask] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { setAuth } = useAuth();
  const [user, setUser] = useRecoilState<User | undefined>(userStore);
  const navigate = useNavigate();
  const fetchData = async (userId: string) => {
    const tmp = await taskService.getTasks(userId);
    setTask(tmp.data);
  };
  useEffect(() => {
    if (user) {
      fetchData(user.id);
    }
  }, [refresh, user]);

  const sortedTasks = sortedTasksUtils(tasks);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handelDelete = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId).then((res) => {
        if (res.status === 200) {
          toast.success(`Tache ${taskId} supprimer`);
          setRefresh(!refresh);
        }
      });
    } catch (error) {
      toast.error(`Une erreur c'est produit`);
      console.error(error);
    }
  };
  const handleLogout = async () => {
    try {
      setAuth(null);
      localStorage.removeItem('auth');
      setUser(undefined);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="md:min-h-screen md:min-w-screen w-full h-screen relative pb-2.5">
      <div className="min-h-screen min-w-screen absolute top-0 inset-0 -z-10 overflow-hidden">
        <img src={Background} alt="logo" className="w-full object-cover h-full " />
      </div>
      <header className="h-12 flex flex-row justify-between items-center md:px-10 px-2 z-40 relative bg-white opacity-50 backdrop-blur-sm">
        Gestion des Taches
        <button onClick={handleLogout} className="hover:outline rounded-full text-sm px-1">
          Se déconnecter
        </button>
      </header>
      <div className="w-full flex flex-col pt-10 md:px-20">
        <div className="flex w-full justify-between md:flex-row flex-col p-2.5">
          <span className="flex text-white items-center p-2.5 text-3xl">Vos taches</span>
          <button
            onClick={openModal}
            className="md:px-10 px-2 py-2 relative bg-white bg-opacity-50 hover:backdrop-blur-sm rounded transition-all ease-in delay-100">
            Ajouter une nouvelle tache
          </button>
        </div>
        <div className="flex md:flex-row gap-x-2 justify-center md:items-start items-center w-full h-1/2 flex-col gap-y-2">
          <TaskList title="To do" sortedTasks={sortedTasks.todo} handleDelete={handelDelete} />
          <TaskList
            title="In progress"
            sortedTasks={sortedTasks.inprogress}
            handleDelete={handelDelete}
          />
          <TaskList title="Done" sortedTasks={sortedTasks.done} handleDelete={handelDelete} />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Ajouter une tache">
        <TaskForm />
      </Modal>
    </div>
  );
};
