'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 text-red-500"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </motion.div>
        
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-2">
          We encountered an unexpected error while loading your tasks.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Error details: {error.message || "Unknown error"}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Try Again
          </motion.button>
          
          <Link 
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 inline-flex items-center gap-2 transition"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}