import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AILogin from '../../ComponentPage2/AILogin';
import AIRecom from "../../ComponentPage2/AIRecom";
import DailySummary from "../../ComponentPage2/DailySummary";

const Activity = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchGarminCredentials = async () => {
            try {
                const userIdFromStorage = localStorage.getItem('user');
                if (!userIdFromStorage) {
                    return;
                }
                const response = await axios.get(`http://localhost:5001/api/calendar/get-credential?user_id=${userIdFromStorage}`);
                const { data } = response;

                if (data && data.garmin && data.passwordGarmin) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error fetching Garmin credentials:', error);
            }
        };

        fetchGarminCredentials();
    }, []);

    const handleLogin = (username: string) => {
        console.log(`User logged in: ${username}`);
        setIsLoggedIn(true);
    };

    return (
        <div className="flex flex-row gap-5 h-screen m-5">
            <DailySummary />
            <div className="w-1/3 h-full">
                {isLoggedIn ? <AIRecom /> : <AILogin onLogin={handleLogin} />}
            </div>
        </div>
    );
};

export default Activity;
