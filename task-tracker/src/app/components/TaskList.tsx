'use client';

import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [filter, setFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let result = [...tasks];
    
    if (filter === 'completed') {
      result = result.filter(task => task.completed);
    } else if (filter === 'pending') {
      result = result.filter(task => !task.completed);
    }
    
    if (searchQuery) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredTasks(result);
  }, [filter, tasks, searchQuery]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <button 
            className={`px-4 py-2 ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-600 mb-1">No tasks found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <motion.ul 
          className="space-y-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </motion.ul>
      )}
    </div>
  );
}