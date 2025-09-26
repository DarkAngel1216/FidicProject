import React, { useState } from 'react';
import { StandardTemplates } from './StandardTemplates';
import { CustomTemplates } from './CustomTemplates';

export function ContractManagement() {
  const [activeTab, setActiveTab] = useState('Standard');

  return (
    <div className="space-y-6 p-4 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Contract Management</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === 'Standard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('Standard')}
          >
            Standard Templates
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === 'Custom' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('Custom')}
          >
            Custom Templates
          </button>
        </div>
        <div className="p-4">
          {activeTab === 'Standard' && <StandardTemplates />}
          {activeTab === 'Custom' && <CustomTemplates />}
        </div>
      </div>
    </div>
  );
}