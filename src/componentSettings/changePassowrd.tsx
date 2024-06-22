import React, { useState } from 'react';
import axios from 'axios'; // Assuming you might need axios for the API call

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const userId = localStorage.getItem('user')

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/calendar/change-password', {
                userId: localStorage.getItem('user'),
                currentPassword: password,
                newPassword: newPassword,
                reNewPassword: reNewPassword
            });
            console.log(response)
            console.log('Password change response:', response.data);
            alert('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password');
        }

        
        // Clear the form after submission
        setPassword('');
        setNewPassword('');
        setReNewPassword('');

    };

    return (
        <div className="flex flex-col bg-white w-full h-full rounded-[15px] p-10">
            <h2 className="text-2xl font-bold mb-5">Change Password</h2>
            <form onSubmit={handleUpdateEvent}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Current Password
                    </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        New Password
                    </label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm New Password
                    </label>
                    <input 
                        type="password" 
                        value={reNewPassword} 
                        onChange={(e) => setReNewPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
