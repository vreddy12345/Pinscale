import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(null); // Initialize profileData as null

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Make API call to get user profile data
        const response = await axios.get(
          `https://bursting-gelding-24.hasura.app/api/rest/profile?userId=${user.id}`
        );
        const profileData = response.data;
        setProfileData(profileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [user]);

  if (!profileData) {
    // If profileData is null (still loading), show a loading message or spinner
    return <div>Loading profile data...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        {/* Placeholder icon, replace with actual profile icon */}
        <img
          src="https://example.com/profile-icon.png"
          alt="Profile Icon"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      </div>
      <p>Name: {profileData.name || 'N/A'}</p>
      <p>Username: {profileData.username || 'N/A'}</p>
      <p>Email: {profileData.email || 'N/A'}</p>
      <p>Date of Birth: {profileData.dateOfBirth || 'N/A'}</p>
    </div>
  );
};

export default Profile;
