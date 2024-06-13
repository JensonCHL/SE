import React, { useState } from 'react';

interface RepeatButtonProps {
    repeat: number;
    setRepeat: (value: number) => void;
}

const RepeatButton: React.FC<RepeatButtonProps> = ({ repeat, setRepeat }) => {
    const options = [
        { label: 'Repeat', value: -1 },
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
    ];

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(event.target.value);
        setRepeat(selectedValue);
    };

    return (
        <select value={repeat} onChange={handleSelect} className="form-select w-full bg-gray-300 px-2 py-1 rounded-md">
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default RepeatButton;
