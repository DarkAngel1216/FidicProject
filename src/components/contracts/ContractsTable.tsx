import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { FileTextIcon, AlertTriangleIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';

const contracts = [
  {
    id: 1,
    name: 'Siemens Electrical Systems',
    project: 'Cairo Metro Line 3',
    status: 'Active',
    risk: 'High',
    value: '$28.5M',
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    name: 'ABB Electrical Equipment',
    project: 'Cairo Metro Line 3',
    status: 'Review',
    risk: 'Medium',
    value: '$16.5M',
    lastUpdated: '1 day ago',
  },
  {
    id: 3,
    name: 'Orascom Civil Works',
    project: 'Cairo Metro Line 3',
    status: 'Draft',
    risk: 'Medium',
    value: '$75M',
    lastUpdated: '5 hours ago',
  },
  {
    id: 4,
    name: 'Carrier HVAC Systems',
    project: 'Dubai Airport T3',
    status: 'Active',
    risk: 'Low',
    value: '$12M',
    lastUpdated: '1 month ago',
  },
];

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Active':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>;
    case 'Review':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Review</span>;
    case 'Draft':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Draft</span>;
    default:
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
  }
};

const RiskBadge = ({ risk }) => {
  switch (risk) {
    case 'High':
      return <span className="flex items-center text-red-600"><AlertTriangleIcon size={14} className="mr-1" /> High</span>;
    case 'Medium':
      return <span className="flex items-center text-amber-600"><ClockIcon size={14} className="mr-1" /> Medium</span>;
    case 'Low':
      return <span className="flex items-center text-green-600"><CheckCircleIcon size={14} className="mr-1" /> Low</span>;
    default:
      return <span className="flex items-center text-gray-600"><ClockIcon size={14} className="mr-1" /> {risk}</span>;
  }
};

export function ContractsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contract</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map(contract => (
          <TableRow key={contract.id}>
            <TableCell>
              <div className="flex items-center">
                <FileTextIcon size={16} className="text-blue-600 mr-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{contract.name}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{contract.project}</TableCell>
            <TableCell><StatusBadge status={contract.status} /></TableCell>
            <TableCell><RiskBadge risk={contract.risk} /></TableCell>
            <TableCell>{contract.value}</TableCell>
            <TableCell>{contract.lastUpdated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
