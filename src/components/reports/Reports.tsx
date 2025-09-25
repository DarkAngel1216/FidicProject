import React, { useState } from 'react';
import { DownloadIcon, FilterIcon, BarChart2Icon, PieChartIcon, FileTextIcon, AlertTriangleIcon, CalendarClockIcon } from 'lucide-react';
export function Reports() {
  const [activeReport, setActiveReport] = useState('contract-deviation');
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FilterIcon size={16} className="mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <DownloadIcon size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-4 py-3 text-sm font-medium ${activeReport === 'contract-deviation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveReport('contract-deviation')}>
            Contract Deviation
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeReport === 'risk-analysis' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveReport('risk-analysis')}>
            Risk Analysis
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeReport === 'compliance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveReport('compliance')}>
            Compliance & Obligations
          </button>
        </div>
        <div className="p-4">
          {activeReport === 'contract-deviation' && <ContractDeviationReport />}
          {activeReport === 'risk-analysis' && <RiskAnalysisReport />}
          {activeReport === 'compliance' && <ComplianceReport />}
        </div>
      </div>
    </div>
}
function ContractDeviationReport() {
  return <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Region
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Regions</option>
            <option>Middle East</option>
            <option>Europe</option>
            <option>North America</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Project
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Projects</option>
            <option>Cairo Metro Line 3</option>
            <option>Dubai Airport T3</option>
            <option>Riyadh Metro</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Contract
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Contracts</option>
            <option>Siemens Electrical Systems</option>
            <option>Orascom Civil Works</option>
            <option>ABB Electrical Equipment</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Total Clauses Analyzed
            </h3>
            <FileTextIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">1,248</p>
          <p className="text-xs text-gray-500 mt-1">Across 12 contracts</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Deviation Rate
            </h3>
            <BarChart2Icon size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">23.4%</p>
          <p className="text-xs text-gray-500 mt-1">
            +2.1% from previous period
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              High Risk Deviations
            </h3>
            <AlertTriangleIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">87</p>
          <p className="text-xs text-gray-500 mt-1">7% of total clauses</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">
            Clause Deviation by Category
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clause Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Clauses
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deviations
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deviation %
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
            }].map((item, index) => <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.total}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.deviations}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.percent}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.risk === 'High' ? 'bg-red-100 text-red-800' : item.risk === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                      {item.risk}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
}
function RiskAnalysisReport() {
  return <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Region
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Regions</option>
            <option>Middle East</option>
            <option>Europe</option>
            <option>North America</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Project
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Projects</option>
            <option>Cairo Metro Line 3</option>
            <option>Dubai Airport T3</option>
            <option>Riyadh Metro</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Risk Level
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Levels</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              High Risk Items
            </h3>
            <AlertTriangleIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">87</p>
          <p className="text-xs text-gray-500 mt-1">
            -12% from previous period
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Medium Risk Items
            </h3>
            <AlertTriangleIcon size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs text-gray-500 mt-1">+5% from previous period</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Low Risk Items
            </h3>
            <AlertTriangleIcon size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">324</p>
          <p className="text-xs text-gray-500 mt-1">+2% from previous period</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Overall Risk Score
            </h3>
            <PieChartIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">5.2/10</p>
          <p className="text-xs text-gray-500 mt-1">Medium Risk Portfolio</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">
            Risk Distribution by Project
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  High Risk Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medium Risk Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[{
              project: 'Cairo Metro Line 3',
              value: '$120M',
              high: 32,
              medium: 56,
              score: 7.2
            }, {
              project: 'Dubai Airport T3',
              value: '$85M',
              high: 18,
              medium: 42,
              score: 5.8
            }, {
              project: 'Riyadh Metro',
              value: '$145M',
              high: 25,
              medium: 38,
              score: 6.4
            }, {
              project: 'Qatar Stadium',
              value: '$95M',
              high: 12,
              medium: 20,
              score: 4.1
            }].map((item, index) => <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.project}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.value}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.high}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.medium}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={`inline-block w-8 h-8 rounded-full ${item.score > 7 ? 'bg-red-500' : item.score > 5 ? 'bg-amber-500' : 'bg-green-500'} mr-2 flex items-center justify-center text-white text-xs font-medium`}>
                        {item.score}
                      </span>
                      <span className={`text-xs font-medium ${item.score > 7 ? 'text-red-800' : item.score > 5 ? 'text-amber-800' : 'text-green-800'}`}>
                        {item.score > 7 ? 'High' : item.score > 5 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
}
function ComplianceReport() {
  return <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Region
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Regions</option>
            <option>Middle East</option>
            <option>Europe</option>
            <option>North America</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Project
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Projects</option>
            <option>Cairo Metro Line 3</option>
            <option>Dubai Airport T3</option>
            <option>Riyadh Metro</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Next 30 Days</option>
            <option>Next 60 Days</option>
            <option>Next 90 Days</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Total Obligations
            </h3>
            <CalendarClockIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">248</p>
          <p className="text-xs text-gray-500 mt-1">
            Across 8 active contracts
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Completed</h3>
            <CalendarClockIcon size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs text-gray-500 mt-1">62.9% completion rate</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Pending</h3>
            <CalendarClockIcon size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">68</p>
          <p className="text-xs text-gray-500 mt-1">Due within 30 days</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Overdue</h3>
            <CalendarClockIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-xs text-gray-500 mt-1">9.7% overdue rate</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">
            Upcoming Obligations (Next 30 Days)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Obligation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
            }].map((item, index) => <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.obligation}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.contract}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.type === 'Payment' ? 'bg-blue-100 text-blue-800' : item.type === 'Delivery' ? 'bg-purple-100 text-purple-800' : item.type === 'Legal' ? 'bg-amber-100 text-amber-800' : item.type === 'Compliance' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : item.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {item.assigned}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
}