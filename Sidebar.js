import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const isAdmin = user && user.role === 'admin';

  return (
    <div>
      {user && (
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {isAdmin ? (
              <>
                <li>
                  <Link to="/all-transactions">All Transactions</Link>
                </li>
                <li>
                  {/* Add more admin-specific links here if needed */}
                  {/* <Link to="/other-admin-link">Other Admin Link</Link> */}
                </li>
              </>
            ) : (
              <li>
                <Link to="/your-transactions">Your Transactions</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
