type Status = 'todo' | 'inprogress' | 'done';

export interface Task {
  createdAt: string;
  id: string;
  status: Status;
  text: string;
  title: string;
}
