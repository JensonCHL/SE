import { FaSmile } from 'react-icons/fa';
import Dropdown from './components/dropdown'

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
                <div className="flex flex-row gap-4" >
                    <div>All-day</div>
                    <input type="toogle" />
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
                <div className="flex flex-row gap-4">
                    <div>logo</div>
                    <div>forms</div>
                </div>
                {/* Repeat Reminder */}
                <div className="flex flex-row gap-4" >
                    <div>repeat</div>
                    <div>reminder</div>
                </div>
                {/* Desc */}
                <div className="flex flex-row gap-4" >
                    add description
                </div>
                {/* Checkbox */}
                <div className="flex flex-row gap-4" >
                    <div>fixed</div>
                    <div>flexible</div>
                </div>
                {/* Recomendation */}
                <div className="flex flex-row gap-4" >
                    <div>Recom</div>
                    <div>check</div>
                    <div>cross</div>
                </div>
                {/* Save & cancel */}
                <div className="flex flex-row gap-4">
                    <div>Save</div>
                    <div>Cancel</div>
                </div>

            </div>
        </div>

    )
}

export default Home;
