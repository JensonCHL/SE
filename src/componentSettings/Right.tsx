const Right = () => {
    return (
        <div className="flex flex-col bg-white w-full h-full rounded" >
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
                            <span className="font-bold text-lg" >DisplayName</span>
                        </div>
                        <div className="w-full" >
                            <input className="border border-[2px] border-grey-900 w-full p-1 rounded-lg" type="text" placeholder="User Name" />
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
                <div className="flex flex-row items-start justify-between mt-auto" >
                    {/* Change Emaail/Password */}
                    <div className="flex flex-col cursor-pointer" >
                        <button className="text-left" >Change email</button>
                        <button>Change Password</button>
                    </div>
                    <div>
                        <button>Logout</button>
                    </div>
                </div>
                


            </div>


        </div>


    )

}

export default Right;