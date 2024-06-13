import { TbDoorExit } from "react-icons/tb";



const Right = () => {
    return (
        <div className="flex flex-col bg-white w-full h-full rounded-[15px]" >
            <div className="flex flex-col m-[5%] gap-y-10 flex-grow ">
                <div className="flex">
                    {/* Profile */}
                    <span className="font-bold text-[40px]">Profile</span>
                </div>
                {/* Name Place Holder */}
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-1" >
                        <div>
                            <span className="font-bold text-lg" >Name</span>
                        </div>
                        <div className="w-full" >
                            <input className="border border-[2px] border-grey-900 w-full p-1 rounded-lg" type="text" placeholder="Bily John" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-1" >
                        <div>
                            <span className="font-bold text-lg" >Email</span>
                        </div>
                        <div className="w-full" >
                            <input className="border border-[2px] border-grey-900 w-full p-1 rounded-lg" type="text" placeholder="Username@gmail.com" />
                        </div>
                    </div>
                </div>
                {/* Lower Section */}
                <div className="flex flex-row items-center justify-between mt-auto" >
                    {/* Change Emaail/Password */}
                    <div className="flex flex-col cursor-pointer" >
                        <button className="text-left" >Change email</button>
                        <button>Change Password</button>
                    </div>
                    <div className="flex items-center cursor-pointer" >
                        <button className="flex items-center gap-2 " ><span className="font-bold" >Logout
                            </span>
                            <TbDoorExit />
                        </button>
                        
                    </div>
                </div>
                


            </div>


        </div>


    )

}

export default Right;