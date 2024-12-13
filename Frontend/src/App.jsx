// import React, { useEffect } from 'react'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-loading-skeleton/dist/skeleton.css'
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import Loginpage from './Pages/Loginapage/Loginpage';
// import Homepage from './Pages/Homepage/Homepage';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './Firebase/Firebase.js';
// import Profilepage from './Pages/Profilpage/Profilepage.jsx';
// import Skillspage from './Pages/Skillspage/Skillspage.jsx';
// import Education from './Pages/Educationpage/Education.jsx';
// import Loadingscreen from './Components/Loadingscreen/Loadingscreen.jsx';
// import Allloader from './Components/AllLoader/Allloader.jsx';
// const App = () => {
//   const navigate = useNavigate()
//   const location =useLocation()

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         if (location.pathname === '/') {
//           navigate('/home'); 
//         }
//       } else {
//         if (location.pathname !== '/') {
//           navigate('/'); 
//         }
//       }
//     });
//     return () => unsub();
//   }, [navigate, location.pathname]);
  
  
//   return (
//     <div>
//       <ToastContainer/>
//       <Allloader/>
//       <Routes>
//         <Route path='/' element={<Loginpage/>} />
//         <Route path='/home' element={<Homepage/>} />
//         <Route path='/profile' element={<Profilepage/>} />
//         <Route path='/skill' element={<Skillspage/>} />
//         <Route path='/education' element={<Education/>} />
//       </Routes>
//     </div>
//   )
// }

// export default App


import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Loginpage from "./Pages/Loginapage/Loginpage";
import Homepage from "./Pages/Homepage/Homepage";

import Profilepage from "./Pages/Profilpage/Profilepage.jsx";
import Skillspage from "./Pages/Skillspage/Skillspage.jsx";
import Education from "./Pages/Educationpage/Education.jsx";
import Allloader from "./Components/AllLoader/Allloader.jsx";
// import Contact from "./Components/Contactus/Contactus.jsx";
import Contactuspage from "./Pages/Contactuspage/Contactuspage.jsx";
import Mediapage from "./Pages/Mediapage/Mediapage.jsx";
import Otheruserpost from "./Pages/OtherUserprofile/Otheruserpost.jsx";
import Searchpage from "./Pages/SearchOtherpage/Searchpage.jsx";
import {SnackbarProvider} from 'notistack'
import Followingpage from "./Pages/Followingpage/Followingpage.jsx";
import TextEditor from "./Pages/TextEditor/TextEditor.jsx";
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  
  useEffect(() => {
    // Loader Logic
    const specificRoutes = ["/home", "/profile"];
    if (specificRoutes.includes(location.pathname)) {
      setShowLoader(true);
      const timer = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
useEffect(() => {
 const authtoken = localStorage.getItem("authToken") 
 if (authtoken) {
  if (location.pathname === '/') {
    navigate('/home')
  }
 }else{
  if (location.pathname !='/') {
    navigate('/')
  }
 }
}, [location.pathname,navigate])


  return (
   
    
      <SnackbarProvider
      maxSnack={3} // Set the max number of snackbars that can be shown at the same time
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {/* Conditional rendering for loader */}
      {showLoader && <Allloader />}
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/skill" element={<Skillspage />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contactus" element={<Contactuspage />} />
        <Route path="/media" element={<Mediapage />} />
        <Route path="/otheruser/:id" element={<Otheruserpost />} />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/following" element={<Followingpage />} />
        <Route path="/textedi" element={<TextEditor />} />
      </Routes>
    </SnackbarProvider>
   
  );
};

export default App;
