// src/features/tasks/TaskList.tsx
import type { Task } from '../../entities/tasks/types';

interface Props {
  tasks: Task[];
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: Props) {
  if (!tasks || tasks.length === 0) return <p>No tasks available</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 8 }}>Title</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Status</th>
          <th style={{ padding: 8 }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map(task => (
          <tr key={task.id} style={{ borderTop: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>{task.title}</td>
            <td style={{ padding: 8, textTransform: 'capitalize' }}>
              {task.status.replace('_', ' ')}
            </td>
            <td style={{ padding: 8 }}>
              {canEdit && (
                <button onClick={() => onEdit(task)} style={{ marginRight: 8 }}>
                  Edit
                </button>
              )}
              {canDelete && (
                <button
                  onClick={() => {
                    if (confirm('Delete this task?')) onDelete(task.id);
                  }}
                >
                  Delete
                </button>
              )}
              {!canEdit && !canDelete && <span>—</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}