import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Validate email format
      if (!validateEmail(email)) {
        setError('Invalid email format. Please enter a valid email.');
        return;
      }

      // Make API call to login endpoint with email and password
      const response = await axios.post('https://bursting-gelding-24.hasura.app/api/rest/get-user-id', {
        email,
        password,
      });
      const user = response.data;

      // Assuming the response contains the user data
      if (user && user.userId) {
        // Set the user data in the parent component (e.g., App.js)
        setUser(user);
        setError(''); // Clear any previous error message
      } else {
        // Handle login failure (optional)
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle API call errors
      setError('Error occurred while logging in. Please try again later.');
    }
  };

  // Email format validation function
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
