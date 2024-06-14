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
import Habit from './Habit';

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
    switch(types) {
        case 1:
            return 'event';
        case 2:
            return 'todo';
        case 3:
            return 'habit';
        default:
            return 'unknown';
    }
}

const getEventColor = (types: number) => {
    switch(types) {
        case 1:
            return '#E6D7FB';
        case 2:
            return '#FFCCE2';
        case 3:
            return '#FFF2CE';
        default:
            return 'unknown';
    }
}

const AddEvent: React.FC<AddEventProps> = ({ selectedType, setSelectedType, onEventAdded }) => {
    const [title, setTitle] = useState<string>('');
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());
    const [desc, setDesc] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [timeType, setTimeType] = useState<string>('fixed');
    const [types, setTypes] = useState<string>(getTypeString(selectedType));
    const [color, setColor] = useState<string>(getEventColor(selectedType));
    const [reminder, setReminder] = useState<boolean>(false);
    const [repeat, setRepeat] = useState<number>(-1);

    useEffect(() => {
        setTypes(getTypeString(selectedType));
        setColor(getEventColor(selectedType));
    }, [selectedType]);

    const incrementDate = (date: Date, days: number): Date => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let currentStart = new Date(start);
        let currentEnd = new Date(end);
        const eventDuration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24); // duration in days

        for (let i = 0; i<(repeat>0?repeat:1); i++){
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
            onEventAdded(eventData);

           // Increment currentStart to the day after the current end
           currentStart = incrementDate(currentEnd, 1);
           // Increment currentEnd to the new start date plus the original duration
           currentEnd = incrementDate(currentStart, eventDuration);
            
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
            {selectedType === 1 && (
                <form onSubmit={onSubmit}>
                    <div className='bg-white h-full w-auto px-10 py-4 rounded-xl'>
                        <div className="flex flex-col gap-y-2.5">
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
                            <div className="flex flex-row gap-4">
                                <div className='font-bold'>Starts</div>
                                <DateTime
                                    value={start}
                                    onChange={(date: any) => setStart(date.toDate())}
                                />
                            </div>

                            {/* Ends */}
                            <div className="flex flex-row gap-4">
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
                            <div className="flex flex-row gap-4 justify-center items-center">
                                <RepeatButton repeat={repeat} setRepeat={setRepeat} />
                                <ReminderButton reminder={reminder} setReminder={setReminder} />
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

                            {/* Radio Buttons */}
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <input
                                    className='rounded-full'
                                    type="radio"
                                    name="timeType"
                                    value="fixed"
                                    checked={timeType === 'fixed'}
                                    onChange={e => setTimeType(e.target.value)}
                                />
                                <div>Fixed</div>
                                <input
                                    className='ml-2 focus:outline-none focus:border-none'
                                    type="radio"
                                    name="timeType"
                                    value="flexible"
                                    checked={timeType === 'flexible'}
                                    onChange={e => setTimeType(e.target.value)}
                                />
                                <div>Flexible</div>
                            </div>

                            {/* Save & Cancel */}
                            <div className="flex flex-row gap-4 justify-center">
                                <button className='bg-[#3A86FF] hover:bg-blue-800 text-white w-full px-5 py-1 rounded-md transition duration-200 ease-in-out' type='submit'>Save</button>
                                <button className='text-red-700 hover:text-white hover:bg-red-600 w-full border border-[#E54B49] px-4 py-1 rounded-md transition duration-200 ease-in-out ' type='button' onClick={() => setSelectedType(0)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            {selectedType === 2 && <Todo onEventAdded={onEventAdded} selectedType={selectedType} setSelectedType={setSelectedType} />}
            {selectedType === 3 && <Habit onEventAdded={onEventAdded} selectedType={selectedType} setSelectedType={setSelectedType} />}
        </div>
    );
}

export default AddEvent;
