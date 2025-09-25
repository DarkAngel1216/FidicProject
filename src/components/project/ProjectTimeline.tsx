import React from 'react';
import { CheckCircleIcon, ClockIcon, FileTextIcon } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    title: 'Contract Drafting Started',
    date: '2023-01-15',
    status: 'completed',
    icon: <FileTextIcon size={16} />,
  },
  {
    id: 2,
    title: 'Draft Approval Completed',
    date: '2023-02-28',
    status: 'completed',
    icon: <CheckCircleIcon size={16} />,
  },
  {
    id: 3,
    title: 'Contract Comparison Completed',
    date: '2023-03-10',
    status: 'completed',
    icon: <CheckCircleIcon size={16} />,
  },
  {
    id: 4,
    title: 'Project Activation',
    date: '2023-03-15',
    status: 'active',
    icon: <ClockIcon size={16} />,
  },
  {
    id: 5,
    title: 'First Milestone Payment',
    date: '2023-04-30',
    status: 'pending',
    icon: <ClockIcon size={16} />,
  },
];

export function ProjectTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
      <div className="space-y-8">
        {timelineEvents.map(event => (
          <div key={event.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${event.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : event.status === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
              {event.icon}
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-800">{event.title}</h4>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
