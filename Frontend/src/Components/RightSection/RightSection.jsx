import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const RightSection = () => {
    const [allusers, setallusers] = useState([]);
    const [query, setquery] = useState('');
    const navigate = useNavigate();

    // Fetch all users from the API
    const fetchallfunc = async () => {
        try {
            const fetchalluser = await axios.get('https://fullstack-mern-9ql7.onrender.com/post/users');
            setallusers(fetchalluser.data);
            console.log(allusers)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchallfunc();
    }, []);

    // Filter users based on the query
    const filteredUsers = allusers.filter((user) => {
        return (
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
    });

    // Show only the first 5 or 6 users
    const usersToDisplay = filteredUsers.slice(0, 6);
    return (
        <div  className=' fixed top-0 z-30 w-[20%] md:min-w-[30%]' >
            <div className='  p-2 px-3 flex items-center justify-center bg-black  w-full' >
                {
                    location.pathname === '/search' && <img onClick={()=> navigate(-1)} className='w-10 p-1 m-2 mx-2' src="https://www.anaka.net/logos/x.png" alt="" />
                }
                <div className='bg-zinc-800 rounded-full p-2 px-5 flex items-center  justify-center group focus-within:border border-sky-600 focus-within:bg-black w-[75%]' >
                    <IoSearch className='text-2xl text-zinc-500 group-focus-within:text-sky-600' />
                    <input value={query} onInput={(e)=>setquery(e.target.value)} className='border-none outline-none bg-transparent  placeholder:text-zinc-500 text-white px-2 rounded-full' placeholder='Search' type="search" />
                </div>
            </div>
            {/* Display filtered users */}
            <div className=' flex flex-col px-3 items-center justify-center w-full'>
                {usersToDisplay &&
                    [...usersToDisplay].reverse().map(({ _id, name, email, createdAt }) => (
                        <div
                          
                            className='py-2 w-full px-2 hover:bg-zinc-900 transition-all duration-200 text-zinc-600 bg-zinc-950 my-1 rounded-lg cursor-pointer select-none'
                            key={_id}
                        >
                            <div className='flex items-center justify-between'>
                                <h1 className='text-lg text-zinc-500'>{name}</h1>
                                <div className='flex flex-col items-start  mr-2'>
                                    <p className='text-sm text-right'>{'@' + email.split('@')[0]}</p>
                                    <p className='text-sm text-right text-nowrap'>Joined in{new Date(createdAt).toLocaleDateString()}</p>
                                    
                                </div>
                                <div   onClick={() => navigate(`/otheruser/${_id}`)} className='rounded-full cursor-pointer text-nowrap select-none bg-white text-black px-1 hover:bg-gray-300 transition-all duration-300' ><h4>View Profile</h4></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RightSection
