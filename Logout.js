import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = ({ setUser }) => {
  const history = useHistory();

  const handleLogout = () => {
    // Show a confirmation pop-up for the action
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Clear the user data to log out
      setUser(null);

      // Redirect the user to the login page
      history.push('/login');
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
