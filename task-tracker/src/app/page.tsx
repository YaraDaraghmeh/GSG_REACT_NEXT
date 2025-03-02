import TaskList from './components/TaskList';
import Link from 'next/link';
import Image from 'next/image';
import AddTaskForm from './components/AddTaskForm';

export default async function Home() {
  
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8', {
    next: { 
      revalidate: 3600,
      tags: ['tasks']
    } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  
  const tasks = await res.json();
  
  const tasksWithExtras = tasks.map((task: any) => {
    const priorities = ['High', 'Medium', 'Low'];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 7) + 1);
    
    return { 
      ...task, 
      priority: randomPriority,
      dueDate: dueDate.toISOString()
    };
  });

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-40 bg-blue-600">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Task Tracker</h1>
                <p className="text-blue-100 max-w-2xl">Stay organized and boost your productivity with our intuitive task management system</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                <p className="text-gray-500 text-sm">Showing {tasksWithExtras.length} tasks</p>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  All Tasks
                </button>
                <AddTaskForm />
              </div>
            </div>
            
            <TaskList tasks={tasksWithExtras} />
          </div>
        </div>
      </div>
    </main>
  );
}