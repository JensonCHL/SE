import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // State to handle error messages
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/calendar/loginUser', { email, password });
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      // const session = JSON.parse(localStorage.getItem('user'));

      if (response.data.message === 'Login successful') {
        navigate('/home'); // Navigate to home route on successful login
      } else {
        setError('Incorrect email or password'); // Set error message if login fails
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please try again.'); // Set generic error message for any other errors
    }
  };

  return (
    <div className="max-h-screen flex flex-col">
      <div className="flex justify-center items-center bg-gray-200 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Display error message if there is any */}
            <div className="mb-4">
              <label htmlFor="username" className="block font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                id="username"
                placeholder="Enter Email"
                autoComplete="off"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">Don't have an account?</p>
          <Link to="/register" className="block bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-2 text-center w-full">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
