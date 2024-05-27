import React, { useState } from 'react';

interface Option {
    label: string;
    value: number;
}

const Dropdown: React.FC = () => {
    const options: Option[] = [
        { label: 'Event', value: 1 },
        { label: 'To-Do', value: 2 },
        { label: 'Habit', value: 3 },
    ];

    const [value, setValue] = useState<number>(options[0].value);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(Number(event.target.value));
    }

    return (
        <select className='form-select font-bold bg-gray-300 px-2 py-1 rounded-md items-center ' onChange={handleSelect} value={value}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
