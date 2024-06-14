import axios from 'axios';
import { useEffect, useState } from 'react';
import DateTime from 'react-datetime';
import { CiLocationOn } from 'react-icons/ci';
import Event from '../ComponentPage2/Event';

interface Event {
    types: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    location: string;
    priority: string;
    color: string;
    __v: number;
    _id: string;
}

const Recomendation = () => {
    
    

    const [event, setEvent] = useState<Event | null>(null);
    const [excludeTitle, setExcludeTitle] = useState<string | null>(null);

    const fetchEvent = async (excludeTitle: string | null) => {
        try {
            const response = await axios.get('http://localhost:5001/api/calendar/get-past-events', {
                params: { excludeTitle }
            });
            console.log(response);
            setEvent(response.data); // Assuming API returns an Event object
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvent(excludeTitle);
    }, [excludeTitle]);

    const incrementDate = (date: Date, days: number): Date => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    const handleSave = async () => {

        try {
            handleNext()
            if (event) {
                const Event = {
                    ...event,
                    start: incrementDate(event.start, 1) // Increment start date by 1 day
                };
                const { _id, __v, ...eventData } = Event;
                console.log(eventData)
                const response = await axios.post('http://localhost:5001/api/calendar/create-event', eventData);
                console.log('Event saved:', response.data);
            }
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleNext = async () =>{
        setExcludeTitle(event?.title || null);
    }

    return (

        <div className="flex flex-col bg-white w-auto px-10 py-4 rounded-xl gap-y-0.5 h-auto " >
            <div className="flex flex-col">
                <span className="font-bold text-md"  >
                    Recomendations

                </span>
                <span className="font-bold text-sm">
                    {event?.title || "No Recommendation Data"}
                </span>
            </div>
            {/* Time */}
            <div>
                <span>{event?.start.toLocaleString()}</span>
            </div>
            {/* Location */}
            <div className='flex items-center gap-1'>
                <CiLocationOn />
                <span>
                    {event?.location || "No data"}
                </span>
            </div>
            {/* Event Description */}
            <div>
                Event Description
            </div>
            {/* Button */}
            <div className='flex cursor-pointer items-center justify-center gap-4 mt-2'>
                <button className='border border-green-500 border-[2px] px-7  py-1 rounded-md items-center text-green-500
                                    transition-colors duration-300 hover:bg-green-500 hover:text-white' >
                    <span className='font-bold ' onClick={handleSave} onCLick={handleNext} >Add</span>
                </button>
                <button className='border border-red-500 text-red-500 border-[2px] px-7 py-1 rounded-md items-center
                                    transition-colors duration-300 hover:bg-red-500 hover:text-white' >
                    <span className='font-bold ' onClick={handleNext} >Next</span>
                </button>

            </div>
        </div>


    )


}

export default Recomendation;