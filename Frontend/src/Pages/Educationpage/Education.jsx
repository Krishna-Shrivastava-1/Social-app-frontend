import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Centersection from '../../Components/Centersection/Centersection'
import RightSection from '../../Components/RightSection/RightSection'
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar'

const Education = () => {
  return (
    <div>
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

export default Education
