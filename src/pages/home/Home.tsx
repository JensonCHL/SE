import { FaRegCheckCircle, FaSmile } from 'react-icons/fa';
import Dropdown from './components/dropdown'
import { CiCircleCheck, CiLocationOn } from 'react-icons/ci';
import RepeatButton from './components/RepeatButton';
import ReminderButton from './components/ReminderButton';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCircleCheck } from 'react-icons/fa6';

let basicStyle = "flex flex-row flex-shrink-0";
const Home = () => {
    return (
        <div className='bg-white w-[300px] px-10 py-4 m-4 rounded-xl' >
            <div className="flex flex-col gap-y-3 mr-1">
                {/* Add event */}
                <div className="flex flex-row gap-2 items-center m-1" >
                    <div>Add New</div>
                    <Dropdown />

                </div>

                {/* Title */}
                <div className="flex flex-row items-center" >
                    <div className='border px-2 py-1'>
                        <FaSmile />
                    </div>
                    <input className='bg-[#F4F4F4] py-1' type="text" value="Title" />
                </div>
                {/* All day */}
                <div className="flex flex-row gap-2" >
                    <div>All-day</div>
                    <input type="togle" />
                </div>
                {/* Starts   */}
                <div className="flex flex-row gap-4" >
                    <div>starts</div>
                    <div>calender </div>
                    <div>time</div>
                </div>
                {/* Ends   */}
                <div className="flex flex-row gap-4" >
                    <div>ends</div>
                    <div>calender </div>
                    <div>time</div>
                </div>
                {/* location */}
                <div className="flex flex-row items-center bg-[#F4F4F4]">
                    <div className='px-2 py-1'>
                        <CiLocationOn />

                    </div>
                    <input className='bg-[#F4F4F4] py-1' type="text" value="Title" />
                </div>
                {/* Repeat Reminder */}
                <div className="flex flex-row gap-4 justify-center" >
                    <RepeatButton />
                    <ReminderButton />
                </div>
                {/* Desc */}
                <div className="flex flex-row gap-4" >
                    <input className='bg-[#F4F4F4] py-1 px-2 rounded-md' type="text" value="Add Description" />

                </div>
                {/* Checkbox */}
                <div className="flex flex-row gap-4" >
                    <div>fixed</div>
                    <div>flexible</div>
                </div>
                {/* Recomendation */}
                <div className="flex flex-row gap-1" >
                    <input className=' bg-[#F4F4F4] py-1 px-2 rounded-md' type="text" value="Recommendation" />
                    <button>
                        <FaRegCircleCheck />
                    </button>
                    <button>
                        <RxCrossCircled />

                    </button>
                </div>
                {/* Save & cancel */}
                <div className="flex flex-row gap-4 justify-center">
                    <button className='bg-[#3A86FF] px-5 py-1 rounded-md' >Save</button>
                    <button className='text-red-700 border border-[#E54B49] px-4 py-1 rounded-md' >Cancel</button>
                </div>

            </div>
        </div>

    )
}

export default Home;
