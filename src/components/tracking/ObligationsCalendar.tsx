import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Payment Milestone 3',
    start: new Date(2023, 11, 15),
    end: new Date(2023, 11, 15),
  },
  {
    id: 2,
    title: 'Delivery of Equipment',
    start: new Date(2023, 11, 10),
    end: new Date(2023, 11, 10),
  },
  {
    id: 3,
    title: 'Contract Extension',
    start: new Date(2023, 11, 22),
    end: new Date(2023, 11, 22),
  },
];

export function ObligationsCalendar() {
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
