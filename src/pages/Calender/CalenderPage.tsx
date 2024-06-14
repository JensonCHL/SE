import React, { useState, useRef, useEffect } from "react";
import FullCalendar, { DateSelectArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import moment from "moment";
import AddEvent from '../../components/addEvent';
import Recomendation from '../../components/Recomendation';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarProps { }

const CalendarPage: React.FC<CalendarProps> = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<number>(1);
    const userId = localStorage.getItem('user');

    const handleEventAdd = async (data: any ) => {
        console.log("Received data:", data); // Debugging line
        try {
            const eventData = {
                start: moment(data.start).toISOString(),
                user_id: userId,
                title: data.title,
                end: moment(data.end).toISOString(),
                description: data.desc,
                priority: data.priority,
                location: data.location,
                types: data.types,
                color: data.color,
                reminder: data.reminder,
                repeat: data.repeat
            };
            console.log("Event data to be sent to backend:", eventData);
            await axios.post("http://localhost:5001/api/calendar/create-event", eventData);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const handleDateSet = async (data: DateSelectArg) => {
        try {
            if (userId) {
                const response = await axios.get(
                    `http://localhost:5001/api/calendar/get-events?id=${userId}&start=${moment(data.start).toISOString()}&end=${moment(data.end).toISOString()}`
                );
                console.log(userId)
                console.log(response)
                const eventsWithColors = response.data.map((event: any) => ({
                    ...event,
                    color: event.color
                }));
                setEvents(eventsWithColors);
                console.log(eventsWithColors)
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const renderEventContent = (eventContent: EventContentArg) => {
        return (
            <div className="flex flex-col">
                <div>{eventContent.event.title}</div>
            </div>
        );
    };

    useEffect(() => {
        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            const currentDate = calendarApi.getDate();
            handleDateSet({start: moment(currentDate).startOf('month').toDate(), end: moment(currentDate).endOf('month').toDate() });
        }
    }, []);

    return (
        <section className="overflow-hidden">
            <div style={{ position: 'relative', zIndex: 0 }} className="flex">
                <div className="flex flex-col m-4 gap-y-4 w-30" >
                    <Recomendation />
                    <AddEvent onEventAdded={handleEventAdd} selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
                <div className="w-9/12 bg-white m-4 pt-4 pb-6 pr-6 pl-6 rounded-lg">
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
                        eventContent={renderEventContent}
                        aspectRatio={2}
                        dayCellClassNames={(arg) => {
                            if (arg.date.getDay() === 0) { // 0 is Sunday
                                return 'fc-sunday';
                            }
                            return '';
                        }}
                        dayHeaderClassNames={(arg) => {
                            if (arg.dow === 0) { // 0 is Sunday
                                return 'fc-sunday-header';
                            }
                            return '';
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default CalendarPage;
