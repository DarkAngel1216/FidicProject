import React, { useState, useEffect } from 'react';
import { CalendarIcon, CheckIcon, ClockIcon, AlertTriangleIcon, FileTextIcon, MessageSquareTextIcon, CheckSquareIcon, BarChart2Icon } from 'lucide-react';

interface ProjectPostActivationProps {
  projectId: string;
  subPhase?: string;
  setCurrentPhase?: (phase: string) => void;
}

export function ProjectPostActivation({
  projectId,
  subPhase,
  setCurrentPhase
}: ProjectPostActivationProps) {
  const activeTab = subPhase || 'obligation-tracker';

  const handleTabClick = (tabId: string) => {
    if (setCurrentPhase) {
      setCurrentPhase(`post-activation/${tabId}`);
    }
  };

  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Post-Activation</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Generate Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Item
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'obligation-tracker' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('obligation-tracker')}>
            Obligation Tracker
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'disputes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('disputes')}>
            Dispute Manager
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'compliance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('compliance')}>
            Compliance Checklists
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'risk-monitoring' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('risk-monitoring')}>
            Risk Monitoring
          </button>
        </div>
        <div className="p-4">
          {activeTab === 'obligation-tracker' && <ObligationTracker />}
          {activeTab === 'disputes' && <DisputeManager />}
          {activeTab === 'compliance' && <ComplianceChecklists />}
          {activeTab === 'risk-monitoring' && <RiskMonitoring />}
        </div>
      </div>
    </div>
}
function ObligationTracker() {
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
            <option>Upcoming</option>
            <option>Overdue</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Next 30 Days</option>
            <option>Next 90 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Total Obligations
            </h3>
            <FileTextIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-xs text-gray-500 mt-1">
            Across 2 active contracts
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Completed</h3>
            <CheckIcon size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">18</p>
          <p className="text-xs text-gray-500 mt-1">75% completion rate</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Upcoming</h3>
            <ClockIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">4</p>
          <p className="text-xs text-gray-500 mt-1">Due within 30 days</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Overdue</h3>
            <AlertTriangleIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2</p>
          <p className="text-xs text-gray-500 mt-1">8.3% overdue rate</p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-800">
          Upcoming & Overdue Obligations
        </h3>
        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-red-100">
                <AlertTriangleIcon size={14} className="text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Delivery of Equipment
                </h3>
                <p className="text-xs text-gray-500">
                  ABB Contract • Cairo Metro Line 3
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Delivery of transformers and switchgear to site.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                Delivery
              </span>
              <div className="mt-2 flex items-center text-xs text-red-600 font-medium">
                <CalendarIcon size={14} className="mr-1" />
                <span>Dec 10, 2023 (5 days overdue)</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">Clause: 3.1.2</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-red-200 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                Mark Complete
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Request Extension
              </button>
            </div>
            <button className="text-xs text-blue-600 font-medium">
              View Details
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100">
                <ClockIcon size={14} className="text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Payment Milestone 3
                </h3>
                <p className="text-xs text-gray-500">
                  Siemens Contract • Cairo Metro Line 3
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Payment of 25% of contract value upon completion of electrical
                  system installation.
                </p>
                <p className="mt-1 text-xs font-medium text-gray-800">
                  Amount: $2,500,000
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Payment
              </span>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                <span>Dec 15, 2023 (Due in 5 days)</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">Clause: 4.2.3</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                Mark Complete
              </button>
              <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                Add Note
              </button>
            </div>
            <button className="text-xs text-blue-600 font-medium">
              View Details
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100">
                <ClockIcon size={14} className="text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Quality Inspection
                </h3>
                <p className="text-xs text-gray-500">
                  ABB Contract • Cairo Metro Line 3
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Final inspection of electrical equipment installation by
                  third-party inspector.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Compliance
              </span>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                <span>Dec 18, 2023 (Due in 8 days)</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">Clause: 7.3</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                Mark Complete
              </button>
              <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                Add Note
              </button>
            </div>
            <button className="text-xs text-blue-600 font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button className="text-sm text-blue-600 font-medium">
          View Calendar View
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Export Obligations
        </button>
      </div>
    </div>
}
function DisputeManager() {
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Dispute Management
        </h3>
        <p className="text-xs text-blue-700">
          Track and manage contract disputes, generate response drafts, and
          monitor resolution progress.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-800">Active Disputes</h3>
        <button className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">
          Add New Dispute
        </button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispute
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Raised
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clause Ref
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <MessageSquareTextIcon size={16} className="text-purple-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Delivery Delay Claim
                      </div>
                      <div className="text-xs text-gray-500">DSP-2023-001</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    Time Extension
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    In Progress
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Dec 05, 2023
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  8.4, 20.1
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-xs text-blue-600 font-medium">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-800">
            Dispute Details: Delivery Delay Claim
          </h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
            In Progress
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2">
            <div className="border border-gray-200 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Claim Description
              </h4>
              <p className="text-xs text-gray-600">
                Contractor has submitted a claim for a 30-day extension of time
                due to delays in material shipment caused by port congestion.
                The claim cites Clause 8.4(d) regarding "Unforeseeable
                shortages" and Clause 20.1 for the claim procedure.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                AI-Generated Response Draft
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Based on the contract terms and the evidence provided, the
                following response is recommended:
              </p>
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                <p>Dear [Contractor Representative],</p>
                <br />
                <p>
                  We acknowledge receipt of your Extension of Time claim dated
                  December 5, 2023 regarding delays in material shipment.
                </p>
                <br />
                <p>
                  After careful review of the documentation provided and in
                  accordance with Clause 8.4(d) of the Contract, we can confirm
                  that:
                </p>
                <br />
                <p>
                  1. The port congestion situation does qualify as an
                  "Unforeseeable shortage" as defined in the Contract.
                </p>
                <p>
                  2. However, as per the negotiated terms in Clause 8.4(d), such
                  shortages are limited to a maximum extension of 30 days.
                </p>
                <p>
                  3. Based on the evidence provided, we are prepared to grant a
                  20-day extension, as the actual delay attributable to this
                  cause has been determined to be 20 days.
                </p>
                <br />
                <p>
                  Please note that this extension does not include any
                  additional costs, which would need to be claimed separately
                  under Clause 20.1.
                </p>
                <br />
                <p>Sincerely,</p>
                <p>[Employer Representative]</p>
              </div>
              <div className="flex justify-end mt-2">
                <button className="text-xs text-blue-600 font-medium">
                  Edit Draft
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1 space-y-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Dispute Timeline
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <MessageSquareTextIcon size={12} />
                      </div>
                      <p className="ml-2 text-xs font-medium text-gray-900">
                        Claim Received
                      </p>
                    </div>
                    <p className="mt-0.5 ml-8 text-xs text-gray-500">
                      Dec 5, 2023
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FileTextIcon size={12} />
                      </div>
                      <p className="ml-2 text-xs font-medium text-gray-900">
                        Response Drafted
                      </p>
                    </div>
                    <p className="mt-0.5 ml-8 text-xs text-gray-500">
                      Dec 7, 2023
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <CheckIcon size={12} />
                      </div>
                      <p className="ml-2 text-xs font-medium text-gray-400">
                        Response Sent
                      </p>
                    </div>
                    <p className="mt-0.5 ml-8 text-xs text-gray-400">Pending</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <CheckIcon size={12} />
                      </div>
                      <p className="ml-2 text-xs font-medium text-gray-400">
                        Resolution
                      </p>
                    </div>
                    <p className="mt-0.5 ml-8 text-xs text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Contract Clauses
              </h4>
              <div className="space-y-2">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs font-medium text-gray-800">
                    Clause 8.4(d)
                  </p>
                  <p className="text-xs text-gray-600">
                    Unforeseeable shortages in the availability of personnel or
                    Goods caused by epidemic or governmental actions (limited to
                    30 days maximum extension)
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs font-medium text-gray-800">
                    Clause 20.1
                  </p>
                  <p className="text-xs text-gray-600">
                    Contractor's Claims procedure and notice requirements
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Actions
              </h4>
              <div className="space-y-2">
                <button className="w-full px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100">
                  Send Response
                </button>
                <button className="w-full px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                  Request More Information
                </button>
                <button className="w-full px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}
function ComplianceChecklists() {
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Compliance Checklists
        </h3>
        <p className="text-xs text-blue-700">
          Track compliance requirements extracted from contracts and ensure all
          deliverables are properly documented.
        </p>
      </div>
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
            Category
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Health & Safety</option>
            <option>Quality Assurance</option>
            <option>Environmental</option>
            <option>Regulatory</option>
          </select>
        </div>
        <div className="w-1/3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Statuses</option>
            <option>Compliant</option>
            <option>Non-Compliant</option>
            <option>Pending Review</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-800">
            Health & Safety Compliance
          </h3>
          <div className="flex items-center">
            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <span className="text-xs font-medium text-green-600">
              80% Complete
            </span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requirement
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clause Ref
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Site Safety Plan
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    Siemens Electrical Systems
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    4.8, 6.7
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Compliant
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    Nov 15, 2023
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button className="text-xs text-blue-600 font-medium">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Safety Training Records
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    ABB Electrical Equipment
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    6.9
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Compliant
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    Nov 28, 2023
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button className="text-xs text-blue-600 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-700">Overall Compliance: 75%</p>
          <p className="text-xs text-gray-500">
            12 of 16 requirements compliant
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Generate Compliance Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Compliance Item
          </button>
        </div>
      </div>
    </div>;
}
function RiskMonitoring() {
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Risk Monitoring
        </h3>
        <p className="text-xs text-blue-700">
          Monitor ongoing contract risks, track mitigation actions, and receive
          alerts for emerging issues.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Overall Risk Level
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
              Active Risk Items
            </h3>
            <AlertTriangleIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>3 High</span>
            <span>7 Medium</span>
            <span>5 Low</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Mitigation Progress
            </h3>
            <CheckSquareIcon size={18} className="text-green-600" />
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="h-full bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-xs font-medium text-gray-700">65%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            10 of 15 risks have active mitigation
          </p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            Active Risk Register
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
              Filter
            </button>
            <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100">
              Add Risk
            </button>
          </div>
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
                  Owner
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <span className="text-xs">50%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Finance Dept
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-xs text-blue-600 font-medium">
                    View
                  </button>
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
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs">75%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  QA Team
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-xs text-blue-600 font-medium">
                    View
                  </button>
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
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs">80%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Legal Dept
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-xs text-blue-600 font-medium">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Risk Trends
          </h3>
          <div className="h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-500">
              Risk trend chart would appear here
            </p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-gray-500">Last Month</p>
              <p className="font-medium text-red-600">High (6.2)</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-gray-500">Current</p>
              <p className="font-medium text-amber-600">Medium (5.4)</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-gray-500">Forecast</p>
              <p className="font-medium text-amber-600">Medium (5.0)</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Risk Mitigation Actions
          </h3>
          <div className="space-y-3">
            <div className="flex items-start p-2 bg-gray-50 rounded-lg">
              <CheckSquareIcon size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Weekly quality inspections implemented
                </p>
                <p className="text-xs text-gray-500">
                  For: Material Quality Issues
                </p>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500">
                    Completed on: Dec 5, 2023
                  </span>
                  <span className="text-green-600">Effective</span>
                </div>
              </div>
            </div>
            <div className="flex items-start p-2 bg-gray-50 rounded-lg">
              <ClockIcon size={16} className="text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Expedite regulatory approval process
                </p>
                <p className="text-xs text-gray-500">
                  For: Regulatory Approval Delay
                </p>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500">
                    In progress: 80% complete
                  </span>
                  <span className="text-amber-600">Monitoring</span>
                </div>
              </div>
            </div>
            <div className="flex items-start p-2 bg-gray-50 rounded-lg">
              <AlertTriangleIcon size={16} className="text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Renegotiate payment schedule
                </p>
                <p className="text-xs text-gray-500">
                  For: Payment Milestone Delay
                </p>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500">
                    In progress: 50% complete
                  </span>
                  <span className="text-red-600">Urgent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}
