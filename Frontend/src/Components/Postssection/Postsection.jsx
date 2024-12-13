import React, { useEffect, useState } from 'react';
import myim from '../../assets/myim.png';
import blutick from '../../assets/bluetick.png';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
const Postsection = ({ sendpostfunc }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const [allPosts, setAllPosts] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



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



  // Fetch all posts for '/home'
  const retrieveAllPosts = async () => {
    try {
      const response = await axios.get('https://fullstack-mern-9ql7.onrender.com/post');
      setAllPosts(response.data);
    } catch (error) {
      setError('Error fetching all posts');
      console.error('Error retrieving posts:', error);
    }
  };




  // Fetch user profile
  const fetchUserProfile = async (userId) => {
    if (profileData[userId]) return; // Avoid re-fetching profile data
    try {
      const response = await axios.get(`https://fullstack-mern-9ql7.onrender.com/post/profile/${userId}`, { withCredentials: true });
      setProfileData((prevState) => ({
        ...prevState,
        [userId]: response.data,
      }));

      // console.log("hey", profileData)
    } catch (error) {
      setError('Error fetching user profile');
      console.error('Error fetching user profile:', error);
    }
  };

  // Fetch posts by userId
  const fetchUserPosts = async () => {
    const userId = getUserIdFromToken();

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
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (location.pathname === '/home') {
      retrieveAllPosts();
    }
  }, [location.pathname, sendpostfunc]);

  // Fetch profiles for users in allPosts only after posts are retrieved
  useEffect(() => {
    if (location.pathname === '/home' && allPosts.length > 0) {
      allPosts.forEach((post) => {
        if (post.user) fetchUserProfile(post.user);
      });
    }
  }, [allPosts, sendpostfunc]); // Remove location.pathname dependency to avoid re-triggering on path change

  useEffect(() => {
    if (location.pathname === '/profile') {
      const userId = location.state?.user; // Getting the userId from the state object
      if (userId) {
        fetchUserPosts(); // Fetch posts for the specific user
        fetchUserProfile(userId); // Also fetch the user's profile
      }
    }
  }, [location.pathname]);


  const [profile, setProfile] = useState(null);
  const fetchUsersingleProfile = async () => {
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
    fetchUsersingleProfile();

  }, []);

  // console.log( "hey",allPosts)



  // const handleLike = async (postId, userId) => {
  //   try {
  //     // Send POST request to backend with postId and userId
  //     const response = await axios.put(`http://localhost:5550/post/likeuser/${postId}/like`, { userId });

  //     console.log(response.data.message); // Display response from server
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Error response:', error.response.data.message);
  //     } else {
  //       console.error('Error:', error.message);
  //     }
  //   }
  // };


  // const handleUnlike = async (postId, userId) => {
  //   try {
  //     const response = await fetch(`http://localhost:5550/post/dislike/${postId}/unlike`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userId }),
  //     });
  //     const data = await response.json();
  //     console.log(data.message); // Success message
  //   } catch (error) {
  //     console.error('Error unliking post:', error);
  //   }
  // };


  const handleLike = async (postId, userId) => {
    try {
      const response = await axios.put(`https://fullstack-mern-9ql7.onrender.com/post/likeuser/${postId}/like`, { userId });
      // console.log(response.data.message);

      // Update the post in allPosts state
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: [...post.likes, userId] } // Add userId to likes
            : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error.message);
    }
  };

  const handleUnlike = async (postId, userId) => {
    try {
      const response = await axios.put(`https://fullstack-mern-9ql7.onrender.com/post/dislikeuser/${postId}/unlike`, { userId });
      // console.log(response.data.message);

      // Update the post in allPosts state
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.filter((id) => id !== userId) } // Remove userId from likes
            : post
        )
      );
    } catch (error) {
      console.error('Error unliking post:', error.message);
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
      {/* {error && <p>{error}</p>} */}

      {location.pathname === '/home' && (
        <>
          {allPosts.length > 0 ? (
            [...allPosts].reverse().map((post) => (
              <div
                key={post._id}
                className="flex flex-col hover:bg-[#27272a52] p-3 border-b-[0.5px] border-zinc-700 px-4"
              >
                {/* {console.log(handleLike())} */}
                <div className="flex items-center justify-start gap-2 flex-wrap">
                  {/* <img className="w-16 h-16 rounded-full" src={myim} alt="Profile" /> */}
                  {
                    profileData[post.user] ? (
                      <>
                        <div style={{
                          backgroundColor: `rgb(${generateColorForName(
                            profileData[post.user].name
                          )})`
                        }} className='w-12 text-2xl h-12 rounded-full flex items-center justify-center text-zinc-100' > {
                            profileData[post.user].name[0]} </div>

                      </>
                    ) : null
                  }

                  <h3>
                    {profileData[post.user] ? (
                      <>
                        <span onClick={() => navigate(`/otheruser/${post.user}`)} className="text-white hover:underline cursor-pointer">
                          {profileData[post.user].name}
                        </span>


                        <p className="text-zinc-700">{'@' + profileData[post.user].email.split('@')[0]}</p>
                      </>
                    ) : (
                      <p className="text-zinc-700">Loading user...</p>
                    )}
                  </h3>
                  <img className="w-10 h-10 rounded-full" src={blutick} alt="Blue Tick" />
                </div>
                <div className="m-2">
                  <p className="text-white my-4">{post.description}</p>
                </div>
                <p className="text-zinc-600 text-right">{new Date(post.creatdat).toLocaleString()}</p>

                <div className="flex">
                  {post.likes.includes(getUserIdFromToken()) ? (
                    // If liked, show filled heart and call handleUnlike
                    <div onClick={() => handleUnlike(post._id, getUserIdFromToken())} className='text-zinc-400 flex items-center gap-1 cursor-pointer select-none rounded-full p-1 group hover:bg-[#ff4d9d54]' >
                      <IoHeart

                        className="text-pink-600 text-3xl group-hover:bg-[#ff4d9d44] rounded-full bg-opacity-65 cursor-pointer select-none p-1"
                      /> {post.likes.length}
                    </div>

                  ) : (
                    // If not liked, show hollow heart and call handleLike
                    <div onClick={() => handleLike(post._id, getUserIdFromToken())} className='text-zinc-600 flex items-center gap-1 cursor-pointer select-none rounded-full p-1 hover:bg-[#ff4d9d54]' >
                      <IoIosHeartEmpty

                        className="text-zinc-500 text-3xl hover:bg-[#ff4d9d54] rounded-full bg-opacity-65 cursor-pointer select-none p-1"
                      /> {post.likes.length > 0 && <span>{post.likes.length}</span>}
                    </div>

                  )}
                </div>



              </div>
            ))
          ) : (
            <p className='text-white text-center' >No posts available</p>
          )}
        </>
      )}

      {location.pathname === '/profile' && (
        <>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            userPosts.length > 0 ? (
              [...userPosts].reverse().map((post) => (
                <div
                  key={post._id} // Ensure a unique key for each post
                  className="flex flex-col hover:bg-[#27272a52] p-3 border-b-[0.5px] border-zinc-700 px-4"
                >
                  {/* {console.log("uhy", post._id)} */}
                  <div className="flex items-center justify-start gap-2 flex-wrap">
                    {/* <img className="w-16 h-16 rounded-full" src={myim} alt="Profile" /> */}
                    <div style={{
                      backgroundColor: profile
                        ? `rgb(${generateColorForName(profile.name)})`
                        : "gray", // Default color if profile is null
                    }} className='w-12 h-12 rounded-full flex items-center text-2xl justify-center text-white' > {profile ? profile.name[0] : null} </div>
                    <h3>
                      <span className="text-white hover:underline cursor-pointer">
                        {profile ? profile.name : null} {/* Ensure user data is present */}
                      </span>
                      <p className="text-zinc-700">{profile ? '@' + profile.email.split('@')[0] : null}</p>

                    </h3>
                    <img className="w-10 h-10 rounded-full" src={blutick} alt="Blue Tick" />
                  </div>
                  <div className="m-2">
                    <p className="text-white my-4">{post.description}</p>
                    <p className='text-zinc-600 text-right' >
                      Posted at: {profile && profile.createdAt ? new Date(profile.createdAt).toLocaleString() : null}
                    </p>
                    <div className="flex">
                      {post.likes.includes(getUserIdFromToken()) ? (
                        // If liked, show filled heart and call handleUnlike
                        <div onClick={() => handleUnlike(post._id, getUserIdFromToken())} className='text-zinc-400 flex items-center gap-1 cursor-pointer select-none rounded-full p-1 group hover:bg-[#ff4d9d54]' >
                          <IoHeart

                            className="text-pink-600 text-3xl group-hover:bg-[#ff4d9d44] rounded-full bg-opacity-65 cursor-pointer select-none p-1"
                          /> {post.likes.length}
                        </div>

                      ) : (
                        // If not liked, show hollow heart and call handleLike
                        <div onClick={() => handleLike(post._id, getUserIdFromToken())} className='text-zinc-600 flex items-center gap-1 cursor-pointer select-none rounded-full p-1 group hover:bg-[#ff4d9d54]' >
                          <IoIosHeartEmpty

                            className="text-zinc-500 text-3xl group-hover:bg-[#ff4d9d44]  rounded-full bg-opacity-65 cursor-pointer select-none p-1"
                          /> {post.likes.length > 0 && <span>{post.likes.length}</span>}
                        </div>

                      )}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <p className='text-white text-center' >Nothing to see here yet</p>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Postsection;
