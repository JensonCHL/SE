import Habit from "./Habit";
import Todo from "./Todo";
import Event from "./Event";

const DailySummary = () => {

    return (
        <div className="flex flex-col w-[70%] h-[95%] bg-white rounded-[40px] overflow-hidden p-5">
            
            <div className="flex flex-row w-auto justify-between m-4" >
                {/* Heading */}
                <div className=" flex gap-4 text-lg">
                    <span className="font-Helvetica font-bold gap-4 text-[#D9D9D9]" >
                        Today,
                    </span>
                    <span className="font-bold" >
                        20 March 2024
                    </span>
                </div>
                {/* Daily Summary Button top left */}
                <div>
                    <button className="text-[#767772] border border-[3px] px-2 py-1 rounded-full" >
                        Daily Summary
                    </button>
                </div>
            </div>
            {/* Container */}
            <div className="flex flex-row w-auto h-full m-4 justify-between" >
                <Habit></Habit>
                <Todo></Todo>
                <Event></Event>
            </div>

        </div>

    )


}

export default DailySummary;