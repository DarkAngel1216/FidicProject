import React, { useState, useEffect } from 'react';
import { HierarchyTree } from './HierarchyTree';
import { RiskHeatmap } from './RiskHeatmap';
import { ContractSummary } from './ContractSummary';
import { UpcomingObligations } from './UpcomingObligations';
import { ProjectStatusChart } from './ProjectStatusChart';
import { RecentActivityFeed } from './RecentActivityFeed';
import { ArrowUpIcon, ArrowDownIcon, FileTextIcon, AlertTriangleIcon, CalendarClockIcon, MessageSquareTextIcon, LoaderIcon } from 'lucide-react';

const stats = [
  { title: 'Active Contracts', value: 24, change: '+3', changeType: 'increase', icon: <FileTextIcon size={20} className="text-blue-600" /> },
  { title: 'High Risk Items', value: 7, change: '-2', changeType: 'decrease', icon: <AlertTriangleIcon size={20} className="text-red-600" /> },
  { title: 'Pending Obligations', value: 18, change: '+5', changeType: 'increase', icon: <CalendarClockIcon size={20} className="text-amber-600" /> },
  { title: 'Open Disputes', value: 3, change: '0', changeType: 'neutral', icon: <MessageSquareTextIcon size={20} className="text-purple-600" /> },
];

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <LoaderIcon className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 flex items-center">
              {stat.changeType === 'increase' ? <ArrowUpIcon size={14} className="text-green-500" /> : stat.changeType === 'decrease' ? <ArrowDownIcon size={14} className="text-red-500" /> : null}
              <span className={`text-xs font-medium ml-1 ${stat.changeType === 'increase' ? 'text-green-500' : stat.changeType === 'decrease' ? 'text-red-500' : 'text-gray-500'}`}>
                {stat.change} this week
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Project Status</h2>
            <ProjectStatusChart />
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h2>
            <RecentActivityFeed />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Risk Heatmap</h2>
            <RiskHeatmap />
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Upcoming Obligations</h2>
            <UpcomingObligations />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Contracts</h2>
        <ContractSummary />
      </div>
    </div>
  );
}
