import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Centersection from '../../Components/Centersection/Centersection'
import RightSection from '../../Components/RightSection/RightSection'
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar'
import axios from 'axios'
// import { logout } from '../../Firebase/Firebase.js'
// import * as jwt_decode from 'jwt-decode';
// import jwt_decode from 'jwt-decode';



const Homepage = () => {


  // const [profile, setProfile] = useState(null);

  // const getUserIdFromToken = () => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) {
  //     console.error("Token not found in localStorage");
  //     return null;
  //   }
  
  //   console.log("Raw Token:", token);
  
  //   try {
  //     // Split the token into its parts
  //     const parts = token.split('.');
  //     if (parts.length !== 3) {
  //       console.error("Invalid token format");
  //       return null;
  //     }
  
  //     // Decode the payload part manually
  //     const payload = parts[1];
  //     const decodedPayload = JSON.parse(atob(payload));  // Decode base64 payload
  //     console.log("Decoded Token:", decodedPayload);  // Log the decoded token payload
  
  //     // Ensure `id` exists in the decoded payload
  //     if (decodedPayload && decodedPayload.id) {
  //       return decodedPayload.id;
  //     } else {
  //       console.error("User ID not found in token payload");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     return null;
  //   }
  // };
  
  
  // // console.log(localStorage.getItem('authToken'));

  
  
  // const fetchUserProfile = async () => {
  //   const userId = getUserIdFromToken();
  //   console.log("Extracted User ID:", userId); // Log the extracted User ID
  
  //   if (!userId) {
  //     console.error("User ID not found in token");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get(`http://localhost:5550/post/profile/${userId}`, {
  //       withCredentials: true,  // Send cookies along with the request
  //     });
  //     console.log("Profile Data:", response.data); // Log profile data
  //     setProfile(response.data);
  //   } catch (error) {
  //     console.error("Error fetching profile:", error); // Log any API errors
  //   }
  // };
  
  
  
  

  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);
  // console.log(profile.name || 'nothing');

  return (
    <div>
       {/* {profile ? (
    <div key={profile._id}>
      <h1>{profile.name}</h1>
      <h1>{profile.email}</h1>
    </div>
  ) : (
    <p>Loading profile...</p>
  )} */}
      <div className='flex ' >
        <div className='lg:w-[27%] w-[15%] hidden sm:block  border-zinc-700 h-screen sticky top-0 ' >
          <Sidebar />
        </div>
        <div className='lg:w-[45%] sm:w-[85%] w-[100%]  border-zinc-700 h-screen sticky top-0 ' >
          <Centersection />

        </div>
        <div className='w-[27%] hidden lg:block  border-zinc-700 sticky top-0' >
          <RightSection />
        </div>

      </div>
      <div className='fixed sm:hidden  bottom-0 w-full' >
        <BottomNavbar />
      </div>
    </div>

  )
}

export default Homepage
