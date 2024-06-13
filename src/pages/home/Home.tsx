import React, { useState, useRef, useEffect } from "react";
import FullCalendar, { DateSelectArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from "moment";
import AddEvent, { EventData } from '../../components/addEvent'; // Assuming EventData type is defined in addEvent component
import Quotes from '../../components/randomQuote';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin
import '../../index2.css'; // Import custom styles

import Lists from '../../components/Lists';
import timelinePlugin from '@fullcalendar/timeline';
import { useNavigate } from "react-router-dom";

interface CalendarProps { }

const Calendar: React.FC<CalendarProps> = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<number>(1);
    const userID = localStorage.getItem('user');

    // Function to handle adding an event locally
    const onEventAdded = (event: EventData) => {
        try {
            // Add event to local calendar display
            if (calendarRef.current) {
                let calendarApi = calendarRef.current.getApi();
                calendarApi.addEvent({
                    title: event.title,
                    start: event.start,
                    end: event.end,
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
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    // Function to handle adding an event and sending it to backend
    async function handleEventAdd(data: EventData) {
        try {
            if (!data || !data.title || !data.start || !data.end) {
                throw new Error("Invalid event data. Missing required properties.");
            }
            const eventData = {
                title: data.title,
                start: moment(data.start).toISOString(),
                end: moment(data.end).toISOString(),
                description: data.desc,
                priority: data.timeType,
                location: data.location,
                types: data.types,
                color: data.color,
            };
            console.log("Event data to be sent to backend:", eventData);
            await axios.post("http://localhost:5001/api/calendar/create-event", eventData);

            // Update local events state to reflect the newly added event
            setEvents(prevEvents => [...prevEvents, eventData]);

        } catch (error) {
            console.error("Error adding event:", error);
        }
    }

    // Function to handle fetching events from backend based on date range
    async function handleDateSet(data: DateSelectArg) {
        try {
            const response = await axios.get(`http://localhost:5001/api/calendar/get-events?start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`);
            console.log("Fetched events:", response.data);
            const eventsWithColors = response.data.map((event: any) => ({
                ...event,
                color: event.color
            }));
            setEvents(eventsWithColors);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    // Function to render event content in FullCalendar
    const renderEventContent = (eventContent: EventContentArg) => {
        return (
            <div className="flex flex-col">
                <div>{eventContent.event.title}</div>
            </div>
        );
    };

    // Initial state for today's date
    const [today, setToday] = useState(new Date());
    const navigate = useNavigate()
    // Effect to fetch initial events when component mounts
    useEffect(() => {

        if (!localStorage.getItem('user')){
            navigate("/login")
        }

        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            const currentDate = calendarApi.getDate();
            // Fetch events for the current month initially
            handleDateSet({ start: moment(currentDate).startOf('month').toDate(), end: moment(currentDate).endOf('month').toDate() });
        }
    }, []);

    

        return (
            <section className="flex m-3 md:flex-row h-full overflow-hidden">
                <div className="flex flex-col w-3/4 bg-white p-2 rounded-2xl h-[50%]
                            ">
                    <div className="flex flex-col md:flex-row m-4 justify-between">
                        <div className="w-[55%]">
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
                <div style={{ position: 'relative', zIndex: 0 }} className="w-[23%] flex flex-col m-auto gap-4 h-auto">
                    <div className="flex flex-col  w-auto h-full" >
                        {/* Pass handleEventAdd function to AddEvent component */}
                        <AddEvent onEventAdded={handleEventAdd} selectedType={selectedType} setSelectedType={setSelectedType} />
                    </div>
                    <div className="h-full">
                        <Quotes />
                    </div>
                </div>
            </section>
        );
    }

    export default Calendar;
