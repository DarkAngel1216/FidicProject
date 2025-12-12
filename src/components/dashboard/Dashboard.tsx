import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiskHeatmap } from './RiskHeatmap';
import { ContractSummary } from './ContractSummary';
import { UpcomingObligations } from './UpcomingObligations';
import { ProjectStatusChart } from './ProjectStatusChart';
import { RecentActivityFeed } from './RecentActivityFeed';
import { ArrowUpIcon, ArrowDownIcon, FileTextIcon, AlertTriangleIcon, CalendarClockIcon, MessageSquareTextIcon, LoaderIcon } from 'lucide-react';

const stats = [
  { title: 'Active Contracts', value: 24, change: '+3', changeType: 'increase', icon: <FileTextIcon size={24} className="text-white" />, color: 'bg-blue-500' },
  { title: 'High Risk Items', value: 7, change: '-2', changeType: 'decrease', icon: <AlertTriangleIcon size={24} className="text-white" />, color: 'bg-red-500' },
  { title: 'Pending Obligations', value: 18, change: '+5', changeType: 'increase', icon: <CalendarClockIcon size={24} className="text-white" />, color: 'bg-amber-500' },
  { title: 'Open Disputes', value: 3, change: '0', changeType: 'neutral', icon: <MessageSquareTextIcon size={24} className="text-white" />, color: 'bg-purple-500' },
];

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

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateReport = () => {
    setGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      alert("Report generated successfully! It has been downloaded to your device.");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <LoaderIcon className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, here's what's happening with your projects today.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className={`px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-colors hover:shadow-md flex items-center ${generating ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {generating ? (
              <>
                <LoaderIcon className="animate-spin mr-2" size={16} />
                Generating...
              </>
            ) : (
              'Generate Report'
            )}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</h3>
              </div>
              <div className={`h-12 w-12 rounded-xl ${stat.color} shadow-lg shadow-${stat.color.replace('bg-', '')}/30 flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center p-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg w-fit">
              {stat.changeType === 'increase' ? <ArrowUpIcon size={16} className="text-emerald-500" /> : stat.changeType === 'decrease' ? <ArrowDownIcon size={16} className="text-rose-500" /> : null}
              <span className={`text-sm font-semibold ml-1 ${stat.changeType === 'increase' ? 'text-emerald-600 dark:text-emerald-400' : stat.changeType === 'decrease' ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              Project Status
            </h2>
            <ProjectStatusChart />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <RecentActivityFeed />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Risk Heatmap</h2>
            <RiskHeatmap />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Obligations</h2>
            <UpcomingObligations />
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Contracts</h2>
        <ContractSummary />
      </motion.div>
    </motion.div>
  );
}
