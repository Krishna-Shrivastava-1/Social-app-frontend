import React, { useEffect, useState } from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { FaRegEnvelope } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { MdOutlinePerson } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import imgmy from '../../assets/myim.png'
import { FiMoreHorizontal } from "react-icons/fi";
import { FaFeather } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
// import { logout } from '../../Firebase/Firebase.js';
import { useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { MdPerson } from "react-icons/md";
import axios from 'axios';
const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const [profile, setProfile] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("Token not found in localStorage");
      return null;
    }

    // console.log("Raw Token:", token);

    try {
      // Split the token into its parts
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error("Invalid token format");
        return null;
      }

      // Decode the payload part manually
      const payload = parts[1];
      const decodedPayload = JSON.parse(atob(payload));  // Decode base64 payload
      // console.log("Decoded Token:", decodedPayload);  // Log the decoded token payload

      // Ensure `id` exists in the decoded payload
      if (decodedPayload && decodedPayload.id) {
        return decodedPayload.id;
      } else {
        console.error("User ID not found in token payload");
        return null;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };


  // console.log(localStorage.getItem('authToken'));



  const fetchUserProfile = async () => {
    const userId = getUserIdFromToken();
    // console.log("Extracted User ID:", userId); // Log the extracted User ID

    if (!userId) {
      console.error("User ID not found in token");
      return;
    }

    try {
      const response = await axios.get(`https://fullstack-mern-9ql7.onrender.com/post/profile/${userId}`, {
        withCredentials: true,  // Send cookies along with the request
      });
      // console.log("Profile Data:", response.data); // Log profile data
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error); // Log any API errors
    }
  };





  useEffect(() => {
    fetchUserProfile();
  }, []);


  const generateColorForName = (name) => {
    // Generate a color based on the ASCII code of the first character
    const charCode = name.charCodeAt(0);
    const r = (charCode * 7) % 255; // Red component
    const g = (charCode * 11) % 255; // Green component
    const b = (charCode * 13) % 255; // Blue component
    return `${r},${g},${b}`;
  };



  return (
    <div className='px-3 h-screen flex  justify-around flex-col fixed top-0' >
      <div onClick={() => navigate('/home')} className='cursor-pointer p-3 rounded-full hover:bg-zinc-800 w-14' >
        <img onClick={() => navigate('/home')} className=' ' src="https://www.anaka.net/logos/x.png" alt="" />
      </div>
      <div className='h-full px-3 w-full lg:block flex flex-col items-start' >
        <div onClick={() => navigate('/home')} className='group cursor-pointer' >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-32 ' >
            {
              location.pathname === '/home' ?
                <MdHomeFilled className='text-white text-3xl' /> :
                <GoHome className='text-white text-3xl' />
            }
            <h1 className='text-white text-xl font-bold hidden lg:block' > Home</h1>
          </div>

        </div>
        <div className='group cursor-pointer' >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-32 ' >
            <IoIosSearch className='text-white text-3xl' />
            <h1 className='text-white text-xl hidden lg:block ' > Explore</h1>
          </div>

        </div>
        <div className='group cursor-pointer' >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-44 ' >
            <GoBell className='text-white text-3xl' />
            <h1 className='text-white text-xl hidden lg:block' > Notification</h1>
          </div>

        </div>
        <div className='group cursor-pointer' >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-44 ' >
            <FaRegEnvelope className='text-white text-3xl' />
            <h1 className='text-white text-xl hidden lg:block' > Messages</h1>
          </div>

        </div>
        <div className='group cursor-pointer' >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-48 ' >
            <BsPeople className='text-white text-3xl' />
            <h1 className='text-white text-xl hidden lg:block' > Communities</h1>
          </div>

        </div>
        <div onClick={() => navigate('/profile')} className='group cursor-pointer' >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-32 ' >
            {
              location.pathname === '/profile' || location.pathname === '/skill' || location.pathname === '/education' || location.pathname === '/media' || location.pathname === 'contactus' ?
                <MdPerson className='text-white text-3xl' /> :
                <MdOutlinePerson className='text-white text-3xl' />
            }
            <h1 className='text-white text-xl hidden lg:block' > Profile</h1>
          </div>

        </div>
        <div className='group cursor-pointer ' >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-32 ' >
            <CiCircleMore className='text-white text-3xl' />
            <h1 className='text-white text-xl hidden lg:block' > More</h1>
          </div>

        </div>
        <div className='group cursor-pointer  ' onClick={handleLogout} >
          <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer flex items-center justify-around lg:w-32 ' >
            <PiSignOutBold className='text-white text-3xl' />
            <h1 className='text-white text-xl hidden lg:block' > Signout</h1>
          </div>

        </div>
        <div className='bg-sky-500 mt-2 mx-3  hover:bg-sky-600 cursor-pointer text-center rounded-full  p-3' >
          <h1 className='text-white hidden lg:block' >Post</h1>
          <h1 className='text-white lg:hidden block' ><FaFeather /></h1>
        </div>

      </div>
      <div className=' hover:bg-zinc-900 cursor-pointer text-left rounded-full  p-3 flex items-center justify-around' >
        {/* <img className='w-16 h-16 rounded-full' src={imgmy} alt="" /> */}
        <div style={{
          backgroundColor: profile
            ? `rgb(${generateColorForName(profile.name)})`
            : "gray", // Default color if profile is null
        }} className='w-12 h-12 rounded-full flex items-center text-2xl justify-center text-white' > {profile ? profile.name[0] : null} </div>
        <div className='flex items-center justify-between' >
          <div className='mx-3 text-balance hidden lg:block' >
            {/* {profile ? (
    <div key={profile._id}>
      <h1>{profile.name}</h1>
      <h1>{profile.email}</h1>
    </div>
  ) : (
    <p>Loading profile...</p>
  )} */}
            <h1 className='text-white text-sm' > {profile ? profile.name : null} </h1>
            <h1 className='text-zinc-600 text-sm' > {profile ? '@' + profile.email.split('@')[0] : null}</h1>
          </div>

          <FiMoreHorizontal className='text-white hidden lg:block text-2xl' />
        </div>

      </div>
    </div>
  )
}

export default Sidebar
