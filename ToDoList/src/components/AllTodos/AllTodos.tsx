import React from 'react';
import { Todo } from '../../types/todo';
import TodoItem from '../TodoItem/TodoItem';
import './AllTodos.css';

interface AllTodosProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const AllTodos: React.FC<AllTodosProps> = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <div className="all-todos">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AllTodos;