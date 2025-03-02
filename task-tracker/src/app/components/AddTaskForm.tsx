'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          completed: false,
          priority,
          dueDate: new Date().toISOString()
        })
      });

      if (res.ok) {
        // Trigger cache revalidation
        await fetch('/api/revalidate');
        router.refresh();
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        New Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Priority</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}