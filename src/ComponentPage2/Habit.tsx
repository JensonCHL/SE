const Habit = () => {
    return (
        <div className="flex flex-col  w-[30%] h-auto rounded-b-full" >
            {/* header Habit container */}
            <div className="flex items-center justify-center bg-green-100 rounded-t-[20px] overflow-hidden" >
                <span className="items-center m-4 text-lg font-bold" >Habit</span>
            </div>
            {/* Checkbox */}
            <div className="flex flex-col h-full gap-3 px-4 py-4 bg-[#FFF2CE] w-full rounded-b-[20px]">
                <div className="flex justify-between ">
                    <div className="flex flex-col" >
                        <span className="font-bold" >Habit1</span>
                        <span>07:00</span>
                    </div>
                    <label className="flex items-center gap-2 mr-4 ">
                        <input className="bg-[#FFF2CE]"  type="checkbox" />
                    </label>
                </div>
                <div className="flex justify-between ">
                    <div className="flex flex-col" >
                        <span className="font-bold" >Habit1</span>
                        <span>07:00</span>
                    </div>
                    <label className="flex items-center gap-2 mr-4 bg-[#FFF2CE]">
                        <input type="checkbox" />
                    </label>
                </div>
                <div className="flex justify-between ">
                    <div className="flex flex-col" >
                        <span className="font-bold" >Habit1</span>
                        <span>07:00</span>
                    </div>
                    <label className="flex items-center gap-2 mr-4 bg-[#FFF2CE]">
                        <input type="checkbox" />
                    </label>
                </div>
                <div className="flex justify-between ">
                    <div className="flex flex-col" >
                        <span className="font-bold" >Habit1</span>
                        <span>07:00</span>
                    </div>
                    <label className="flex items-center gap-2 mr-4 bg-[#FFF2CE]">
                        <input type="checkbox" />
                    </label>
                </div>

            </div>

        </div>
    )

}

export default Habit;