import React, { useState } from 'react';

interface DropdownProps {
    onSelect: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
    const [value, setValue] = useState<number>(1);
    const options = [
        { label: 'Event', value: 1 },
        { label: 'To-Do', value: 2 },
        { label: 'Habit', value: 3 },
    ];
    
    // const [options, setOptions] = useState<{ label: string; value: number }[]>([
    //     { label: 'Event', value: 1 },
    //     { label: 'To-Do', value: 2 },
    //     { label: 'Habit', value: 3 },
    // ]);
    

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(event.target.value);
        setValue(selectedValue);
        onSelect(selectedValue);
        updateOptions(selectedValue);
    }

    return (
        <select
            className='form-select font-bold bg-gray-300 px-2 py-1 rounded-md items-center'
            onChange={handleSelect}
            value={value}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
function updateOptions(selectedValue: number) {
    throw new Error('Function not implemented.');
}

