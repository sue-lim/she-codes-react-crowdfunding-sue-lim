// UNDER CONSTRUCTION 

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function ProfilePage() {
  // State
  const [userData, setUserData] = useState();

  // Hooks
  const { id } = useParams();

  // Actions and Helpers
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}users/${id}`
        );
        console.log(res);

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);
 

  // Loading State
  if (!userData) {
    return <h3>Loading user profile....</h3>;
  }

  // Normal State
  return (
    <main>
      <div classNameName="profile-data">
        <h3>{profileData.username}</h3>
       
          <h3>User Details</h3>
          <ul>
            {/* <li>Bio: {userData.bio}</li>
            <li>Social: {userData.social}</li> */}
          </ul>
      </div>


      {/* <div classNameName="user-badges">
        <h3>Badges</h3>
      </div>

      <div classNameName="user-projects">
        <h3>List of projects or pledges...</h3>
      </div> */}

    </main>
  );
}

export default ProfilePage;