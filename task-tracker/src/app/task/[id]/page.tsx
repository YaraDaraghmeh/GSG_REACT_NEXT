'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  priority?: string;
  dueDate?: string;
}

export default function TaskPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [completedNow, setCompletedNow] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            return notFound();
          }
          throw new Error('Failed to fetch task');
        }
        
        const taskData = await res.json();
        
        const priorities = ['High', 'Medium', 'Low'];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 7) + 1);
        
        setTask({ 
          ...taskData, 
          priority: randomPriority,
          dueDate: dueDate.toISOString()
        });
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  const copyToClipboard = () => {
    if (task) {
      navigator.clipboard.writeText(task.title)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const toggleTaskCompletion = () => {
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      setTask(updatedTask);
      
      if (!task.completed) {
        setCompletedNow(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        setCompletedNow(false);
      }
    }
  };

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-700">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return notFound();
  }

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      {completedNow && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-green-500 text-white text-4xl font-bold px-8 py-6 rounded-xl shadow-2xl">
            Task Completed! 🎉
          </div>
        </motion.div>
      )}
      
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition group"
        >
          <svg className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Tasks
        </Link>
        
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-48 md:h-64 w-full">
            <Image
              src="/task-background.jpg"
              alt="Task background"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="inline-block mb-3 bg-white bg-opacity-20 backdrop-blur-md rounded-full px-4 py-1 text-white text-sm">
                  Task #{task.id}
                </div>
                <h1 className="text-white text-2xl md:text-3xl font-bold px-4 text-center">
                  {task.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className={`flex items-center px-3 py-2 rounded-lg ${
                task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                <div className="w-5 h-5 relative mr-2">
                  <Image 
                    src={task.completed ? '/completed-icon.svg' : '/pending-icon.svg'} 
                    alt={task.completed ? "Completed" : "Pending"}
                    fill
                    sizes="20px"
                    className="object-contain"
                  />
                </div>
                <span className="font-medium">
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              
              {task.priority && (
                <div className={`flex items-center px-3 py-2 rounded-lg ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{task.priority} Priority</span>
                </div>
              )}
              
              {task.dueDate && (
                <div className="flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Due: {formatDueDate(task.dueDate)}</span>
                </div>
              )}
            </div>
            
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h2 className="font-semibold text-gray-700 mb-2">Task Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Assigned to User</p>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-900">User {task.userId}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-600 text-sm mb-1">Task ID</p>
                  <p className="text-gray-900">{task.id}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={toggleTaskCompletion}
                className={`px-4 py-2 rounded transition flex items-center gap-2 ${
                  task.completed 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {task.completed ? (
                  <>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Mark as Incomplete
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Mark as Complete
                  </>
                )}
              </button>
              
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy Title
                  </>
                )}
              </button>
              
              <Link 
                href="/"
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition flex items-center gap-2"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Tasks
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}