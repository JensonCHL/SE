import DailySummary from "../../ComponentPage2/DailySummary"
import AIRecom from "../../ComponentPage2/AIRecom";

const Activity = () => {
    return (
        <div className="flex flex-row gap-5 h-screen m-5">
            <DailySummary></DailySummary>
            <div className="w-1/3 h-2/3" >
                <AIRecom></AIRecom>
            </div>
        </div>
    )

}

export default Activity;