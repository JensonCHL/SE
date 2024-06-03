import { FaRegCheckCircle, FaSmile } from 'react-icons/fa';
import Dropdown from '../../components/dropdown'
import { CiCircleCheck, CiLocationOn } from 'react-icons/ci';
import RepeatButton from '../../components/RepeatButton';
import ReminderButton from '../../components/ReminderButton';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCircleCheck } from 'react-icons/fa6';
import AddEvent from '../../components/addEvent';
import Calendar from '../../components/Calendar';
import Todo from '../../components/Todo';
import Habit from '../../components/Habit';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import { useRef } from 'react';

const defaultColor = '#D3D3D3';  // Default color (grey)
const addColor = '#E6D7FB';

let basicStyle = "flex flex-row flex-shrink-0";
const Home = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const onEventAdded = (event: any) => {
        console.log("Event to be added:", event);

        if (calendarRef.current) {
            let calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent({
                title: event.title,
                start: moment(event.start).toISOString(),
                end: moment(event.end).toISOString(),
                description: event.desc,
                priority: event.timeType,
                location: event.location,
                color: event.color || defaultColor
            });
        }
    };

    

    return (
        <div >
            <div className='flex'>
                {/* <Todo></Todo>
                <Habit></Habit> */}
            </div>
            <AddEvent onEventAdded={onEventAdded} />
            <Calendar></Calendar>
        </div>
    )
}

export default Home;
