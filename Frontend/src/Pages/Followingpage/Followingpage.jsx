import React, { useEffect, useState } from 'react'
import Centersection from '../../Components/Centersection/Centersection'
import RightSection from '../../Components/RightSection/RightSection'
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import axios from 'axios'

const Followingpage = () => {

  const [following, setfollowing] = useState([])

  const token = localStorage.getItem('token')
  const fetchingfollowing = async () => {
    try {
      const respo = await axios.get(`https://fullstack-mern-9ql7.onrender.com/post/following`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Follow response:', respo.data);

      if (respo.data.success) {
        setfollowing(true);
        console.log(following)  // Set to true if the follow is successful
      }
    } catch (error) {
      console.error('Error following user:', error.response?.data || error.message);
    }
  }
useEffect(() => {
fetchingfollowing()
}, [])

  return (
    <div>
      <div className='flex ' >
        <div className='lg:w-[27%] w-[15%] hidden sm:block  border-zinc-700 h-screen sticky top-0 ' >
          <Sidebar />
        </div>
        <div className='lg:w-[45%] sm:w-[85%] w-[100%]  border-zinc-700 h-screen sticky top-0 ' >
          <Centersection />

        </div>
        <div className='w-[27%] hidden lg:block  border-zinc-700 sticky top-0 ' >
          <RightSection />
        </div>

      </div>
      <div className='fixed sm:hidden  bottom-0 w-full' >
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Followingpage
