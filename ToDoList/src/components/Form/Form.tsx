import React, { useState } from 'react';
import { Todo } from '../../types/todo';
import './Form.css';

interface FormProps {
  onAddTodo: (todo: Todo) => void;
}

const Form: React.FC<FormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a todo title');
      return;
    }
    
    onAddTodo({
      id: Date.now(),
      title: title.trim(),
      isCompleted: false,
      isUrgent,
    });
    
    setTitle('');
    setIsUrgent(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type Todo here..."
          className="todo-input"
        />
        <div className="urgent-checkbox">
          <label>
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
            />
            Urgent
          </label>
        </div>
      </div>
      <button type="submit" className="add-button">Add To do</button>
    </form>
  );
};

export default Form;