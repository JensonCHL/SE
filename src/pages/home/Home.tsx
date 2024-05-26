

let basicStyle = "flex flex-row flex-shrink-0";
const Home = () => {
    return (
        <div className="bg-white w-[250px] px-10 py-4 m-4 rounded-xl">
            {/* Add event */}
            <div className={basicStyle} >
                <div>ADD NEW</div>
                <div>
                    <select name="Event" id="">
                        <option value=""></option>
                    </select>
                </div>
            </div>

            {/* Title */}
            <div className="flex flex-row gap-4" >
                <div>emote</div>
                <div>title</div>
            </div>
            {/* All day */}
            <div className="flex flex-row gap-4" >
                <div>all day</div>
                <div>togle</div>
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
                <div>NIGGA</div>
            </div>

        </div>
    ) 
}

export default Home;
