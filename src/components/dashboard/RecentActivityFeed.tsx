import React from 'react';
import { FileTextIcon, UserIcon, MessageSquareIcon } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'contract',
    user: 'John Doe',
    action: 'uploaded a new contract',
    target: 'Siemens Contract',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'approval',
    user: 'Jane Smith',
    action: 'approved the draft for',
    target: 'Cairo Metro Line 3',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'comment',
    user: 'Peter Jones',
    action: 'commented on',
    target: 'Clause 14.7',
    time: '1 day ago',
  },
];

const ActivityIcon = ({ type }) => {
  switch (type) {
    case 'contract':
      return <FileTextIcon size={16} className="text-blue-600" />;
    case 'approval':
      return <UserIcon size={16} className="text-green-600" />;
    case 'comment':
      return <MessageSquareIcon size={16} className="text-purple-600" />;
    default:
      return <FileTextIcon size={16} className="text-gray-600" />;
  }
};

export function RecentActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-start">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <ActivityIcon type={activity.type} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-800">
              <span className="font-medium">{activity.user}</span> {activity.action}{' '}
              <span className="font-medium text-blue-600">{activity.target}</span>
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
