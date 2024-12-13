import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import bluetick from '../../assets/bluetick.png'
import banner from '../../assets/Black Modern Personal LinkedIn Banner (1).png'
import Loadingscreen from '../Loadingscreen/Loadingscreen'
import Contact from '../Contactus/Contactus'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
// import { FaArrowLeft } from "react-icons/fa";
import myim from '../../assets/myim.png';

import myimg from '../../assets/myim.png'
import axios from 'axios'
const Otherprofilecenterdection = ({ otherprofilename, otherprofilecreatedAt, otherprofileemail, userident, handlelike, handleunlike, allpost }) => {
    const [loader, setloader] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const [text, settext] = useState('')
    const [profileData, setProfileData] = useState(null);
    const { id } = useParams()
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    // Fetch posts by userId
    const fetchUserPosts = async () => {
        const userId = userident;

        try {
            setLoading(true);
            const response = await axios.get(`https://fullstack-mern-9ql7.onrender.com/post/user/${userId}`); // Replace with dynamic user ID if needed
            // const response = await axios.get('http://localhost:5550/post/user/674bf32194c5159991cd36e1'); // Replace with dynamic user ID if needed
            if (response.data.length === 0) {
                setError('No posts found for this user');
            } else {
                setUserPosts(response.data);
                // console.log(userPosts)
            }
        } catch (error) {
            setError('Error fetching user posts');
            console.error('Error fetching user posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts(); // Fetch the posts when the component mounts
    }, []);
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




    const loggedInUserId = getUserIdFromToken()

    const token = localStorage.getItem('token')
    const [isFollowing, setIsFollowing] = useState(true);
    useEffect(() => {
        // Prevent user from following themselves
        if (id === loggedInUserId) {
            setIsFollowing(false);  // Don't allow the logged-in user to follow themselves
            return;
        }

        // Fetch follow status from the backend
        const checkFollowStatus = async () => {
            try {
                const res = await axios.get(`https://fullstack-mern-9ql7.onrender.com/post/follow-status/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsFollowing(res.data.isFollowing);
                console.log(isFollowing)
            } catch (error) {
                console.error('Error fetching follow status:', error.response?.data || error.message);
            }
        };

        checkFollowStatus();
    }, [id, token, loggedInUserId]);

    // Follow user
    const handleFollow = async (targetUserId) => {
        try {
            const res = await axios.put(`https://fullstack-mern-9ql7.onrender.com/post/follow/${targetUserId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Follow response:', res.data);
        } catch (error) {
            console.error('Error following user:', error.response?.data || error.message);
        }
    };

    const handleUnfollow = async (targetUserId) => {
        try {
            const res = await axios.put(`https://fullstack-mern-9ql7.onrender.com/post/unfollow/${targetUserId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Unfollow response:', res.data);
        } catch (error) {
            console.error('Error unfollowing user:', error.response?.data || error.message);
        }
    };
    const generateColorForName = (name) => {
        // Generate a color based on the ASCII code of the first character
        const charCode = name.charCodeAt(0);
        const r = (charCode * 7) % 255; // Red component
        const g = (charCode * 11) % 255; // Green component
        const b = (charCode * 13) % 255; // Blue component
        return `${r},${g},${b}`;
    };

    return (
        <div>
            <div className='border-l-[0.5px] border-zinc-700 border-r-[0.5px]' >
                <div className='sticky top-0 z-50 w-full bg-[#00000067] backdrop-blur-lg p-2' >
                    <div className='flex items-center justify-start gap-3' >
                        <div onClick={() => navigate(-1)} className='p-2 rounded-full cursor-pointer hover:bg-zinc-800' >
                            <FaArrowLeft className='text-white text-lg cursor-pointer ' />
                        </div>
                        <div className='text-white select-none ' >
                            <h1>{otherprofilename}</h1>
                        </div>
                    </div>

                </div>
                <div >
                    <div className='relative mb-20' >
                        <img className='min-h-32' src={banner} alt="" />
                        <div className='absolute -bottom-16 left-7' >
                            {/* <img className='w-28 h-28 rounded-full border-4 border-black' src={myimg} alt="" /> */}
                            <div style={{
                                backgroundColor: otherprofilename
                                    ? `rgb(${generateColorForName(otherprofilename)})`
                                    : "gray", // Default color if profile is null
                            }} className='w-28 h-28 rounded-full flex items-center text-3xl justify-center text-white' > {otherprofilename ? otherprofilename[0] : null} </div>
                        </div>
                    </div>
                    <div>
                        <div className='p-2 px-6 flex items-start gap-3 justify-start' >
                            <div>
                                <h1 className='text-white text-lg' >{otherprofilename}</h1>
                                <p className='text-zinc-600' >{'@' + otherprofileemail.split('@')[0]} <span>
                                    <p>
                                        Joined in: {new Date(otherprofilecreatedAt).toLocaleString()}
                                    </p>
                                </span> </p>
                            </div>
                            <div className='flex items-center justify-center border border-zinc-600 rounded-full px-2 mx-2 cursor-pointer md:w-28 w-44  hover:bg-zinc-900' >
                                <img className='w-6' src={bluetick} alt="" />
                                <p className='text-white text-sm text-nowrap' >Get verified</p>
                            </div>
                            <div>
                                <button
                                    className='text-black bg-white px-2 py-1 cursor-pointer select-none hover:bg-gray-300 font-semibold rounded-full'
                                    onClick={() => isFollowing ? handleUnfollow(id) : handleFollow(id)}
                                    disabled={id === loggedInUserId}  // Disable button if the user is trying to follow themselves
                                >
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between text-white border-b-[0.5px] border-zinc-700' >
                                <div className='cursor-pointer hover:bg-zinc-800 p-1 py-2 w-full flex items-center justify-center transition-all duration-200' >
                                    {
                                        location.pathname === `/otheruser/${userident}` ?
                                            <h4 className='underline decoration-sky-600 decoration-4 underline-offset-8' >Posts</h4> :
                                            <h4  >Posts</h4>
                                    }

                                </div>
                                <div onClick={() => navigate('/skill')} className='cursor-pointer hover:bg-zinc-800 p-1 py-2 w-full flex items-center justify-center transition-all duration-200' >
                                    {
                                        location.pathname === '/skill' ?
                                            <h4 className='underline decoration-sky-600 decoration-4 underline-offset-8' >Replies</h4> :
                                            <h4  >Replies</h4>
                                    }
                                </div>
                                <div onClick={() => navigate('/education')} className='cursor-pointer hover:bg-zinc-800 p-1 py-2 w-full flex items-center justify-center transition-all duration-200' >
                                    {
                                        location.pathname === '/education' ?
                                            <h4 className='underline decoration-sky-600 decoration-4 underline-offset-8' >Highlights</h4> :
                                            <h4  >Highlights</h4>
                                    }
                                </div>
                                <div onClick={() => navigate('/contactus')} className='cursor-pointer hover:bg-zinc-800 p-1 py-2 w-full flex items-center justify-center transition-all duration-200' >
                                    {
                                        location.pathname === '/contactus' ?
                                            <h4 className='underline decoration-sky-600 decoration-4 underline-offset-8 text-nowrap whitespace-nowrap' >Articles</h4> :
                                            <h4 className='text-nowrap whitespace-nowrap' >Articles</h4>
                                    }
                                </div>

                                <div onClick={() => navigate('/media')} className='cursor-pointer hover:bg-zinc-800 p-1 py-2 w-full flex items-center justify-center transition-all duration-200' >
                                    {
                                        location.pathname === '/media' ?
                                            <h4 className='underline decoration-sky-600 decoration-4 underline-offset-8 text-nowrap whitespace-nowrap' >Media</h4> :
                                            <h4  >Media</h4>
                                    }
                                </div>
                                <div onClick={() => navigate('/likes')} className='cursor-pointer hover:bg-zinc-800 p-1 py-2 w-full flex items-center justify-center transition-all duration-200' >
                                    {
                                        location.pathname === '/likes' ?
                                            <h4 className='underline decoration-sky-600 decoration-4 underline-offset-8 text-nowrap whitespace-nowrap' >Likes</h4> :
                                            <h4  >Likes</h4>
                                    }
                                </div>

                            </div>


                        </div>
                        <div>
                            {
                                userPosts && userPosts.length > 0 ? (
                                    userPosts.map(({ description, creatdat, _id, likes }) => (
                                        <div
                                            key={_id}
                                            className="flex flex-col hover:bg-[#27272a52] p-3 border-b-[0.5px] border-zinc-700 px-4"
                                        >
                                            <div className="flex items-center justify-start gap-2 flex-wrap">
                                                {/* <img className="w-16 h-16 rounded-full" src={myim} alt="Profile" /> */}
                                                <div style={{
                                                    backgroundColor: otherprofilename
                                                        ? `rgb(${generateColorForName(otherprofilename)})`
                                                        : "gray", // Default color if profile is null
                                                }} className='w-16 h-16 rounded-full flex items-center text-2xl justify-center text-white' > {otherprofilename ? otherprofilename[0] : null} </div>
                                                <h3>
                                                    <span className="text-white hover:underline cursor-pointer">
                                                        {otherprofilename}
                                                    </span>
                                                    <p className="text-zinc-700">
                                                        {'@' + otherprofileemail.split('@')[0]}
                                                    </p>
                                                </h3>
                                            </div>
                                            <div className="m-2">
                                                <p className="text-white my-4">{description}</p>
                                            </div>
                                            <p className="text-zinc-600 text-right">
                                                {new Date(creatdat).toLocaleString()}
                                            </p>
                                            <div className="flex">
                                                {likes.includes(getUserIdFromToken()) ? (
                                                    <div
                                                        onClick={() => handleunlike(_id, getUserIdFromToken())}
                                                        className="text-zinc-400 flex items-center gap-1 cursor-pointer select-none rounded-full p-1 group hover:bg-[#ff4d9d54]"
                                                    >
                                                        <IoHeart className="text-pink-600 text-3xl group-hover:bg-[#ff4d9d44] rounded-full bg-opacity-65 cursor-pointer select-none p-1" />
                                                        {likes.length}
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => handlelike(_id, getUserIdFromToken())}
                                                        className="text-zinc-600 flex items-center gap-1 cursor-pointer select-none rounded-full p-1 hover:bg-[#ff4d9d54]"
                                                    >
                                                        <IoIosHeartEmpty className="text-zinc-500 text-3xl hover:bg-[#ff4d9d54] rounded-full bg-opacity-65 cursor-pointer select-none p-1" />
                                                        {likes.length > 0 && <span>{likes.length}</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-white">Nothing to see here yet</p>
                                )
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otherprofilecenterdection
