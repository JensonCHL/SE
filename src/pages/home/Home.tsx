import React, { useState, useRef, useEffect } from "react";
import FullCalendar, { DateSelectArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from "moment";
import AddEvent from '../../components/addEvent';
import Quotes from '../../components/randomQuote';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin
import '../../index2.css'
// import '../../timeline.css'

import Lists from '../../components/Lists';
import timelinePlugin from '@fullcalendar/timeline';

interface CalendarProps { }

const Calendar: React.FC<CalendarProps> = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<number>(1);

    const onEventAdded = (event: any) => {
        console.log("Event to be added:", event);

        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent({
                title: event.title,
                start: moment(event.start).toISOString(),
                end: moment(event.end).toISOString(),
                extendedProps: {
                    description: event.desc,
                    location: event.location,
                    priority: event.timeType,
                    types: event.types,
                    color: event.color,
                },
                color: event.color,
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
                location: data.event.extendedProps.location,
                types: data.event.extendedProps.types,
                color: data.event.extendedProps.color,
            };
            console.log("Event data to be sent to backend:", eventData);
            await axios.post("http://localhost:5001/api/calendar/create-event", eventData);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    }

    async function handleDateSet(data: DateSelectArg) {
        try {
            const response = await axios.get(`http://localhost:5001/api/calendar/get-events?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`);
            // console.log("Fetched events:", response.data); // Log fetched events
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
        return (
            <div className="flex flex-col">
                <div>{eventContent.event.title}</div>
            </div>
        );
    };

    const [today, setToday] = useState(new Date());

    useEffect(() => {
        // Fetch initial events when the component mounts
        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            const currentDate = calendarApi.getDate();
            handleDateSet({ start: moment(currentDate).startOf('month').toDate(), end: moment(currentDate).endOf('month').toDate() });
        }
    }, []);

    return (
        <section className="flex flex-row m-3">
            <div className="w-3/4 bg-white p-2 rounded-2xl">
            <div className="flex flex-row m-4">
                <div className="w-3/4 mr-6">
                    <FullCalendar
                        ref={calendarRef}
                        events={events}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            right: 'next',
                            center: 'title',
                            left: 'prev'

                        }}
                        views={{
                            dayGridMonth: {
                                titleFormat: { month: 'long', year: 'numeric' },
                                columnHeaderFormat: { weekday: 'long' },
                                dayMaxEventRows: 3
                            },
                        }}
                        
                        eventTextColor="black"
                        initialView="dayGridMonth"
                        eventAdd={handleEventAdd}
                        datesSet={handleDateSet}
                        eventContent={renderEventContent}
                        aspectRatio={3}
                        dayCellClassNames={(arg) => {
                            if (arg.date.getDay() === 0) {
                              return 'fc-sunday';
                            }
                            return '';
                          }}
                        dayHeaderClassNames={(arg) => {
                            if (arg.dow === 0) { 
                              return 'fc-sunday-header';
                            }
                            return '';
                          }}
                    />
                    </div>

                    <div className="w-2/5">
                        <Lists />
                    </div>
            </div>
            <div className="mb-2 ml-2 mr-2">
            <FullCalendar
            plugins={[timelinePlugin]}
            initialView="timelineDay"
            headerToolbar={{
                left: 'title',
            }}
            scrollTime="00:01:00"
            events={events}
            height={330}
            eventAdd={handleEventAdd}
            datesSet={handleDateSet}
            eventContent={renderEventContent}
            eventTextColor="black"
            slotDuration='00:15:00'
             />
            </div>
            </div>

            <div style={{ position: 'relative', zIndex: 0 }} className="w-1/4">
                <div className="flex flex-col m-1 ml-6 w-30" >
                    <AddEvent onEventAdded={handleEventAdd} selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
                <div className="mt-8 ml-6">
                    <Quotes/>
                </div>
            </div>

        </section>
    );
}

export default Calendar;