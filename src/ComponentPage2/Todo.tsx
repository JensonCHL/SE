import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const Todo = () => {
    const [users, setUsers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
        location: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const userId = localStorage.getItem('user');

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5001/api/calendar/get-users?user_id=${userId}`)
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        } else {
            console.error('User ID not found in localStorage');
        }
    }, [userId]);

    const onGoingEvent = users
        .filter((user) => user.types === "todo")
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"),
            date: moment(user.start).add(7, "hours").format("YYYY-MM-DD"),
            end: moment(user.end).add(7, "hours").format("HH:mm"),
        }));

    const openModal = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            description: event.description, // Ensure the field name matches the backend expectation
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            location: event.location,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setFormData({
            title: '',
            description: '',
            start: '',
            end: '',
            location: '',
        });
        setModalOpen(false);
    };

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
            [name]: value.toDate(),
        });
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();

        if (
            formData.title === '' ||
            formData.start === '' ||
            formData.end === '' ||
            formData.description === '' ||
            formData.location === ''
        ) {
            console.error('Please fill out all required fields.');
            return;
        }

        if (
            selectedEvent.title === formData.title &&
            selectedEvent.description === formData.description &&
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
                description: formData.description,
                start: moment(formData.start).toISOString(),
                end: moment(formData.end).toISOString(),
                location: formData.location,
            };
            await axios.put(`http://localhost:5001/api/calendar/update-event/${selectedEvent._id}`, updatedEvent);
            const updatedUsers = users.map(user => user._id === selectedEvent._id ? updatedEvent : user);
            setUsers(updatedUsers);
            closeModal();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

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
            <div className="flex items-center justify-center bg-[#FFCCE2] rounded-t-[20px] overflow-hidden">
                <span className="items-center m-4 text-lg font-bold text-[#FF006E]">To-do</span>
            </div>
            <div className="flex flex-col h-full gap-3 px-4 py-4 bg-[#FFCCE2] w-full rounded-b-[10px] bg-opacity-40 overflow-y-scroll">
                {onGoingEvent.length === 0 ? (
                    <div>No ongoing events</div>
                ) : (
                    onGoingEvent.map((event) => (
                        <li key={event._id} className="list-none flex flex-row justify-between items-center">
                            <div>
                                <div className='text-bold text-medium'>{event.title}</div>
                                <div className='text-normal text-xs'>Start: {event.start}, {event.date}</div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <input type="button" value="Detail " onClick={() => openModal(event)} />
                                <label>
                                    <input type="checkbox" name="todo" value={event._id} onChange={() => handleCheckboxChange(event._id)} />
                                </label>
                            </div>
                        </li>
                    ))
                )}
            </div>
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
                                <label className="block text-sm font-medium text-gray-700">Start *</label>
                                <Datetime
                                    name="start"
                                    value={formData.start}
                                    onChange={value => handleDateChange('start', value)}
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat="HH:mm"
                                    inputProps={{
                                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                        placeholder: "Select end date and time",
                                        required: true
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">End *</label>
                                <Datetime
                                    name="end"
                                    value={moment(formData.end)}
                                    onChange={value => handleDateChange('end', value)}
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat="HH:mm"
                                    inputProps={{
                                        className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                        placeholder: "Select end date and time",
                                        required: true
                                    }}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Update</button>
                                <button type="button" onClick={closeModal} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
