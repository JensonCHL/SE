import React, { useState } from 'react';
import DateTime from 'react-datetime';

interface DropdownProps {
    // label: string;
    // value: number;
    onSelect: (value: number) => void;
}


const Dropdown: React.FC<DropdownProps> = ({onSelect}) => {
    const options = [
        { label: 'Event', value: 1 },
        { label: 'To-Do', value: 2 },
        { label: 'Habit', value: 3 },
    ];
    const [value, setValue] = useState<number>(options[0].value);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(event.target.value)
        setValue(Number(event.target.value));
        setValue(selectedValue);
        onSelect(selectedValue);
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
