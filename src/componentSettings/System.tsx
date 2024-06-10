import { useState } from "react";
import { TbDoorExit } from "react-icons/tb";

const System = () => {

    const options = [
        { label: 'Event', value: 1 },
        { label: 'To-Do', value: 2 },
        { label: 'Habit', value: 3 },
    ];
    const [value, setValue] = useState<number>(options[1].value);

    return (
        <div className="flex flex-col bg-white w-full h-full rounded-[15px]" >
            <div className="flex flex-col m-[5%] gap-y-10 flex-grow ">
                <div className="flex">
                    {/* Profile */}
                    <span className="font-bold text-[40px]">System</span>
                </div>
                {/* Name Place Holder */}
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-1" >
                        <div>
                            <span className="font-bold text-lg" >Push Notification</span>
                        </div>
                        <div>
                            <span className="font-bold text-lg opacity-20 " >Allow Time Possible to send push notifications on set conditions</span>
                        </div>
                        <div className="w-2/6" >
                            {/* <input className="border border-[2px] border-grey-900 w-full p-1 rounded-lg" type="text" placeholder="Bily John" /> */}
                            <select
                                className='form-select w-full font-bold bg-[#A8A8A8] bg-opacity-15 px-2 py-1 rounded-md items-center'
                                value={value}
                            >
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>

            </div>


        </div>

    )

}

export default System;