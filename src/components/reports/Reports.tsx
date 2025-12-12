import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3Icon,
  PieChartIcon,
  TrendingUpIcon,
  DownloadIcon,
  FilterIcon,
  ChevronDownIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  CalendarIcon,
  FileTextIcon,
  CheckCircle,
  Clock,
  AlertCircleIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

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

export function Reports() {
  const [activeReport, setActiveReport] = useState('contract-deviation');

  return (
    <motion.div
      className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Generate and analyze project performance reports.</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => alert("Filter modal would open here")} className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center shadow-sm hover:shadow-md transition-all">
            <FilterIcon size={16} className="mr-2" />
            Filter
          </button>
          <button onClick={() => alert("Report exported to PDF")} className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 flex items-center shadow-sm hover:shadow-md transition-all">
            <DownloadIcon size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-h-[600px]">
        <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 p-2 gap-2 overflow-x-auto">
          {[
            { id: 'contract-deviation', label: 'Contract Deviation' },
            { id: 'risk-analysis', label: 'Risk Analysis' },
            { id: 'compliance', label: 'Compliance & Obligations' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`px-5 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-all ${activeReport === tab.id ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm ring-1 ring-gray-100 dark:ring-gray-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveReport(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-8">
          {activeReport === 'contract-deviation' && <ContractDeviationReport />}
          {activeReport === 'risk-analysis' && <RiskAnalysisReport />}
          {activeReport === 'compliance' && <ComplianceReport />}
        </div>
      </div>
    </motion.div>
  );
}

function ContractDeviationReport() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex space-x-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Region
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Regions</option>
              <option>Middle East</option>
              <option>Europe</option>
              <option>North America</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Project
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Projects</option>
              <option>Cairo Metro Line 3</option>
              <option>Dubai Airport T3</option>
              <option>Riyadh Metro</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Contract
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Contracts</option>
              <option>Siemens Electrical Systems</option>
              <option>Orascom Civil Works</option>
              <option>ABB Electrical Equipment</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Time Period
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Custom Range</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Clauses Analyzed
            </h3>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <FileTextIcon size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">1,248</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">Across 12 contracts</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Deviation Rate
            </h3>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
              <BarChart3Icon size={20} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">23.4%</p>
          <div className="flex items-center mt-2">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded-lg mr-2">+2.1%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">from prev. period</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              High Risk Deviations
            </h3>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center">
              <AlertTriangleIcon size={20} className="text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">87</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">7% of total clauses</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Clause Deviation by Category
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead className="bg-gray-50/50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Clause Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Clauses
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Deviations
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Deviation %
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Risk Level
                </th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[{
                category: 'Payment Terms',
                total: 156,
                deviations: 48,
                percent: '30.8%',
                risk: 'High'
              }, {
                category: 'Time for Completion',
                total: 92,
                deviations: 23,
                percent: '25.0%',
                risk: 'Medium'
              }, {
                category: 'Variations',
                total: 124,
                deviations: 41,
                percent: '33.1%',
                risk: 'High'
              }, {
                category: 'Claims & Disputes',
                total: 187,
                deviations: 65,
                percent: '34.8%',
                risk: 'High'
              }, {
                category: 'Force Majeure',
                total: 78,
                deviations: 12,
                percent: '15.4%',
                risk: 'Low'
              }, {
                category: 'Warranties',
                total: 103,
                deviations: 31,
                percent: '30.1%',
                risk: 'Medium'
              }, {
                category: 'Termination',
                total: 95,
                deviations: 38,
                percent: '40.0%',
                risk: 'High'
              }].map((item, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.deviations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.percent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${item.risk === 'High' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' : item.risk === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'}`}>
                      {item.risk}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
function RiskAnalysisReport() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex space-x-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Region
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Regions</option>
              <option>Middle East</option>
              <option>Europe</option>
              <option>North America</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Project
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Projects</option>
              <option>Cairo Metro Line 3</option>
              <option>Dubai Airport T3</option>
              <option>Riyadh Metro</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Risk Level
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Levels</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Time Period
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Custom Range</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              High Risk Items
            </h3>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center">
              <AlertTriangleIcon size={20} className="text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">87</p>
          <div className="flex items-center mt-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-lg mr-2">-12%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">from prev. period</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Medium Risk Items
            </h3>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
              <AlertTriangleIcon size={20} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">156</p>
          <div className="flex items-center mt-2">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded-lg mr-2">+5%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">from prev. period</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Low Risk Items
            </h3>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <AlertTriangleIcon size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">324</p>
          <div className="flex items-center mt-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-lg mr-2">+2%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">from prev. period</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Overall Risk Score
            </h3>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <PieChartIcon size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">5.2/10</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">Medium Risk Portfolio</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Detailed Risk Assessment
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead className="bg-gray-50/50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Risk Item
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Probability
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { item: 'Material Price Fluctuation', category: 'Financial', prob: 'High', impact: 'High', score: 20, status: 'Active' },
                { item: 'Labor Shortage', category: 'Operational', prob: 'Medium', impact: 'High', score: 15, status: 'Monitored' },
                { item: 'Permit Delays', category: 'Regulatory', prob: 'Low', impact: 'Medium', score: 6, status: 'Closed' },
                { item: 'Design Changes', category: 'Technical', prob: 'High', impact: 'Medium', score: 12, status: 'Active' },
                { item: 'Weather Conditions', category: 'Environmental', prob: 'Medium', impact: 'Low', score: 4, status: 'Monitored' },
                { item: 'Subcontractor Insolvency', category: 'Financial', prob: 'Low', impact: 'High', score: 8, status: 'Monitored' },
                { item: 'Safety Incidents', category: 'Safety', prob: 'Low', impact: 'High', score: 10, status: 'Active' },
              ].map((row, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {row.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {row.prob}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {row.impact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {row.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${row.status === 'Active' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' :
                      row.status === 'Monitored' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                        'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      }`}>
                      {row.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComplianceReport() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex space-x-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="w-1/3">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Region
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Regions</option>
              <option>Middle East</option>
              <option>Europe</option>
              <option>North America</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/3">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Project
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Projects</option>
              <option>Cairo Metro Line 3</option>
              <option>Dubai Airport T3</option>
              <option>Riyadh Metro</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/3">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Status
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-4 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Obligations Met
            </h3>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">85%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">Top quartile based</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Pending Obligations
            </h3>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">42</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">Due within 30 days</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Overdue Items
            </h3>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center">
              <AlertCircleIcon size={20} className="text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">7</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">Requires immediate action</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Upcoming Obligations (Next 30 Days)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead className="bg-gray-50/50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Obligation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigned To
                </th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[{
                obligation: 'Payment Milestone 3',
                contract: 'Siemens Electrical Systems',
                type: 'Payment',
                date: 'Dec 15, 2023',
                status: 'Pending',
                assigned: 'Finance Dept'
              }, {
                obligation: 'Delivery of Equipment',
                contract: 'ABB Electrical Equipment',
                type: 'Delivery',
                date: 'Dec 10, 2023',
                status: 'Overdue',
                assigned: 'Procurement'
              }, {
                obligation: 'Quality Inspection',
                contract: 'Carrier HVAC Systems',
                type: 'Compliance',
                date: 'Dec 18, 2023',
                status: 'Pending',
                assigned: 'QA Team'
              }, {
                obligation: 'Contract Extension',
                contract: 'Orascom Civil Works',
                type: 'Legal',
                date: 'Dec 22, 2023',
                status: 'Pending',
                assigned: 'Legal Dept'
              }, {
                obligation: 'Performance Test',
                contract: 'Siemens Electrical Systems',
                type: 'Technical',
                date: 'Jan 5, 2024',
                status: 'Pending',
                assigned: 'Technical Team'
              }].map((item, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.obligation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.contract}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${item.type === 'Payment' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : item.type === 'Delivery' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : item.type === 'Legal' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : item.type === 'Compliance' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${item.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : item.status === 'Overdue' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.assigned}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}