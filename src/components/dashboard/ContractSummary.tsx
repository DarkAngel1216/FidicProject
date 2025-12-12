import React, { useState, useMemo } from 'react';
import { FileTextIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

export function ContractSummary() {
  const contractsData = [{
    id: 'CTR-2023-001',
    name: 'Siemens Electrical Systems',
    project: 'Cairo Metro Line 3',
    status: 'Active',
    riskScore: 8,
    lastUpdated: '2 days ago',
    phase: 'Post-Activation'
  }, {
    id: 'CTR-2023-002',
    name: 'Orascom Civil Works',
    project: 'Cairo Metro Line 3',
    status: 'Draft',
    riskScore: 4,
    lastUpdated: '5 hours ago',
    phase: 'Pre-Activation'
  }, {
    id: 'CTR-2023-003',
    name: 'Carrier HVAC Systems',
    project: 'Dubai Airport T3',
    status: 'Active',
    riskScore: 2,
    lastUpdated: '1 week ago',
    phase: 'Post-Activation'
  }, {
    id: 'CTR-2023-004',
    name: 'ABB Electrical Equipment',
    project: 'Cairo Metro Line 3',
    status: 'Review',
    riskScore: 6,
    lastUpdated: '1 day ago',
    phase: 'Pre-Activation'
  }];

  const [sortConfig, setSortConfig] = useState({ key: 'lastUpdated', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const sortedContracts = useMemo(() => {
    const sortableItems = [...contractsData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [contractsData, sortConfig]);

  const paginatedContracts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedContracts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedContracts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedContracts.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          Active
        </span>;
      case 'Draft':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          Draft
        </span>;
      case 'Review':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          Review
        </span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {status}
        </span>;
    }
  };
  const getRiskBadge = (score: number) => {
    if (score <= 3) {
      return <span className="flex items-center text-green-600 dark:text-green-400">
        <CheckCircleIcon size={16} className="mr-1" /> Low
      </span>;
    }
    if (score <= 6) {
      return <span className="flex items-center text-amber-600 dark:text-amber-400">
        <ClockIcon size={16} className="mr-1" /> Medium
      </span>;
    }
    return <span className="flex items-center text-red-600 dark:text-red-400">
      <AlertCircleIcon size={16} className="mr-1" /> High
    </span>;
  };

  const SortableHeader = ({ children, name }) => {
    const isSorted = sortConfig.key === name;
    return (
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" onClick={() => requestSort(name)}>
        <div className="flex items-center">
          {children}
          {isSorted ? (
            sortConfig.direction === 'ascending' ? <ChevronUpIcon size={14} className="ml-1" /> : <ChevronDownIcon size={14} className="ml-1" />
          ) : null}
        </div>
      </th>
    )
  }

  return <div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <SortableHeader name="name">Contract</SortableHeader>
            <SortableHeader name="project">Project</SortableHeader>
            <SortableHeader name="status">Status</SortableHeader>
            <SortableHeader name="riskScore">Risk</SortableHeader>
            <SortableHeader name="phase">Phase</SortableHeader>
            <SortableHeader name="lastUpdated">Updated</SortableHeader>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {paginatedContracts.map(contract => <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center">
                <FileTextIcon size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {contract.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{contract.id}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {contract.project}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {getStatusBadge(contract.status)}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm">
              {getRiskBadge(contract.riskScore)}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {contract.phase}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {contract.lastUpdated}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between items-center mt-4">
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{paginatedContracts.length}</span> of <span className="font-medium">{contractsData.length}</span> results
        </p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
          Previous
        </button>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  </div>
}