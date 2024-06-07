import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import moment for date formatting

const Habit = () => {

    const [users, setUsers] = useState([]);

    // Fetch users from API on component mount
    useEffect(() => {
        axios.get('http://localhost:5001/api/calendar/get-users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    // Filter and format ongoing events
    const onGoingEvent = users
        .filter((user) => user.types === "habit")
        .map((user) => ({
            ...user,
            start: moment(user.start).add(7, "hours").format("HH:mm"),
            date: moment(user.start).add(7, "hours").format("YYYY-MM-DD"),
            end: moment(user.end).add(7, "hours").format("HH:mm"),
        }));

    return (
        <div className="flex flex-col w-[30%] h-5/6 rounded-b-full" >
            {/* header Habit container */}
            <div className="flex items-center justify-center bg-[#FFF2CE] rounded-t-[20px] overflow-hidden bg-opacity-95" >
                <span className="items-center m-4 text-lg font-bold text-[#FFBE0B]" >Habit</span>
            </div>
            {/* Checkbox */}
            <div className="flex flex-col h-full gap-3 px-4 py-4 bg-[#FFF2CE] bg-opacity-45 w-full rounded-b-[10px]">
                

            </div>

        </div>
    )

}

export default Habit;