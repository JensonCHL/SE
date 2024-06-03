import { FaRegCheckCircle, FaSmile } from 'react-icons/fa';
import Dropdown from '../../components/dropdown'
import { CiCircleCheck, CiLocationOn } from 'react-icons/ci';
import RepeatButton from '../../components/RepeatButton';
import ReminderButton from '../../components/ReminderButton';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCircleCheck } from 'react-icons/fa6';
import AddEvent from '../../components/Addevent';
import Calendar from '../../components/Calendar';
import Todo from '../../components/Todo';
import Habit from '../../components/Habit';


let basicStyle = "flex flex-row flex-shrink-0";
const Home = () => {

    return (
        <div >
            <div className='flex'>
                <Todo></Todo>
                <Habit></Habit>
            </div>

            <Calendar></Calendar>
        </div>
    )
}

export default Home;
