import React from 'react';
import { FileTextIcon, CalendarClockIcon, AlertTriangleIcon, MessageSquareTextIcon, CheckCircleIcon, ClockIcon, ArrowUpRightIcon } from 'lucide-react';
import { ProjectTimeline } from './ProjectTimeline';
import { FinancialSummary } from './FinancialSummary';

interface ProjectOverviewProps {
  projectId: string;
  projectName: string;
}
export function ProjectOverview({
  projectId,
  projectName
}: ProjectOverviewProps) {
  return (
    <div className="space-y-6 p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{projectName} Overview</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            New Contract
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
            Export Summary
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Contracts</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">3</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <FileTextIcon size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">2 Pre-Activation</span>
            <span className="text-gray-500 dark:text-gray-400">1 Post-Activation</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Obligations</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">24</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <CalendarClockIcon size={20} className="text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-green-600">18 Completed</span>
            <span className="text-amber-600">4 Pending</span>
            <span className="text-red-600">2 Overdue</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
              <p className="text-2xl font-bold text-amber-600">Medium</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <AlertTriangleIcon size={20} className="text-amber-600" />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">15 Risk Items</span>
            <span className="text-red-600">3 High Risk</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Disputes</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">1</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 bg-primary flex items-center justify-center">
              <MessageSquareTextIcon size={20} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-amber-600">1 In Progress</span>
            <span className="text-gray-500 dark:text-gray-400">0 Resolved</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Project Timeline</h2>
            <ProjectTimeline />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Risk Analysis</h2>
            {/* Add risk analysis component here */}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Financial Summary</h2>
            <FinancialSummary />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Contract Details</h2>
            {/* Add contract details component here */}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Obligations</h2>
        {/* Add obligations table component here */}
      </div>
    </div>
  );
}
