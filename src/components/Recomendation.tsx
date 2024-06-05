import DateTime from 'react-datetime';
import { CiLocationOn } from 'react-icons/ci';


const Recomendation = () => {
    return (
        <div className="flex flex-col bg-white w-auto px-10 py-4 rounded-xl gap-y-0.5 h-auto " >
            <div className="flex flex-col">
                <span className="font-bold text-md"  >
                    Recomendations
                </span>
                <span className="font-bold text-sm">
                    Activity 1
                </span>
            </div>
            {/* Time */}
            <div>
                <span>20/13/204 14:00 - 15:00 </span>
            </div>
            {/* Location */}
            <div className='flex items-center gap-1'>
                <CiLocationOn />
                <span>Location 1</span>
            </div>
            {/* Event Description */}
            <div>
                Event Description
            </div>
            {/* Button */}
            <div className='flex cursor-pointer items-center justify-center gap-4 mt-2'>
                <button className='border border-green-500 border-[2px] px-7  py-1 rounded-md items-center' >
                    <span className='font-bold text-green-500'>Add</span>
                </button>
                <button className='border border-red-500 border-[2px] px-7 py-1 rounded-md items-center' >
                    <span className='font-bold text-red-500'>Next</span>
                </button>
                
            </div>
        </div>
    )


}

export default Recomendation;