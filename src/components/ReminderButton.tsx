import React, { useState } from 'react';

interface Option {
    label: string;
    value: number;
}

const Dropdown: React.FC = () => {
    const options: Option[] = [
        { label: 'Reminder', value: 1 },
    ];

    // const [value, setValue] = useState<number>(options[0].value);
    // const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setValue(Number(event.target.value));
    // }

    const [selectedValues, setSelectedValues] = useState<number[]>([]);

    const handleCheckboxChange = (value: number) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(val => val !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };
    // ganti Checkbox alert 10min sebelum event selesai
    return (
        <div className='flex flex-col space-y-2'>
            {options.map(option => (
                <label key={option.value} className='flex items-center space-x-2'>
                    <input
                        type='checkbox'
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        className='form-checkbox h-4 w-4 text-gray-700 rounded-md'
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
        
    );
}

export default Dropdown;
