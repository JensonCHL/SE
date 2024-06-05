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

    // Update types and color when selectedType changes
    useEffect(() => {
        setTypes(getTypeString(selectedType));
        setColor(getEventColor(selectedType));
    }, [selectedType]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Call onEventAdded with the current state values
        onEventAdded({
            title,
            start,
            end,
            location,
            desc,
            timeType,
            types, // Use the updated state value here
            color, // Use the updated state value here
        });

        // Clear form inputs after submission
        setTitle('');
        setStart(new Date());
        setEnd(new Date());
        setLocation('');
        setDesc('');
        setTimeType('');
    };

    return (
        <div>
            {selectedType === 1 && <AddEvent onEventAdded={onEventAdded} selectedType={selectedType} setSelectedType={setSelectedType} />}
            {selectedType === 2 && <Todo onEventAdded={onEventAdded} selectedType={selectedType} setSelectedType={setSelectedType} />}
            {selectedType === 3 && (
                <form onSubmit={onSubmit}>
                    <div className='bg-white w-full h-auto px-10 py-4 rounded-xl'>
                        <div className="flex flex-col gap-y-2">
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
                            <div className="flex flex-row gap-4 justify-center">
                                <div className='w-full' >
                                    <RepeatButton />
                                </div>
                                <div className='w-full' >
                                    <ReminderButton />
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
                                <input className='bg-[#F4F4F4] py-1 px-2 rounded-full w-full focus:outline-none focus:border-none' type="text" value="Recommendation" readOnly />
                                <button>
                                    <FaRegCircleCheck color='green' size="1.4em" />
                                </button>
                                <button className='mr-2' >
                                    <RxCrossCircled color='red' size="1.5em" />
                                </button>
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
