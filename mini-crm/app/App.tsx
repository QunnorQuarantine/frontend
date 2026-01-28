// src/app/App.tsx
import { useState, useMemo } from 'react';
import { TaskList } from '../src/features/tasks/TaskList';
import { TaskModal } from '../src/features/tasks/TaskModal';
import { useTasks } from '../src/entities/tasks/hooks';
import type { Task } from '../src/entities/tasks/types';
import { useAuth } from './providers/useAuth';

export function App() {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const { isAuth, role, login, logout } = useAuth();
  

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  // Day 3 — фильтры и поиск
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === 'all' || task.status === statusFilter)
    );
  }, [tasks, search, statusFilter]);

  // Day 3 — пагинация
  const [page, setPage] = useState(1);
  const tasksPerPage = 5;
  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * tasksPerPage;
    return filteredTasks.slice(start, start + tasksPerPage);
  }, [filteredTasks, page]);

  // Модалка
  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (task: Task) => {
    setEditing(task);
    setModalOpen(true);
  };
  const handleSave = async (payload: { id?: string; title: string; status: Task['status'] }) => {
  if (payload.id) {
    // строго типизируем для update
    await updateTask({ 
      id: payload.id, 
      title: payload.title, 
      status: payload.status, 
      createdAt: Date.now() 
    });
  } else {
    await createTask(payload.title, payload.status);
  }
};

  if (!isAuth) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Mini CRM Login</h1>
        <button onClick={() => login('user')} style={{ marginRight: 8 }}>Login as User</button>
        <button onClick={() => login('admin')}>Login as Admin</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini CRM — Tasks ({role})</h1>
      <button onClick={logout} style={{ marginBottom: 12 }}>Logout</button>

      {/* Фильтры и поиск */}
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as 'all' | 'todo' | 'in_progress' | 'done')}>
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Create button только для admin */}
      {role === 'admin' && (
        <div style={{ marginBottom: 12 }}>
          <button onClick={openCreate}>Create Task</button>
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <TaskList
        tasks={paginatedTasks}
        canEdit={role === 'admin'}
        canDelete={role === 'admin'}
        onEdit={openEdit}
        onDelete={deleteTask}
/>
      )}

      {/* Пагинация */}
      <div style={{ marginTop: 12 }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span style={{ margin: '0 8px' }}>{page}</span>
        <button disabled={page >= Math.ceil(filteredTasks.length / tasksPerPage)} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}
