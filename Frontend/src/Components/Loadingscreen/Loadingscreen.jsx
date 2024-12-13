import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Loadingscreen = () => {
    const [laoding, setlaoding] = useState(false)
    const location = useLocation()
    useEffect(() => {
      setlaoding(true)
      const timer = setTimeout(() => {
        setlaoding(false)
      }, 500);
      return ()=> clearTimeout(timer)
    }, [location.pathname])
    
  return (
    <div>
      {laoding && (
        // <div className='w-full h-screen z-50 bg-black fixed flex justify-center items-center ' >
        //     <img className='w-60' src="https://www.sarkarinaukriexams.com/images/import/sne21299025521.png" alt="" />
        <div
        className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
        style={{
          background: `conic-gradient(#04A3D3 0% 50%, #374151 50% 100%)`, // Yellow will be 50% of the circle
          animation: 'rotateGradient 2s linear infinite', // Apply the rotation animation
        }}
      >
        <div className="absolute bg-zinc-900 w-6 h-6 rounded-full flex items-center justify-center"></div>
      </div>
        // </div>
      )}
    </div>
  )
}

export default Loadingscreen
