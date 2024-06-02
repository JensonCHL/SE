import React, { useState, useRef } from "react";
import FullCalendar, { DateSelectArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from "moment";
import AddEvent from './addEvent';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin

const eventColorMap = {
    type1: '#FFBE0B', 
    type2: '#E6D7FB', 
    type3: '#FFCCE2'  
};

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
                description: data.event.extendedProps.description,
                priority: data.event.extendedProps.priority,
                location: data.event.extendedProps.location
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

    const renderEventContent = (eventContent: EventContentArg) => {
        const isStart = eventContent.isStart;
        const event = eventContent.event;
        const isFirstInstance = event.start.toISOString() === eventContent.view.activeStart.toISOString();
        
        return (
            
            <div className="flex flex-col">
                <div>{event.title}</div>
                
            </div>
        );
    };

    return (
        <section>
            <div style={{ position: 'relative', zIndex: 0 }}>
                <AddEvent onEventAdded={onEventAdded} />
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        right: 'next today',
                        center: 'title',
                        left: 'dayGridMonth,timeGridWeek prev'
                    }}
                    views={{
                        dayGridMonth: {
                            titleFormat: { month: 'long', year: 'numeric' },
                            columnHeaderFormat: { weekday: 'long' }
                        },
                        timeGridWeek: {
                            titleFormat: { month: 'long', year: 'numeric' },
                            slotLabelFormat: { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
                            columnHeaderFormat: { weekday: 'short', day: 'numeric' }
                        }                   
                    }}
                    
                    eventColor='#FFCCE2'
                    eventTextColor="black"
                    initialView="dayGridMonth"
                    eventAdd={handleEventAdd}
                    datesSet={handleDateSet}
                    eventContent={renderEventContent} // Use eventContent for custom rendering

                />
            </div>
        </section>
    );
}

export default Calendar;
