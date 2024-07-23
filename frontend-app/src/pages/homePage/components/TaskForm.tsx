import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { taskValidationSchemaUtils } from '../utils/taskValidationSchema.utils';
import { taskService } from '../../../API/task/Task.service';
import { TaskFormValues } from '../../../@types/TaskFormValue.type';
import { useRecoilValue } from 'recoil';
import { User } from '../../../@types/User.type';
import { userStore } from '../../../stores/UserStore.atom';
import { toast } from 'react-toastify';
import { Status, Task } from '../../../@types/Task.type';

interface FormProps {
  taskId?: string;
}

const TaskForm: React.FC<FormProps> = ({ taskId }) => {
  const user = useRecoilValue<User | undefined>(userStore);
  const [task, setTask] = useState<Task>();

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      if (task) {
        await taskService
          .updateTask({
            createdAt: task.createdAt,
            title: values.title,
            status: values.status as Status,
            text: values.text,
            id: task.id
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success('Votre tache à bien était mise a jour');
              location.reload();
            }
          });
      } else if (user) {
        await taskService.createTask({ ...values, userId: user.id }).then((res) => {
          if (res.status === 201) {
            toast.success('Votre tache à bien était créer');
            location.reload();
          }
        });
      }
    } catch (e) {
      toast.error(`Une erreur c'est produit`);
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async (taskId: string) => {
      await taskService
        .getTask(taskId)
        .then((res) => setTask(res.data))
        .catch((e) => {
          toast.error('Une erreur est survenu');
          console.error(e);
        });
    };

    if (taskId) {
      fetchData(taskId);
    }
  }, [taskId]);

  const initialValues: TaskFormValues = {
    status: task?.status || '',
    title: task?.title || '',
    text: task?.text || ''
  };

  return (
    <div className="mx-auto p-6 bg-white ">
      <Formik
        initialValues={initialValues}
        validationSchema={taskValidationSchemaUtils}
        onSubmit={handleSubmit}
        enableReinitialize={true}>
        <Form>
          <div className="mb-4 space-y-3">
            <label htmlFor="title" className="block text-gray-700 text-sm ">
              Titre
            </label>
            <Field
              type="text"
              name="title"
              className="relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                    text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded"
            />
            <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700">
              Statut
            </label>
            <Field
              as="select"
              name="status"
              className="relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                    text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded">
              <option value="" label="Select status" />
              <option value="todo" label="To Do" />
              <option value="inprogress" label="In Progress" />
              <option value="done" label="Done" />
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700">
              Text
            </label>
            <Field
              as="textarea"
              name="text"
              className="relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                    text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded"
            />
            <ErrorMessage name="text" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              {!taskId ? 'Ajouter' : 'Sauvegarder'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;
