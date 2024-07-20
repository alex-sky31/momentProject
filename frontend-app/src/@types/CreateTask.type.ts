import { TaskFormValues } from './TaskFormValue.type';

export interface CreateTaskType extends TaskFormValues {
  userId: string;
}
