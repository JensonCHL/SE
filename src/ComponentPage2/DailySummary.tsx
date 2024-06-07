import React from 'react';
import Event from './Event';
import Todo from './Todo';
import Habit from './Habit';
import moment from 'moment';

const DailySummary = () => {
    const today = moment();

    return (
        <div className="flex flex-col w-[70%] h-[85%] bg-white rounded-[40px] p-5">
            <div className="flex flex-row w-auto justify-between m-4">
                {/* Heading */}
                <div className="flex text-3xl">
                    <span>
                        <span className="text-slate-500 italic">{today.format('dddd')}</span>,{' '}
                        <span className="font-bold">{today.format('D MMMM YYYY')}</span>
                    </span>
                </div>
                {/* Daily Summary Button top left */}
                <div>
                    <button className="text-[#767772] border border-[3px] px-2 py-1 rounded-full">
                        Daily Summary
                    </button>
                </div>
            </div>
            {/* Container */}
            <div className="flex flex-row w-auto h-full m-4 justify-between">
                <Event />
                <Todo />
                <Habit />
            </div>
        </div>
    );
}

export default DailySummary;
