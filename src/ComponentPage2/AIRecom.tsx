


const AIRecom = () => {

    return (
        <div className=" flex flex-col w-full h-full bg-white rounded-[40px] p-6 gap-y-4 " >
            <div className="border border-[1px] border-red-500 rounded-[10px] p-2">
                <span className="text-red-500" >Reminder: You Have too many activities today. Take a break and rest!</span>
            </div>
            <div className=" flex flex-col rounded-[10px] bg-[#D9D9D9] bg-opacity-40 w-full h-auto p-5 gap-y-2" >
                <div className="flex flex-row justify-between " >
                    <span className="font-bold" >Distance</span>
                    <span className="" >Health Data</span>
                </div>
                <div className="flex flex-row justify-between " >
                    <span className="font-bold" >Heart Rate</span>
                    <span className="" >Health Data</span>
                </div>
                <div className="flex flex-row justify-between " >
                    <span className="font-bold" >Calories Burned</span>
                    <span className="" >Health Data</span>
                </div>
                <div className="flex flex-row justify-between " >
                    <span className="font-bold" >Sleep Pattern</span>
                    <span className="" >Health Data</span>
                </div>
                <div className="flex flex-row justify-between " >
                    <span className="font-bold" >Hydration Level</span>
                    <span className="" >Health Data</span>
                </div>
                <div className="flex flex-row justify-between " >
                    <span className="font-bold" >Body Temp</span>
                    <span className="" >Health Data</span>
                </div>
            </div>
            <div>
                Recommendation AI
            </div>
        </div>


    )


}
export default AIRecom;