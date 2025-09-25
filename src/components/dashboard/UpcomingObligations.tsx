import React from 'react';
import { CalendarIcon } from 'lucide-react';
export function UpcomingObligations() {
  const obligations = [{
    id: 1,
    title: 'Payment Milestone 3',
    contract: 'Siemens Contract',
    dueDate: '2023-12-15',
    status: 'Upcoming',
    type: 'Payment'
  }, {
    id: 2,
    title: 'Delivery of Equipment',
    contract: 'ABB Contract',
    dueDate: '2023-12-10',
    status: 'Overdue',
    type: 'Delivery'
  }, {
    id: 3,
    title: 'Contract Extension',
    contract: 'Orascom Contract',
    dueDate: '2023-12-22',
    status: 'Upcoming',
    type: 'Legal'
  }, {
    id: 4,
    title: 'Quality Inspection',
    contract: 'Carrier Contract',
    dueDate: '2023-12-18',
    status: 'Upcoming',
    type: 'Compliance'
  }];
  const upcomingObligations = obligations.filter(o => o.status === 'Upcoming');
  const overdueObligations = obligations.filter(o => o.status === 'Overdue');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const ObligationItem = ({ obligation }) => (
    <div key={obligation.id} className={`p-3 rounded-lg border ${obligation.status === 'Overdue' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {obligation.title}
            </h3>
            <p className="text-xs text-gray-500">{obligation.contract}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${obligation.type === 'Payment' ? 'bg-blue-100 text-blue-800' : obligation.type === 'Delivery' ? 'bg-purple-100 text-purple-800' : obligation.type === 'Legal' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
            {obligation.type}
          </span>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <CalendarIcon size={14} className={obligation.status === 'Overdue' ? 'text-red-500 mr-1' : 'text-gray-400 mr-1'} />
          <span className={obligation.status === 'Overdue' ? 'text-red-500 font-medium' : 'text-gray-500'}>
            {formatDate(obligation.dueDate)}
            {obligation.status === 'Overdue' ? ' (Overdue)' : ''}
          </span>
        </div>
      </div>
  )

  return <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Overdue</h3>
        <div className="space-y-3">
          {overdueObligations.map(obligation => <ObligationItem key={obligation.id} obligation={obligation} />)}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming</h3>
        <div className="space-y-3">
          {upcomingObligations.map(obligation => <ObligationItem key={obligation.id} obligation={obligation} />)}
        </div>
      </div>
    </div>
}