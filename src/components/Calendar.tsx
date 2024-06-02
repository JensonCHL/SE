import React, { useState, useRef, useEffect } from "react";
import FullCalendar, { DateSelectArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from "moment";
import AddEvent from './addEvent';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin

const defaultColor = '#D3D3D3';  // Default color (grey)
const addColor = '#E6D7FB';

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
                location: event.location,
                color: event.color || defaultColor
            });
        }
    };
    
    async function handleEventAdd(data: { event: any }) {
        try {
            const color = addColor; // Use the provided color or default color

            const eventData = {
                title: data.event.title,
                start: moment(data.event.start).toISOString(),
                end: moment(data.event.end).toISOString(),
                description: data.event.extendedProps.description,
                priority: data.event.extendedProps.priority,
                location: data.event.extendedProps.location,
                color: color
            };
            await axios.post("http://localhost:5001/api/calendar/create-event", eventData);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    }
    
    async function handleDateSet(data: DateSelectArg) {
        try {
            const response = await axios.get(`http://localhost:5001/api/calendar/get-events?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`);
            console.log("Fetched events:", response.data); // Log fetched events
            const eventsWithColors = response.data.map((event: any) => ({
                ...event,
                color: event.color
            }));
            setEvents(eventsWithColors);
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

    useEffect(() => {
        // Fetch initial events when the component mounts
        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            const currentDate = calendarApi.getDate();
            handleDateSet({ start: moment(currentDate).startOf('month').toDate(), end: moment(currentDate).endOf('month').toDate() });
        }
    }, []);

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
                            columnHeaderFormat: { weekday: 'long' },
                            dayMaxEventRows: 3
                        },
                        timeGridWeek: {
                            titleFormat: { month: 'long', year: 'numeric' },
                            slotLabelFormat: { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
                            columnHeaderFormat: { weekday: 'short', day: 'numeric' }
                        }                   
                    }}
                    
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
