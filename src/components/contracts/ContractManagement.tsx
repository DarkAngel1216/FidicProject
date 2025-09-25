import React, { useState } from 'react';
import { FileTextIcon, UploadIcon, SearchIcon, FilterIcon, SlidersIcon } from 'lucide-react';
import { ContractsTable } from './ContractsTable';

export function ContractManagement() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6 p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Contract Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <UploadIcon size={16} className="mr-2" />
            Upload Contract
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
            <FilterIcon size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white bg-primary rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === 'All' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('All')}
          >
            All
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === 'Active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('Active')}
          >
            Active
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === 'Draft' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('Draft')}
          >
            Draft
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === 'Review' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('Review')}
          >
            Review
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === 'Archived' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('Archived')}
          >
            Archived
          </button>
        </div>
        <div className="p-4">
          <ContractsTable />
        </div>
      </div>
    </div>
  );
}