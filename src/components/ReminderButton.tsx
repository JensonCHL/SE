import React, { useState } from 'react';

interface reminder {
    reminder: boolean;
    setReminder: (prev:any)=>void;
}

const Dropdown = (props:reminder) => {


    // ganti Checkbox alert 10min sebelum event selesai
    return (
        <div className='flex flex-col space-y-2'>
            <label  className='flex items-center space-x-2'>
                <input
                    type='checkbox'
                    checked={props.reminder}
                    onChange={() => props.setReminder((prev:any)=>!prev)}
                    className='form-checkbox h-4 w-4 text-gray-700 rounded-md'
                />
                <span>Reminder</span>
            </label>

        </div>

    );
}

export default Dropdown;
