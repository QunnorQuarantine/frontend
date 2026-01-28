import type {  Task } from './types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Сверстать таблицу задач',
    status: 'todo',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Добавить фильтры',
    status: 'in_progress',
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Подготовиться к собеседованию',
    status: 'done',
    createdAt: Date.now(),
  },
];
