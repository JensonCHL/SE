import React, { useState, useRef } from "react";
import FullCalendar, { DateSelectArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from "moment";
import AddEvent from './addEvent';
import timeGridPlugin from '@fullcalendar/timegrid'
// import dayGridPlugin from '@fullcalendar/daygrid'


interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<any[]>([]);

    const onEventAdded = (event: any) => {
        console.log("Event to be added:", event);
        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent({
                start: moment(event.start).toDate(),
                end: moment(event.end).toDate(),
                title: event.title,
                description: event.desc,
                timeType: event.timeType,
                location: event.location
            });
        }
    };
    
    async function handleEventAdd(data: { event: any }) {
        try {
            await axios.post("api/calendar/create-event", data.event);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    }

    async function handleDateSet(data: DateSelectArg) {
        try {
            const response = await axios.get(`api/calendar/get-events?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`);
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    return (
        <section>
            <div style={{ position: 'relative', zIndex: 0 }} >
            <AddEvent 
                onEventAdded={event => onEventAdded(event)}
            />
            <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin, timeGridPlugin]}
                headerToolbar={{
                right: 'next today',
                center: 'title',
                left: 'dayGridMonth,timeGridWeek prev'
                }}
                views={{
                    dayGridMonth: {
                        titleFormat: { month: 'long', year: 'numeric' }
                    },
                    timeGridWeek: {
                        titleFormat: { month: 'long', year: 'numeric' },
                        slotLabelFormat: { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
                        columnHeaderFormat: { weekday: 'short', day: 'numeric' } // Adjusted to include day if necessary
                    }                   
                }}
                initialView="dayGridMonth"
                eventAdd={handleEventAdd}
                datesSet={handleDateSet}
                />
                </div>
        </section>
    );
}

export default Calendar;
