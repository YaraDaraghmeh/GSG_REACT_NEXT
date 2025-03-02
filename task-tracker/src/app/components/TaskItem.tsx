'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  dueDate: string;
}

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'High':
        return 'border-l-4 border-l-red-500 bg-red-50 hover:bg-red-100';
      case 'Medium':
        return 'border-l-4 border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100';
      case 'Low':
        return 'border-l-4 border-l-green-500 bg-green-50 hover:bg-green-100';
      default:
        return 'border-l-4 border-l-gray-500 bg-gray-50 hover:bg-gray-100';
    }
  };

  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return !task.completed && dueDate < today;
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.li 
      className={`rounded-lg shadow-sm overflow-hidden ${getPriorityColor()} transition-all duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={item}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
      <Link href={`/task/${task.id}`} className="block p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 relative mt-1 rounded-full bg-white p-1 shadow-sm">
            <Image 
              src={task.completed ? '/completed-icon.svg' : '/pending-icon.svg'} 
              alt={task.completed ? "Completed" : "Pending"}
              fill
              sizes="32px"
              className="object-contain p-1"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              
              {isHovered && (
                <div className="flex-shrink-0 ml-2">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                task.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
              
              <span className={`text-xs px-2 py-1 rounded-full ${
                task.priority === 'High' 
                  ? 'bg-red-100 text-red-800' 
                  : task.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
              
              <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                isOverdue() 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {isOverdue() ? 'Overdue' : `Due ${formatDueDate(task.dueDate)}`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}