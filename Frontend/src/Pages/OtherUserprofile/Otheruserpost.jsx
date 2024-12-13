import React, { useEffect, useState } from "react";
import BottomNavbar from "../../Components/BottomNavbar/BottomNavbar";
import RightSection from "../../Components/RightSection/RightSection";
import Centersection from "../../Components/Centersection/Centersection";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Otherprofilecenterdection from "../../Components/Otherprofilecentersection/Otherprofilecenterdection";
import Postsection from "../../Components/Postssection/Postsection";

const Otheruserpost = () => {
    const { id } = useParams(); // Extract user ID from URL
    const [profileData, setProfileData] = useState(null); // Initialize as null
    const navigate = useNavigate();

    const [allPosts, setAllPosts] = useState([])
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Function to fetch user profile
    const fetchOtherUserProfile = async (uid) => {
        try {
            const response = await axios.get(`https://fullstack-mern-9ql7.onrender.com/post/profile/${uid}`);
            setProfileData(response.data); // Set response data to state
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchOtherUserProfile(id); // Fetch profile based on ID
        }
    }, [id]);

    // Render the component


    const fetchUserPosts = async () => {
        const userId = id;
    
        try {
          setLoading(true);
          const response = await axios.get(`https://fullstack-mern-9ql7.onrender.com/post/user/${userId}`); // Replace with dynamic user ID if needed
          // const response = await axios.get('http://localhost:5550/post/user/674bf32194c5159991cd36e1'); // Replace with dynamic user ID if needed
          if (response.data.length === 0) {
            setError('No posts found for this user');
          } else {
            setUserPosts(response.data);
            // console.log("huy" ,userPosts)
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

      const handleLike = async (postId, userId) => {
        try {
          const response = await axios.put(`https://fullstack-mern-9ql7.onrender.com/post/likeuser/${postId}/like`, { userId });
          console.log(response.data.message);
    
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
          console.log(response.data.message);
    
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
 const loggedInUserId =getUserIdFromToken() 

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
        if (targetUserId === loggedInUserId) {
            console.error('You cannot follow yourself');
            return;
        }
        try {
            const respo = await axios.post(`https://fullstack-mern-9ql7.onrender.com/post/follow/${targetUserId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Follow response:', respo.data);
            setIsFollowing(true)
            if (respo.data.success) {
                setIsFollowing(true);
                console.log(isFollowing)  // Set to true if the follow is successful
            }
        } catch (error) {
            console.error('Error following user:', error.response?.data || error.message);
        }
    };

    // Unfollow user
    const handleUnfollow = async (targetUserId) => {
        if (targetUserId === loggedInUserId) {
            console.error('You cannot unfollow yourself');
            return;
        }
        try {
            const respo = await axios.post(`https://fullstack-mern-9ql7.onrender.com/post/unfollow/${targetUserId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Unfollow response:', respo.data);
            setIsFollowing(false)
            console.log(isFollowing) 
            if (respo.data.success) {
                setIsFollowing(false);  // Set to false if the unfollow is successful
            }
        } catch (error) {
            console.error('Error unfollowing user:', error.response?.data || error.message);
        }
    };


    return (
        <div>
            <div className="flex">
                <div className="lg:w-[27%] w-[15%] hidden sm:block border-zinc-700 h-screen sticky top-0">
                    <Sidebar />
                </div>
                <div className="lg:w-[45%] sm:w-[85%] w-[100%] border-zinc-700 h-screen sticky top-0">
                    {profileData ? (
                        <div key={profileData._id}>

                            <Otherprofilecenterdection otherprofilename={profileData.name} otherprofilecreatedAt={profileData.createdAt} otherprofileemail={profileData.email} userident={id} handlelike={handleLike} handleunlike={handleUnlike} allpost={allPosts} />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
               

                <div className="pb-36" >
                    <Postsection />
                </div>
                <div className="w-[27%] hidden lg:block border-zinc-700 sticky top-0">
                    <RightSection />
                </div>
            </div>
            {/* <div className="sticky z-30 sm:hidden bottom-0 w-full">
                <BottomNavbar />
            </div> */}
        </div>
    );
};

export default Otheruserpost;
