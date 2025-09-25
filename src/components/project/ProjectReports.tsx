import React, { useState } from 'react';
import { DownloadIcon, FileTextIcon, BarChart2Icon, CalendarClockIcon, AlertTriangleIcon, FilterIcon, PrinterIcon } from 'lucide-react';
interface ProjectReportsProps {
  projectId: string;
}
export function ProjectReports({
  projectId
}: ProjectReportsProps) {
  const [activeReport, setActiveReport] = useState('deviation');
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Project Reports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <PrinterIcon size={16} className="mr-2" />
            Print
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <DownloadIcon size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-4 py-3 text-sm font-medium ${activeReport === 'deviation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveReport('deviation')}>
            Deviation Report
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeReport === 'obligation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveReport('obligation')}>
            Obligation Report
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeReport === 'risk' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveReport('risk')}>
            Risk Report
          </button>
        </div>
        <div className="p-4">
          {activeReport === 'deviation' && <DeviationReport />}
          {activeReport === 'obligation' && <ObligationReport />}
          {activeReport === 'risk' && <RiskReport />}
        </div>
      </div>
    </div>
}
function DeviationReport() {
  return <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <div className="w-1/3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Contract
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Contracts</option>
            <option>ABB Electrical Equipment</option>
            <option>Siemens Electrical Systems</option>
          </select>
        </div>
        <div className="w-1/3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Clause Category
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Payment Terms</option>
            <option>Force Majeure</option>
            <option>Dispute Resolution</option>
          </select>
        </div>
        <div className="w-1/3">
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
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Total Clauses Analyzed
            </h3>
            <FileTextIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">256</p>
          <p className="text-xs text-gray-500 mt-1">Across 2 contracts</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Deviation Rate
            </h3>
            <BarChart2Icon size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">18.4%</p>
          <p className="text-xs text-gray-500 mt-1">47 deviated clauses</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              High Risk Deviations
            </h3>
            <AlertTriangleIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-xs text-gray-500 mt-1">4.7% of total clauses</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            Contract Deviation Summary
          </h3>
          <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
            <FilterIcon size={14} className="mr-1" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clause
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deviation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-red-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  ABB Electrical Equipment
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Timeline
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  8.4 - Extension of Time
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Limited extensions for climate conditions and epidemic delays
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Negotiated
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  ABB Electrical Equipment
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Financial
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  14.7 - Payment
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Extended payment terms (90 days vs. 56 days)
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    Medium
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Accepted
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Legal
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  17.6 - Limitation of Liability
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Unlimited liability for contractor
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Rejected
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">
            Deviation by Category
          </h3>
        </div>
        <div className="p-4">
          <div className="h-60 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-500">
              Deviation chart by category would appear here
            </p>
          </div>
        </div>
      </div>
    </div>
}
function ObligationReport() {
  return <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Contract
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Contracts</option>
            <option>ABB Electrical Equipment</option>
            <option>Siemens Electrical Systems</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Types</option>
            <option>Payment</option>
            <option>Delivery</option>
            <option>Testing</option>
            <option>Legal</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Upcoming</option>
            <option>Overdue</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Time</option>
            <option>Last 3 Months</option>
            <option>Next 3 Months</option>
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
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-xs text-gray-500 mt-1">Across 2 contracts</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Completed</h3>
            <CalendarClockIcon size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">18</p>
          <p className="text-xs text-gray-500 mt-1">75% completion rate</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Upcoming</h3>
            <CalendarClockIcon size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">4</p>
          <p className="text-xs text-gray-500 mt-1">Due within 30 days</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Overdue</h3>
            <CalendarClockIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">2</p>
          <p className="text-xs text-gray-500 mt-1">8.3% overdue rate</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">
            Obligation Status Summary
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
              <tr className="bg-red-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Delivery of Equipment
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  ABB Electrical Equipment
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    Delivery
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Dec 10, 2023
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    Overdue
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Contractor
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Payment Milestone 3
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    Payment
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Dec 15, 2023
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    Upcoming
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Finance Dept
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Performance Test
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Testing
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Dec 5, 2023
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Technical Team
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">
              Obligation Timeline
            </h3>
          </div>
          <div className="p-4">
            <div className="h-60 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Obligation timeline chart would appear here
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">
              Obligation by Type
            </h3>
          </div>
          <div className="p-4">
            <div className="h-60 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Obligation type chart would appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
}
function RiskReport() {
  return <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <div className="w-1/3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Contract
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Contracts</option>
            <option>ABB Electrical Equipment</option>
            <option>Siemens Electrical Systems</option>
          </select>
        </div>
        <div className="w-1/3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Risk Category
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Financial</option>
            <option>Technical</option>
            <option>Legal</option>
            <option>Operational</option>
          </select>
        </div>
        <div className="w-1/3">
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
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Overall Risk Score
            </h3>
            <BarChart2Icon size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">Medium (5.4)</p>
          <p className="text-xs text-gray-500 mt-1">
            Decreased from 6.2 last month
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Risk Distribution
            </h3>
            <AlertTriangleIcon size={18} className="text-blue-600" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 flex-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-500" style={{
              width: '20%'
            }}></div>
            </div>
            <span className="text-xs font-medium text-gray-700">20%</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="h-4 flex-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{
              width: '47%'
            }}></div>
            </div>
            <span className="text-xs font-medium text-gray-700">47%</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="h-4 flex-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{
              width: '33%'
            }}></div>
            </div>
            <span className="text-xs font-medium text-gray-700">33%</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Mitigation Progress
            </h3>
            <AlertTriangleIcon size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">65%</p>
          <p className="text-xs text-gray-500 mt-1">
            10 of 15 risks have active mitigation
          </p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">
            Risk Register Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mitigation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-red-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Payment Milestone Delay
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Financial
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Cash flow issues, potential project delays
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-amber-500 rounded-full" style={{
                      width: '50%'
                    }}></div>
                    </div>
                    <span className="text-xs">50%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Material Quality Issues
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  ABB Electrical Equipment
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Technical
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    Medium
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Potential system failures, rework costs
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-green-500 rounded-full" style={{
                      width: '75%'
                    }}></div>
                    </div>
                    <span className="text-xs">75%</span>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Regulatory Approval Delay
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Legal
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Project timeline delays, additional costs
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-green-500 rounded-full" style={{
                      width: '80%'
                    }}></div>
                    </div>
                    <span className="text-xs">80%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">
              Risk Trends (6 Months)
            </h3>
          </div>
          <div className="p-4">
            <div className="h-60 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Risk trend chart would appear here
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">
              Risk by Category
            </h3>
          </div>
          <div className="p-4">
            <div className="h-60 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Risk category chart would appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
}