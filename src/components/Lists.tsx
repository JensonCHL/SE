import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../index.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import Acticity from '../pages/Activity/Acticity'
import Activity from '../pages/Activity/Activity';
import { Link } from 'react-router-dom';


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

    const onGoingEvent = users
        .filter((user) => user.types === "event")
        .slice(0, 1)
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"),
            date: moment(user.end).add(7, "hours").format("YYYY-MM-DD"),
            end: moment(user.end).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time

        }));

    const upComingEvent = users
        .filter((user) => user.types === "event")
        .slice(1, 2)
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"),
            date: moment(user.end).add(7, "hours").format("YYYY-MM-DD"),
            end: moment(user.end).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time

        }));

    const filteredTodo = users
        .filter((user) => user.types === "todo")
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time
            end: moment(user.end).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time

            date: moment(user.end).add(7, "hours").format("YYYY-MM-DD"), // Convert to GMT+7 and format date only
        }));

    const filteredHabit = users
        .filter((user) => user.types === "habit")
        .map((user) => ({
            ...user,
            end: moment(user.end).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time

            start: moment(user.start).add(7, "hours").format("HH:mm"), // Convert to GMT+7 and format time
            date: moment(user.end).add(7, "hours").format("YYYY-MM-DD"), // Convert to GMT+7 and format date only

        }));

    return (
        <div className="h-auto w-auto">
            <div className="h-35 w-50 bg-white rounded-2xl pl-5 pr-5 pt-2 pb-2 border border-[2px]">
                {onGoingEvent.length === 0 ? (
                    <div className="flex items-center justify-center text-center">You don't even have anything to do?</div>
                ) : (
                    <>
                        <h2 className="font-bold text-sm mb-0-0">On Going: </h2>
                        <ul>
                            {onGoingEvent.map((user, index) => (
                                <li className="text-base font-bold m-0 p-0" key={user._id}>
                                    <span>{user.title}<br /></span>
                                    <span>{user.start} - {user.end} </span>
                                    <span>{user.date}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <h2 className="text-sm ml-2 text-gray-500">Upcoming: </h2>
                <ul>
                    {upComingEvent.length === 0 ? (
                        <div className="text-sm ml-2 text-gray-500">You don't have any upcoming event, make sure you have one!</div>
                    ) : (
                        upComingEvent.map((user, index) => (
                            <li className="text-sm ml-2 text-gray-500" key={user._id}>
                                <span>{user.title}<br /></span>
                                <span>{user.start} - {user.end}, </span>
                                <span>{user.date}</span>
                            </li>
                        ))
                    )}
                </ul>

            </div>
            <div className="flex flex-row mt-4 ">
                <div className=" bg-white rounded-2xl pt-1  pl-2 border border-[2px] mr-2 w-52 h-auto">
                    <h2 className="text-bold">Dont forget to do:  </h2>
                    <form>
                        {filteredTodo.length === 0 ? (
                            <div className="text-sm font-normal">No work to do?</div>
                        ) : (
                            <ul>
                                {filteredTodo.slice(0, 2).map(user => (
                                    <li key={user._id}>
                                        <div className="flex flex-row text-sm mt-0.2 ml-2">
                                            <label>
                                                <input type="checkbox" name="todo" value={user._id}
                                                    onChange={() => handleCheckboxChange(user._id)} />
                                            </label>
                                            <div>
                                                <div>{user.title}</div>
                                                <div>{user.start}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                    {filteredTodo.length >= 2 && <Link to="/Activity" className="view-more text-right text-bold">VIEW MORE</Link>}
                </div>

                <div className=" bg-white rounded-2xl pt-1 pl-2 border border-[2px] ml-2 w-52 h-auto">
                    <h2 className="text-bold ">Daily Habits: </h2>
                    <form >
                        {filteredHabit.length === 0 ? (
                            <div className="text-sm font-normal">No habits found!</div>
                        ) : (
                            <ul>
                                {filteredHabit.slice(0, 3).map(user => (
                                    <li key={user._id}>
                                        <div className="flex flex-row text-sm mt-1.5 ml-2">
                                            <label>
                                                <input type="checkbox" name="todo" value={user._id}
                                                    onChange={() => handleCheckboxChange(user._id)} />
                                            </label>
                                            <div>
                                                <div>{user.title}</div>
                                                {/* <div>{user.date}</div> */}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                    {filteredHabit.length >= 4 && <Link to="/Activity" className="view-more text-right text-bold ">VIEW MORE</Link>}
                </div>
            </div>
        </div>
    );
};

export default Lists;
