import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StandardTemplates } from './StandardTemplates';
import { CustomTemplates } from './CustomTemplates';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export function ContractManagement() {
  const [activeTab, setActiveTab] = useState('Standard');

  return (
    <motion.div
      className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Contract Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage standard FIDIC templates and organization-specific contracts.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 p-2 gap-2">
          <button
            className={`px-6 py-2.5 text-sm font-medium flex-1 text-center rounded-xl transition-all ${activeTab === 'Standard' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('Standard')}
          >
            Standard Templates
          </button>
          <button
            className={`px-6 py-2.5 text-sm font-medium flex-1 text-center rounded-xl transition-all ${activeTab === 'Custom' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('Custom')}
          >
            Custom Templates
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'Standard' && <StandardTemplates />}
          {activeTab === 'Custom' && <CustomTemplates />}
        </div>
      </motion.div>
    </motion.div>
  );
}