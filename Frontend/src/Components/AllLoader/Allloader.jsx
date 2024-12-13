import React, { useEffect ,useState} from 'react'
import { useLocation } from 'react-router-dom'
const Allloader = () => {
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
       <div className='w-full h-screen z-50 bg-black fixed flex justify-center items-center ' >
   <img className='w-60' src="https://www.sarkarinaukriexams.com/images/import/sne21299025521.png" alt="" />
       {/* <div>
             <p className='text-white' >     </p>
       </div> */}
        
       </div>
    )}
  </div>
  )
}

export default Allloader
