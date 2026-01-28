// src/entities/task/api.ts
import type { Task, TaskStatus } from './types';

const STORAGE_KEY = 'mini-crm:tasks';

const wait = <T,>(v: T, ms = 200) =>
  new Promise<T>(res => setTimeout(() => res(v), ms));

function readStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Task[] : [];
  } catch {
    return [];
  }
}

function writeStorage(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const taskApi = {
  async getAll(): Promise<Task[]> {
    return wait(readStorage());
  },

  async create(payload: { title: string; status?: TaskStatus }): Promise<Task> {
    const tasks = readStorage();
    const newTask: Task = {
      id: genId(),
      title: payload.title,
      status: payload.status ?? 'todo',
      createdAt: Date.now(),
    };
    const next = [newTask, ...tasks];
    writeStorage(next);
    return wait(newTask);
  },

  async update(updated: Task): Promise<Task> {
    const tasks = readStorage();
    const idx = tasks.findIndex(t => t.id === updated.id);
    if (idx === -1) throw new Error('Not found');
    tasks[idx] = { ...tasks[idx], ...updated };
    writeStorage(tasks);
    return wait(tasks[idx]);
  },

  async remove(id: string): Promise<void> {
    const tasks = readStorage().filter(t => t.id !== id);
    writeStorage(tasks);
    return wait(undefined);
  }
};
