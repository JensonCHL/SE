import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './axiosConfig'; // Import your Axios instance

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // State to handle error messages
  const navigate = useNavigate();

  const handleSubmitReg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:5001/api/calendar/create-user', { name, email, password });
      console.log(result.data); // Log the response for debugging
      navigate('/login'); // Redirect to login page on successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle registration error (e.g., show error message to user)
      setError(error.response?.data?.error || 'Failed to register user');
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="max-h-screen flex flex-col">
      <div className="flex justify-center items-center bg-gray-200 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
          <div>
            <h2 className="text-2xl font-bold mb-6">Register</h2>
          </div>
          <form onSubmit={handleSubmitReg}>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Display error message if there is any */}

            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
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
              Register
            </button>
          </form>
          <p className="mt-4 text-center">Already Have An Account?</p>
          <Link to="/login" className="block bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-2 text-center w-full">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
