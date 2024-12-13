import React, { useEffect, useState } from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { FaRegEnvelope } from "react-icons/fa6";
import { MdOutlinePerson } from "react-icons/md";
// import { MdOutlinePerson } from "react-icons/md";
import { logout } from '../../Firebase/Firebase.js';
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { MdPerson } from "react-icons/md";

const BottomNavbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
      };
    return (
        <div>
     
                <div className='flex items-center hre justify-between bg-black px-2 p-2 bg-opacity-60 backdrop-blur-lg transition-all duration-300' >
                    <div onClick={() => navigate('/home')} className='group cursor-pointer' >
                        <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer mx-1' >
                            {
                                location.pathname === '/home' ?
                                    <MdHomeFilled className='text-white text-3xl' /> :
                                    <GoHome className='text-white text-3xl' />
                            }

                        </div>

                    </div>
                    <div onClick={()=>navigate('/search')} className='group cursor-pointer' >
                        <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer mx-1' >
                            <IoIosSearch className='text-white text-3xl' />

                        </div>

                    </div>
                    <div className='group cursor-pointer' >
                        <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer mx-1' >
                            <GoBell className='text-white text-3xl' />

                        </div>

                    </div>
                    <div className='group cursor-pointer' >
                        <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer mx-1' >
                            <FaRegEnvelope className='text-white text-3xl' />

                        </div>

                    </div>
                    <div onClick={() => navigate('/profile')} className='group cursor-pointer' >
                        <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer mx-1'  >
                            {
                                location.pathname === '/profile' || location.pathname === '/skill' || location.pathname === '/education' || location.pathname === '/media' || location.pathname === 'contactus' ?
                                    <MdPerson className='text-white text-3xl' /> :
                                    <MdOutlinePerson className='text-white text-3xl' />
                            }

                        </div>

                    </div>
                    <div className='group cursor-pointer  ' onClick={handleLogout} >
                        <div className='group-hover:bg-zinc-800 rounded-full p-2 cursor-pointer mx-1' >
                            <PiSignOutBold className='text-white text-3xl' />

                        </div>

                    </div>
                </div>
            
        </div>
    )
}

export default BottomNavbar
