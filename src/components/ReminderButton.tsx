import React, { useState } from 'react';

interface reminder {
    reminder: boolean;
    setReminder: (prev:any)=>void;
}

const Dropdown = (props:reminder) => {

    // const [value, setValue] = useState<number>(options[0].value);
    // const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setValue(Number(event.target.value));
    // }


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
                <span className='text-gray-800 font-small' >Reminder</span>
            </label>

        </div>

    );
}

export default Dropdown;
