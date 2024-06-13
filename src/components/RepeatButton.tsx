import React, { useState } from 'react';

interface Option {
    label: string;
    value: number;
}

const Dropdown: React.FC = () => {
    const options: Option[] = [
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
    ];
    // Repeat event 5 menit sebelum event selesai repeat event 
    const [selectedValues, setSelectedValues] = useState<number[]>([]);

    const [value, setValue] = useState<number>(options[0].value);
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(Number(event.target.value));
    }
    return (
        <div className='flex flex-col space-y-2'>
            <select className='form-select w-full bg-gray-300 px-2 py-1 rounded-md items-center ' onChange={handleSelect} value={value}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

        </div>
    );
}

export default Dropdown;
