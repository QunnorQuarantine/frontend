import type { Task } from './types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Build tasks table layout',
    status: 'todo',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Add filters',
    status: 'in_progress',
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Prepare for job interview',
    status: 'done',
    createdAt: Date.now(),
  },
];