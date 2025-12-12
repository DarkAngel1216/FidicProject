import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, CheckIcon, ClockIcon, AlertCircleIcon, FilterIcon, ChevronDownIcon, ListIcon, PlusIcon } from 'lucide-react';
import { ObligationsCalendar } from './ObligationsCalendar';

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

export function ObligationTracker() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  return (
    <motion.div
      className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Obligation Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage contractual obligations and deadlines.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <button className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center shadow-sm">
              <FilterIcon size={16} className="mr-2" />
              Filter
              <ChevronDownIcon size={16} className="ml-2" />
            </button>
          </div>
          <button onClick={() => setView(view === 'list' ? 'calendar' : 'list')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center shadow-sm">
            {view === 'list' ? <CalendarIcon size={16} className="mr-2" /> : <ListIcon size={16} className="mr-2" />}
            {view === 'list' ? 'Calendar View' : 'List View'}
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 flex items-center shadow-sm hover:shadow-md transition-all">
            <PlusIcon size={18} className="mr-2" />
            Add Obligation
          </button>
        </div>
      </motion.div>

      {view === 'list' ? (
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-2 gap-2 overflow-x-auto">
            {['all', 'upcoming', 'overdue', 'completed'].map((tab) => (
              <button
                key={tab}
                className={`px-5 py-2 text-sm font-medium capitalize rounded-xl transition-all ${filter === tab ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-gray-100 dark:ring-gray-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            <ObligationList filter={filter} />
          </div>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <ObligationsCalendar />
        </motion.div>
      )}
    </motion.div>
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
        return <CheckIcon size={16} className="text-emerald-500" />;
      case 'upcoming':
        return <ClockIcon size={16} className="text-blue-500" />;
      case 'overdue':
        return <AlertCircleIcon size={16} className="text-rose-500" />;
      default:
        return null;
    }
  };
  return <div className="space-y-4">
    {filteredObligations.length === 0 ? <div className="text-center py-12">
      <p className="text-gray-500 dark:text-gray-400">No obligations match your filter.</p>
    </div> : filteredObligations.map(obligation => <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={obligation.id} className={`border rounded-xl p-5 hover:shadow-md transition-shadow ${obligation.status === 'overdue' ? 'border-rose-100 bg-rose-50/30 dark:bg-rose-900/10 dark:border-rose-900/30' : obligation.status === 'completed' ? 'border-emerald-100 bg-emerald-50/30 dark:bg-emerald-900/10 dark:border-emerald-900/30' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`mt-1 h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full ${obligation.status === 'overdue' ? 'bg-rose-100 dark:bg-rose-900/30' : obligation.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
            {getStatusIcon(obligation.status)}
          </div>
          <div className="ml-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {obligation.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {obligation.contract} • {obligation.project}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {obligation.description}
            </p>
            {obligation.amount && <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">
              Amount: {obligation.amount}
            </p>}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${obligation.type === 'Payment' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : obligation.type === 'Delivery' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : obligation.type === 'Legal' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : obligation.type === 'Compliance' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
            {obligation.type}
          </span>
          <div className="mt-3 flex items-center text-sm">
            <CalendarIcon size={15} className={`${obligation.status === 'overdue' ? 'text-rose-500' : 'text-gray-400'} mr-1.5`} />
            <span className={`font-medium ${obligation.status === 'overdue' ? 'text-rose-600' : 'text-gray-600 dark:text-gray-400'}`}>
              {formatDate(obligation.dueDate)}
              {obligation.status === 'overdue' ? ' (Overdue)' : ''}
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-400">
            Clause: {obligation.clause}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100/60 dark:border-gray-700/60 flex justify-between items-center">
        <div className="flex space-x-3">
          <button className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${obligation.status === 'completed' ? 'text-gray-400 bg-gray-50 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed' : 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'}`} disabled={obligation.status === 'completed'}>
            Mark Complete
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            Add Note
          </button>
        </div>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          View Details
        </button>
      </div>
    </motion.div>)}
  </div>
}