import React, { useState, useEffect } from 'react';
import { FaSmile } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCircleCheck } from 'react-icons/fa6';
import Dropdown from './dropdown';
import RepeatButton from './RepeatButton';
import ReminderButton from './ReminderButton';
import 'react-datetime/css/react-datetime.css';
import DateTime from 'react-datetime';
import Toggle from './Toggle';
import Todo from './Todo';
import AddEvent from './addEvent';
import axios from 'axios';
// import Habit from './Habit';


interface AddEventProps {
    selectedType: number;
    setSelectedType: (value: number) => void;
    onEventAdded: (event: EventData) => void;
}

interface EventData {
    title: string;
    start: Date;
    end: Date;
    desc: string;
    location: string;
    timeType: string;
    types: string;
    color: string;
    reminder: boolean;
    repeat: number;
}

const getTypeString = (types: number) => {
    switch (types) {
        case 1:
            return 'event';
        case 2:
            return 'todo';
        case 3:
            return 'habit';
        default:
            return 'unknown';
    }
};

const getEventColor = (types: number) => {
    switch (types) {
        case 1:
            return '#E6D7FB';
        case 2:
            return '#FFCCE2';
        case 3:
            return '#FFF2CE';
        default:
            return 'unknown';
    }
};

const Habit: React.FC<AddEventProps> = ({ selectedType, setSelectedType, onEventAdded }) => {
    const [title, setTitle] = useState<string>('');
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());
    const [desc, setDesc] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [timeType, setTimeType] = useState<string>('');
    const [types, setTypes] = useState<string>(getTypeString(selectedType));
    const [color, setColor] = useState<string>(getEventColor(selectedType));
    const [reminder, setReminder] = useState<boolean>(false)
    const [repeat, setRepeat] = useState<number>(-1);
    const [events, setEvents] = useState<EventData[]>([]);



    // Update types and color when selectedType changes
    useEffect(() => {
        setTypes(getTypeString(selectedType));
        setColor(getEventColor(selectedType));
        fetchEvents();

    }, [selectedType]);

    const userString = localStorage.getItem('user');
    const userId = userString;

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/calendar/get-collision', {
                params: {
                    id: userId
                }
            });
            console.log(response.data)
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const incrementDate = (date: Date, days: number): Date => {
        console.log("Increment happen")
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    const incrementHour = (date: Date, hour: number): Date => {
        const incrementedDate = new Date(date);
        incrementedDate.setHours(date.getHours() + hour);  // Increment hours by 1
        return incrementedDate;
    };
    const incrementMinutes = (date: Date, minutes: number): Date => {
        const incrementedDate = new Date(date);
        incrementedDate.setMinutes(date.getMinutes() + minutes);  // Increment hours by 1
        return incrementedDate;
    };
    // Ignoring second
    const truncateSeconds = (date: Date) => {
        // return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        const truncatedDate = new Date(date);
        truncatedDate.setSeconds(0);
        truncatedDate.setMilliseconds(0);
        // console.log(truncatedDate)
        return truncatedDate;

    };
    // Conflict check
    const [existEnd, setexistEnd] = useState<Date>(new Date());
    const [existStart, setexistStart] = useState<Date>(new Date());
    const isConflict = (events: EventData[], start: Date) => {

        const newStartEvent = truncateSeconds(start);
        console.log("is conflict run")
        console.log('new start date:', newStartEvent.getTime());
        for (const event of events) {
            setexistEnd(event.end)
            setexistStart(event.start)
            const eventStart = truncateSeconds(event.start);
            console.log('event start date:', eventStart.getTime());
            if (newStartEvent.getTime() === eventStart.getTime()) {
                setexistEnd(event.end)
                setexistStart(event.start)
                console.log('Conflict detected');
                return true;
            }
        }
        return false;
    };

    const findNextAvailableSlot = (start: Date, end: Date) => {
        let duration = existEnd.getTime() - existStart.getTime(); // Duration in milliseconds
        let durationInMinutes = duration / (1000 * 60); // Convert duration to hours
        let newStart = new Date(incrementMinutes(existEnd, 1));
        let newEnd = new Date(incrementMinutes(end, durationInMinutes));
        // let newStart = new Date(start)
        // let newEnd = new Date(end)

        while (isConflict(events, newStart)) {
            duration = existEnd.getTime() - existStart.getTime();
            durationInMinutes = duration / (1000 * 60);
            newStart = incrementHour(newStart, 1);
            newEnd = incrementMinutes(end, durationInMinutes);
        }

        return { newStart, newEnd };
    };


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let currentStart = new Date(start);
        let currentEnd = new Date(end);
        const eventDuration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24); // duration in days
        let confirmReschedule;

        for (let i = 0; i < (repeat > 0 ? repeat : 1); i++) {
            confirmReschedule = false
            if (isConflict(events, currentStart)) {
                console.log("Conflict detected for start date:", currentStart);
                if (confirmReschedule = window.confirm("Collision detected. Do you want to automatically reschedule the event?")) {
                    const { newStart, newEnd } = findNextAvailableSlot(currentStart, currentEnd);
                    currentStart = newStart;
                    currentEnd = newEnd;
                } else {
                    break;
                }
            }
            const eventData: EventData = {
                title,
                start: new Date(currentStart),
                end: new Date(currentEnd),
                desc,
                location,
                timeType,
                types,
                color,
                reminder,
                repeat
            };
            setEvents((prevEvents) => [...prevEvents, eventData]);

            onEventAdded(eventData);

            //    /Increment currentStart to the day after the current end
            currentStart = incrementDate(currentEnd, 1);
            // Increment currentEnd to the new start date plus the original duration
            currentEnd = incrementDate(currentStart, eventDuration);
            fetchEvents();

        }

        // Clear the form after submission
        setTitle('');
        setStart(new Date());
        setEnd(new Date());
        setDesc('');
        setLocation('');
        setTimeType('fixed');
        setReminder(false);
        setRepeat(-1);
    };

    return (
        <div>
            {selectedType === 1 && <AddEvent onEventAdded={onEventAdded} selectedType={selectedType} setSelectedType={setSelectedType} />}
            {selectedType === 2 && <Todo onEventAdded={onEventAdded} selectedType={selectedType} setSelectedType={setSelectedType} />}
            {selectedType === 3 && (
                <form onSubmit={onSubmit}>
                    <div className='bg-white w-full h-auto px-10 py-4 rounded-xl'>
                        <div className="flex flex-col gap-y-1.5">
                            {/* Add event */}
                            <div className="flex flex-row gap-2 items-center m-1">
                                <div className='font-bold'>Add New</div>
                                <Dropdown onSelect={setSelectedType} />
                            </div>

                            {/* Title */}
                            <div className="flex flex-row items-center">
                                <div className='border px-2 py-2'>
                                    <FaSmile />
                                </div>
                                <input
                                    className='bg-[#F4F4F4] py-1 w-full focus:outline-none focus:border-none'
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            {/* All day */}
                            <div className="flex flex-row gap-2 focus:outline-none focus:border-none">
                                <div className='font-bold'>All-day</div>
                                <Toggle />
                            </div>

                            {/* Starts */}
                            <div className="flex flex-row gap-4 justify-between ">
                                <div className='font-bold'>Starts</div>
                                <DateTime
                                    value={start}
                                    onChange={(date: any) => setStart(date.toDate())}
                                />
                            </div>

                            {/* Ends */}
                            <div className="flex flex-row gap-4 justify-between ">
                                <div className='font-bold'>Ends</div>
                                <DateTime
                                    value={end}
                                    onChange={(date: any) => setEnd(date.toDate())}
                                />
                            </div>

                            {/* Location */}
                            <div className="flex flex-row items-center bg-[#F4F4F4]">
                                <div className='px-2 py-1'>
                                    <CiLocationOn />
                                </div>
                                <input
                                    className='bg-[#F4F4F4] py-1 focus:outline-none focus:border-none'
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder='Location'
                                />
                            </div>

                            {/* Repeat Reminder */}
                            <div className="flex flex-row gap-4 justify-center">
                                <div className='w-full' >
                                    <RepeatButton repeat={repeat} setRepeat={setRepeat} />
                                </div>
                                <div className='w-full' >
                                    <ReminderButton reminder={reminder} setReminder={setReminder} />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-row gap-4">
                                <input
                                    className='bg-[#F4F4F4] py-1 px-2 rounded-md w-full focus:outline-none focus:border-none'
                                    type="text"
                                    placeholder="Add Description"
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}
                                />
                            </div>

                            {/* Recommendation */}
                            <div className="flex flex-row gap-1 bg-[#F4F4F4] rounded-full">

                            </div>

                            {/* Save & Cancel */}
                            <div className="flex flex-row gap-4 justify-center">
                                <button className='bg-[#3A86FF] w-full px-5 py-1 rounded-md' type='submit'>Save</button>
                                <button className='text-red-700 w-full border border-[#E54B49] px-4 py-1 rounded-md'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Habit;
