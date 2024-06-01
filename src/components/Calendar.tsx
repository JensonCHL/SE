import React, { useState, useRef } from "react";
import FullCalendar, { DateSelectArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from "moment";
import AddEvent from './Addevent';
import timeGridPlugin from '@fullcalendar/timegrid';

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<any[]>([]);

    const onEventAdded = (event: any) => {
        console.log("Event to be added:", event);

        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent({
                title: event.title,
                start: moment(event.start).toISOString(),
                end: moment(event.end).toISOString(),
                description: event.desc,
                priority: event.timeType,
                location: event.location
            });
        }
    };
    
    async function handleEventAdd(data: { event: any }) {
        try {
            const eventData = {
                title: data.event.title,
                start: moment(data.event.start).toISOString(),
                end: moment(data.event.end).toISOString(),
                description: data.event.desc,
                priority: data.event.timeType,
                location: data.event.location
            };
            await axios.post("http://localhost:5001/api/calendar/create-event", eventData);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    }
    

    async function handleDateSet(data: DateSelectArg) {
        try {
            const response = await axios.get(`http://localhost:5001/api/calendar/get-events?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`);
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    return (
        <section>
            <div style={{ position: 'relative', zIndex: 0 }}>
                <AddEvent onEventAdded={onEventAdded} />
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
                            columnHeaderFormat: { weekday: 'short', day: 'numeric' }
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
// tesawdadadadadad
export default Calendar;
