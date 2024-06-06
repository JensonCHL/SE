import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../index.css';

const Lists = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/calendar/get-users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleCheckboxChange = async (userId) => {
        try {
            await axios.delete(`http://localhost:5001/api/calendar/delete-user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const filteredEvent = users
        .filter((user) => user.types === "event")
        .slice(0, 2)
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"),
            date: moment(user.start).add(7, "hours").format("YYYY-MM-DD"),
        }));

    const filteredTodo = users
        .filter((user) => user.types === "todo")
        .slice(0, 2)
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time
            date: moment(user.start).add(7, "hours").format("YYYY-MM-DD"), // Convert to GMT+7 and format date only
        }));

    const filteredHabit = users
        .filter((user) => user.types === "habit")
        .slice(0, 2)
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time
            date: moment(user.start).add(7, "hours").format("YYYY-MM-DD"), // Convert to GMT+7 and format date only
        }));

    return (
        <div>
            <div className="h-full w-auto bg-white rounded-2xl p-5 outline">
                <h2 className="font-bold">On Going: </h2>
                <ul>
                    {filteredEvent.map((user, index) => (
                        <tr key={user._id} style={index === 0 ? { color: 'black', fontSize: '20px', fontWeight: 'bold'} : {}}>
                            <span>{index === 0 ? `${user.title}` : user.title} - </span>
                            <td>{user.start} - </td>
                            <td>{user.date}</td>
                        </tr>
                    ))}
                </ul>
            </div>
            <div className="flex flex-row m-3">
            <div className="h- w-40 bg-white rounded-2xl p-3 outline mr-2">
                <h2>Dont forget to do:  </h2>
                <form>
                    <ul>
                        {filteredTodo.map(user => (
                            <li key={user._id}>
                                <div className="flex flex-row">
                                <label>
                                    <input type="checkbox" name="todo" value={user._id} 
                                    onChange={() => handleCheckboxChange(user._id)}/>
                                </label>
                                <div>
                                    <div>{user.title}</div>
                                    <div>{user.start}</div>
                                </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </form>
                <span>VIEW MORE</span>
            </div>

            <div className="h- w-40 bg-white rounded-2xl p-3 outline mr-2">
                <h2>Daily Habits: </h2>
                <form>
                    <ul>
                        {filteredHabit.map(user => (
                            <li key={user._id}>
                                <div className="flex flex-row">
                                <label>
                                    <input type="checkbox" name="todo" value={user._id}
                                    onChange={() => handleCheckboxChange(user._id)}/>
                                </label>
                                <div>
                                    <div>{user.title}</div>
                                    <div>{user.start}</div>
                                </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </form>
                <span>VIEW MORE</span>
            </div>
            </div>
        </div>
    );
};

export default Lists;
