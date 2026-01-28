// src/entities/task/hooks.ts
import { useCallback, useEffect, useState } from 'react';
import type { Task } from './types';
import { taskApi } from './api';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    taskApi.getAll().then(data => {
      if (!mounted) return;
      setTasks(data);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const createTask = useCallback(async (title: string, status?: Task['status']) => {
    const t = await taskApi.create({ title, status });
    setTasks(prev => [t, ...prev]);
    return t;
  }, []);

  const updateTask = useCallback(async (task: Task) => {
    const t = await taskApi.update(task);
    setTasks(prev => prev.map(p => (p.id === t.id ? t : p)));
    return t;
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await taskApi.remove(id);
    setTasks(prev => prev.filter(p => p.id !== id));
  }, []);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    setTasks // полезно для быстрой инициализации/тестов
  };
}
