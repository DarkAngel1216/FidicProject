import React from 'react';
import { FileTextIcon, SearchIcon, FilterIcon, PlusIcon } from 'lucide-react';

export function ProjectContracts() {
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Project Contracts</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input type="text" placeholder="Search contracts..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg bg-white">
            <FilterIcon size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileTextIcon size={20} className="text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Siemens Electrical Systems
                </h3>
                <p className="text-xs text-gray-500">
                  CTR-2023-001 • Electrical Systems
                </p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Value</p>
              <p className="text-sm font-medium text-gray-800">$28.5M</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Risk Score</p>
              <p className="text-sm font-medium text-red-600">High</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Activated: 3 months ago</span>
              <button className="text-blue-600 font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileTextIcon size={20} className="text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  ABB Electrical Equipment
                </h3>
                <p className="text-xs text-gray-500">
                  CTR-2023-004 • Electrical Systems
                </p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              Review
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Value</p>
              <p className="text-sm font-medium text-gray-800">$16.5M</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Risk Score</p>
              <p className="text-sm font-medium text-amber-600">Medium</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Last updated: 1 day ago</span>
              <button className="text-blue-600 font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileTextIcon size={20} className="text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Orascom Civil Works
                </h3>
                <p className="text-xs text-gray-500">
                  CTR-2023-002 • Civil Works
                </p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
              Draft
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Value</p>
              <p className="text-sm font-medium text-gray-800">$75M</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Risk Score</p>
              <p className="text-sm font-medium text-amber-600">Medium</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Last updated: 5 hours ago</span>
              <button className="text-blue-600 font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center">
          <PlusIcon size={16} className="mr-2" />
          Add New Contract
        </button>
      </div>
    </div>
}