import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                setEvents(response.data); // Assuming API returns an array of Event objects
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array means fetchEvents() runs only once on component mount

    console.log(events)

    return (
        <div>
            <h2>Event List</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <div>Title: {event.title}</div>
                        <div>Date: {event.date}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
