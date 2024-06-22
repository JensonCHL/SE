import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface LoginProps {
    onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [garmin, setGarmin] = useState<string>('');
    const [passwordGarmin, setPasswordGarmin] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('user');
        if (userIdFromStorage) {
            setUserId(userIdFromStorage);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5001/api/calendar/update-register/${userId}`, {
                garmin,
                passwordGarmin,
            });

            const data = response.data;
            console.log('Register entry updated successfully:', data);

            // Notify parent component (Activity) about successful login
            onLogin(userId); // Pass the userId or username as needed
        } catch (error) {
            console.error('Error updating register entry:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleGarminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGarmin(e.target.value);
    };

    const handlePasswordGarminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordGarmin(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto shadow-md p-6 rounded-md bg-white">
            <div className="text-center mb-4">Health Integration</div>
            <div className="text-center mb-4">Garmin Connect</div>

            <div className="mb-4">
                <label htmlFor="garmin" className="block text-gray-700">Garmin Email:</label>
                <input
                    type="text"
                    id="garmin"
                    value={garmin}
                    onChange={handleGarminChange}
                    className="w-full border rounded-md mt-2 px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="passwordGarmin" className="block text-gray-700">Garmin Password:</label>
                <input
                    type="password"
                    id="passwordGarmin"
                    value={passwordGarmin}
                    onChange={handlePasswordGarminChange}
                    className="w-full border rounded-md mt-2 px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Update</button>
        </form>
    );
};

export default Login;
