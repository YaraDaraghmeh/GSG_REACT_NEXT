
import React from 'react';
import { Todo } from '../../types/todo';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggleComplete(todo.id)}
        />
        <span className="todo-title">{todo.title}</span>
        {todo.isUrgent && <span className="urgent-badge">Urgent</span>}
      </div>
      <button onClick={() => onDelete(todo.id)} className="delete-button">
        ×
      </button>
    </div>
  );
};

export default TodoItem;