import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { taskValidationSchemaUtils } from '../utils/taskValidationSchema.utils';
import { taskService } from '../../../API/task/Task.service';
import { TaskFormValues } from '../../../@types/TaskFormValue.type';
import { useRecoilValue } from 'recoil';
import { User } from '../../../@types/User.type';
import { userStore } from '../../../stores/UserStore.atom';
import { toast } from 'react-toastify';

const TaskForm: React.FC = () => {
  const user = useRecoilValue<User | undefined>(userStore);

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      if (user) {
        await taskService.createTask({ ...values, userId: user.id }).then((res) => {
          if (res.status === 201) {
            toast.success('Votre tache à bien était créer');
            location.reload();
          }
        });
      }
    } catch (e) {
      toast.error(`Une erreur c'est produit`);
      console.log();
    }
  };

  const initialValues: TaskFormValues = {
    status: '',
    title: '',
    text: ''
  };

  return (
    <div className="mx-auto p-6 bg-white ">
      <Formik
        initialValues={initialValues}
        validationSchema={taskValidationSchemaUtils}
        onSubmit={handleSubmit}>
        <Form>
          <div className="mb-4 space-y-3">
            <label htmlFor="title" className="block text-gray-700 text-sm ">
              Title
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
              Status
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
              Create Task
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;
