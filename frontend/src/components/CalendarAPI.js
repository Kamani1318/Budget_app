import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={[
        {
          title: 'My event',
          start: new Date(),
          end: new Date(),
        },
      ]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
