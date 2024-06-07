import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Todo = () => {
    return (
        <div className="flex flex-col  w-[30%] h-5/6 rounded-b-full" >
            {/* header Habit container */}
            <div className="flex items-center justify-center bg-[#FFCCE2] rounded-t-[20px] overflow-hidden" >
                <span className="items-center m-4 text-lg font-bold text-[#FF006E]">To-do</span>
            </div>
            {/* Checkbox */}
            <div className="flex flex-col h-full gap-3 px-4 py-4 bg-[#FFCCE2] w-full rounded-b-[10px] bg-opacity-40">
                

            </div>

        </div>
    )

}

export default Todo;