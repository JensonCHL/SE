import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const Event = () => {
    const [users, setUsers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '', // Updated to match backend field
        start: null,
        end: null,
        location: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const userId = localStorage.getItem('user')

    // Fetch users from API on component mount
    useEffect(() => {
        axios.get(`http://localhost:5001/api/calendar/get-users?user_id=${userId}`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [userId]); // Fetch users whenever userId changes

    // Filter and format ongoing events
    const onGoingEvent = users
        .filter((user) => user.types === "event")
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"),
            date: moment(user.start).add(7, "hours").format("YYYY-MM-DD"),
            end: moment(user.end).add(7, "hours").format("HH:mm"),
        }));

    // Modal open and close functions
    const openModal = (event: any) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            description: event.description, // Updated to match backend field
            start: moment(event.start).toDate(), // Convert to JavaScript Date object
            end: moment(event.end).toDate(), // Convert to JavaScript Date object
            location: event.location,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setFormData({
            title: '',
            description: '', // Updated to match backend field
            start: '',
            end: '',
            location: '',
        });
        setModalOpen(false);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value.toDate(), // Convert moment object to Date
        });
    };
    

    // Handle form submission to update event
    const handleUpdateEvent = async (e) => {
        e.preventDefault();

        // Check if any form field is empty or unchanged
        if (
            formData.title === '' ||
            formData.start === '' ||
            formData.end === '' ||
            formData.description ==='' || // Updated to match backend field
            formData.location === ''
        ) {
            console.error('Please fill out all required fields.');
            return;
        }

        // Check if form data is unchanged
        if (
            selectedEvent.title === formData.title &&
            selectedEvent.description === formData.description && // Updated to match backend field
            moment(selectedEvent.start).toISOString() === moment(formData.start).toISOString() &&
            moment(selectedEvent.end).toISOString() === moment(formData.end).toISOString() &&
            selectedEvent.location === formData.location
        ) {
            console.log('No changes detected.');
            closeModal();
            return;
        }

        try {
            const updatedEvent = {
                ...selectedEvent,
                title: formData.title,
                description: formData.description, // Updated to match backend field
                start: moment(formData.start).toISOString(),
                end: moment(formData.end).toISOString(),
                location: formData.location,
            };
            await axios.put(`http://localhost:5001/api/calendar/update-event/${selectedEvent._id}`, updatedEvent);
            // Update the event in the state or refetch events
            const updatedUsers = users.map(user => user._id === selectedEvent._id ? updatedEvent : user);
            setUsers(updatedUsers);
            closeModal(); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    // Handle checkbox change to delete event
    const handleCheckboxChange = async (userId) => {
        try {
            await axios.delete(`http://localhost:5001/api/calendar/delete-user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="flex flex-col w-[30%] h-full rounded-b-full">
            {/* Header Event container */}
            <div className="flex items-center justify-center bg-[#E6D7FE] rounded-t-[20px]">
                <span className="items-center m-4 text-lg font-bold text-[#8338EC]">Event</span>
            </div>
            {/* Event list */}
            <div className="flex flex-col gap-3 px-4 py-4 bg-[#E6D7FE] w-full h-[75%]  rounded-b-[10px] bg-opacity-45 overflow-y-scroll">
                {onGoingEvent.length === 0 ? (
                    <div>No ongoing events</div>
                ) : (
                    onGoingEvent.map((event, index) => (
                        <li key={event._id} className="list-none flex flex-row justify-between items-center">
                            <div>
                                <div className='text-bold text-medium'>{event.title}</div>
                                <div className='text-normal text-xs'>Start: {event.start}, {event.date}</div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <input className='cursor-pointer'  type="button" value="Detail" onClick={() => openModal(event)} />
                                
                                <label>
                                    <input type="checkbox" name="todo" value={event._id}
                                        onChange={() => handleCheckboxChange(event._id)} />
                                </label>
                            </div>
                        </li>
                    ))
                )}
            </div>

            {/* Modal for updating event */}
            {selectedEvent && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg z-10">
                        <h2 className="text-lg font-bold mb-4">The Details (You can also update your event!)</h2>
                        <form onSubmit={handleUpdateEvent}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Location *</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Start: {moment(formData.start).format("YYYY-MM-DD HH:mm")}</label>
                                <Datetime
                                    name="start"
                                    value={formData.start}
                                    onChange={value => handleDateChange('start', value)}
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat="HH:mm"
                                    inputProps={{
                                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                        placeholder: "Select end date and time", // Placeholder 
                                        required: true
                                      }}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">End: {moment(formData.end).format("YYYY-MM-DD HH:mm")}</label>
                                <Datetime
                                    name="end"
                                    value={moment(formData.end)}
                                    onChange={value => handleDateChange('end', value)}
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat="HH:mm"
                                    inputProps={{
                                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                        placeholder: "Select end date and time", // Placeholder text
                                        required: true
                                      }}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Update Event
                                </button>
                                <button type="button" onClick={closeModal} className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Event;
