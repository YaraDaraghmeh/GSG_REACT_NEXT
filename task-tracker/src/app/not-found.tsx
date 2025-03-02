import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="relative w-40 h-40 mx-auto mb-6"
          animate={{ 
            rotateZ: [0, -10, 10, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image 
            src="/pending-icon.svg"
            alt="Not found icon"
            fill
            sizes="160px"
            className="object-contain opacity-50"
          />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Task Not Found</h1>
        <p className="text-gray-600 mb-8">
          The task you're looking for may have been completed, deleted, or never existed.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 transition transform hover:scale-105"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Return to Homepage
        </Link>
      </motion.div>
    </div>
  );
}