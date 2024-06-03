import Habit from "../../components/Habit";
import Todo from "../../components/Todo";

const CalenderPage = () => {
    return(
        <div className="flex">
            <Todo/>
            <Habit></Habit>
        </div>
        

    )

}

export default CalenderPage;