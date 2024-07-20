import useAuth from '../../hooks/useAuth';
import { useSetRecoilState } from 'recoil';
import { User } from '../../@types/User.type';
import { userStore } from '../../stores/UserStore.atom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/Moal';
import TaskForm from './components/TaskForm';
import { taskService } from '../../API/task/Task.service';
import { toast } from 'react-toastify';
import { Task } from '../../@types/Task.type';
import { sortedTasksUtils } from './utils/SortTasks.utils';
import TaskList from './components/TaskList';

export const HomePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTask] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { setAuth } = useAuth();
  const setUser = useSetRecoilState<User | undefined>(userStore);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const tmp = await taskService.getTasks();
      setTask(tmp.data);
    };
    fetchData();
  }, [refresh]);

  const sortedTasks = sortedTasksUtils(tasks);
  const openModal = () => setModalOpen(true);

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
  const closeModal = () => setModalOpen(false);
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
    <div className="min-h-screen min-w-screen relative">
      <div className="min-h-screen min-w-screen absolute top-0 inset-0 -z-10 overflow-hidden">
        <img
          src="https://cdn.shopify.com/s/files/1/0668/7870/1809/files/Codress-Background2.jpg?v=1717063244"
          alt="logo"
          className="w-full object-cover h-full "
        />
      </div>
      <header className="h-12 flex flex-row justify-between items-center px-10 border-b bg-white bg-gradient-to-r relative z-40">
        Home Page <button onClick={handleLogout}>LogOut</button>
      </header>
      <div className="overflow-y-auto w-full flex flex-col pt-10 px-20">
        <div className="flex w-full justify-between ">
          <span>Taches</span>
          <button onClick={openModal}>Ajouter une nouvelle tache</button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Ajouter une tache">
          <TaskForm />
        </Modal>
        <div className="flex flex-row gap-x-2 justify-center items-start w-full ">
          <TaskList title="To do" sortedTasks={sortedTasks.todo} handleDelete={handelDelete} />
          <TaskList
            title="In progress"
            sortedTasks={sortedTasks.inprogress}
            handleDelete={handelDelete}
          />
          <TaskList title="Done" sortedTasks={sortedTasks.done} handleDelete={handelDelete} />
        </div>
      </div>
    </div>
  );
};
