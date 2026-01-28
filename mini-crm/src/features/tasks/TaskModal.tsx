// src/features/tasks/TaskModal.tsx
import React, { useEffect, useState } from 'react';
import type { Task } from '../../entities/tasks/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: { id?: string; title: string; status: Task['status'] }) => Promise<void> | void;
  initial?: Task | null;
}

export function TaskModal({ isOpen, onClose, onSave, initial }: Props) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setStatus(initial.status);
    } else {
      setTitle('');
      setStatus('todo');
    }
  }, [initial, isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    setSaving(true);
    try {
      await onSave({ id: initial?.id, title: title.trim(), status });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.3)'
    }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 20, minWidth: 320, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>
          {initial ? 'Edit Task' : 'Create Task'}
        </h3>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block' }}>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block' }}>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as Task['status'])}>
            <option value="todo">todo</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}