import React, { useState } from 'react';
import { FaRegCheckCircle, FaSmile } from 'react-icons/fa';
import { CiCircleCheck, CiLocationOn } from 'react-icons/ci';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCircleCheck } from 'react-icons/fa6';
import Dropdown from './dropdown';
import RepeatButton from './RepeatButton';
import ReminderButton from './ReminderButton';
import 'react-datetime/css/react-datetime.css';
import DateTime from 'react-datetime';
import Toggle from './Toggle';


interface AddEventProps {
    onEventAdded: (event: EventData) => void; // Define the type for onEventAdded function
}

interface EventData {
    title: string;
    start: Date;
    end: Date;
    desc: string;
    location: string;
    timeType: string;
    color: string
}

const Todo = () => {

    const [title, setTitle] = useState<string>('');
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());
    const [desc, setDesc] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [timeType, setTimeType] = useState<string>('');

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onEventAdded({
            title,
            start: new Date(start),
            end: new Date(end),
            location,
            desc,
            timeType,
            color: '#E6D7FB'
        });
    };
    return (
        <form >
            <div className='bg-white w-[350px] h-[450px] px-10 py-4 m-4 rounded-xl'>
                <div className="flex flex-col gap-y-3 mr-1">
                    {/* Add event */}
                    <div className="flex flex-row gap-2 items-center m-1">
                        <div className='font-bold'>Add New</div>
                        <Dropdown />
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

                        />
                    </div>

                    {/* All day */}
                    <div className="flex flex-row gap-2 focus:outline-none focus:border-none">
                        <div className='font-bold'>All-day</div>
                        <Toggle></Toggle>
                    </div>

                    {/* Starts */}

                    {/* Ends */}
                    <div className="flex flex-row gap-4">
                        <div className='font-bold'>Ends</div>
                        <DateTime
                            value={end}
                            onChange={(date: any) => setEnd(date.toDate())}
                        />
                    </div>

                    {/* Repeat Reminder */}
                    <div className="flex flex-col gap-4 justify-center">
                        <RepeatButton />
                        <ReminderButton />
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
                    <div className="flex flex-row gap-4 justify-center mt-8">
                        <button className='bg-[#3A86FF] w-full px-5 py-1 rounded-md' type='submit'>Save</button>
                        <button className='text-red-700 w-full border border-[#E54B49] px-4 py-1 rounded-md'>Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    )

}

export default Todo;