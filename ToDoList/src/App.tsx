import React, { useState } from 'react';
import { Todo } from './types/todo';
import Form from './components/Form/Form';
import {TodoData} from './components/TodoData/TodoData';
import AllTodos from './components/AllTodos/AllTodos';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // Format today's date
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleAddTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleToggleComplete = (todoId: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };

  const handleDelete = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  return (
    <div className="app">
     
      <h1>To Do List</h1>
      <div className="date-header">
        <div className="day">{dayName}</div>
        <div className="date">{formattedDate}</div>
      </div>
      <Form onAddTodo={handleAddTodo} />
      <div>
        <TodoData todos={todos} />
      </div>
      <AllTodos
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;