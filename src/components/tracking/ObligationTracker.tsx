import React, { useState } from 'react';
import { CalendarIcon, CheckIcon, ClockIcon, AlertCircleIcon, FilterIcon, ChevronDownIcon, ListIcon } from 'lucide-react';
import { ObligationsCalendar } from './ObligationsCalendar';

export function ObligationTracker() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  return (
    <div className="space-y-6 p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Obligation Tracker</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 flex items-center">
              <FilterIcon size={16} className="mr-2" />
              Filter
              <ChevronDownIcon size={16} className="ml-2" />
            </button>
          </div>
          <button onClick={() => setView(view === 'list' ? 'calendar' : 'list')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 flex items-center">
            {view === 'list' ? <CalendarIcon size={16} className="mr-2" /> : <ListIcon size={16} className="mr-2" />}
            {view === 'list' ? 'Calendar View' : 'List View'}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Obligation
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-3 text-sm font-medium ${filter === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${filter === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${filter === 'overdue' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setFilter('overdue')}
            >
              Overdue
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${filter === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <div className="p-4">
            <ObligationList filter={filter} />
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <ObligationsCalendar />
        </div>
      )}
    </div>
  );
}

interface ObligationListProps {
  filter: string;
}
function ObligationList({
  filter
}: ObligationListProps) {
  // Sample obligations data
  const obligations = [
    {
      id: 1,
      title: 'Payment Milestone 3',
      contract: 'Siemens Contract',
      project: 'Cairo Metro Line 3',
      dueDate: '2023-12-15',
      status: 'upcoming',
      type: 'Payment',
      description: 'Payment of 25% of contract value upon completion of electrical system installation.',
      amount: '$2,500,000',
      clause: '4.2.3'
    },
    {
      id: 2,
      title: 'Delivery of Equipment',
      contract: 'ABB Contract',
      project: 'Cairo Metro Line 3',
      dueDate: '2023-12-10',
      status: 'overdue',
      type: 'Delivery',
      description: 'Delivery of transformers and switchgear to site.',
      clause: '3.1.2'
    },
    {
      id: 3,
      title: 'Contract Extension',
      contract: 'Orascom Contract',
      project: 'Cairo Metro Line 3',
      dueDate: '2023-12-22',
      status: 'upcoming',
      type: 'Legal',
      description: 'Extension of contract duration by 3 months due to scope changes.',
      clause: '8.4.1'
    },
    {
      id: 4,
      title: 'Quality Inspection',
      contract: 'Carrier Contract',
      project: 'Dubai Airport T3',
      dueDate: '2023-12-18',
      status: 'upcoming',
      type: 'Compliance',
      description: 'Final inspection of HVAC installation by third-party inspector.',
      clause: '7.3'
    },
    {
      id: 5,
      title: 'Performance Test',
      contract: 'Siemens Contract',
      project: 'Cairo Metro Line 3',
      dueDate: '2023-12-05',
      status: 'completed',
      type: 'Technical',
      description: 'Conduct performance test of electrical systems under load.',
      clause: '9.1'
    }
  ];
  // Filter obligations based on selected filter
  const filteredObligations = obligations.filter(obligation => {
    if (filter === 'all') return true;
    return obligation.status === filter;
  });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckIcon size={16} className="text-green-500" />;
      case 'upcoming':
        return <ClockIcon size={16} className="text-blue-500" />;
      case 'overdue':
        return <AlertCircleIcon size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  return <div className="space-y-4">
      {filteredObligations.length === 0 ? <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No obligations match your filter.</p>
        </div> : filteredObligations.map(obligation => <div key={obligation.id} className={`border rounded-lg p-4 ${obligation.status === 'overdue' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' : obligation.status === 'completed' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className={`mt-1 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full ${obligation.status === 'overdue' ? 'bg-red-100 dark:bg-red-900/50' : obligation.status === 'completed' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-blue-100 dark:bg-blue-900/50'}`}>
                  {getStatusIcon(obligation.status)}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {obligation.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {obligation.contract} • {obligation.project}
                  </p>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                    {obligation.description}
                  </p>
                  {obligation.amount && <p className="mt-1 text-xs font-medium text-gray-800 dark:text-white">
                      Amount: {obligation.amount}
                    </p>}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${obligation.type === 'Payment' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : obligation.type === 'Delivery' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' : obligation.type === 'Legal' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' : obligation.type === 'Compliance' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {obligation.type}
                </span>
                <div className="mt-2 flex items-center text-xs">
                  <CalendarIcon size={14} className={`${obligation.status === 'overdue' ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'} mr-1`} />
                  <span className={`${obligation.status === 'overdue' ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                    {formatDate(obligation.dueDate)}
                    {obligation.status === 'overdue' ? ' (Overdue)' : ''}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Clause: {obligation.clause}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex space-x-2">
                <button className={`px-3 py-1 text-xs font-medium rounded-md ${obligation.status === 'completed' ? 'text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400' : 'text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900'}`} disabled={obligation.status === 'completed'}>
                  Mark Complete
                </button>
                <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-900">
                  Add Note
                </button>
              </div>
              <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                View Details
              </button>
            </div>
          </div>)}
    </div>
}