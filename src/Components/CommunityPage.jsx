import React, { useState, useEffect } from 'react';
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from './Navbar';
import { Link } from 'react-router-dom'; // Import Link from React Router
import SearchImg from '../Assets/Search.png';
import './CommunityPage.css';
import { db } from '../firebase/firebase';  // Assuming you have a firebase.js file where Firebase is initialized
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const CommunityPage = () => {
  console.log("DB", db);
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState("");

  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // Store clicked image

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl); 
    setModalOpen(true);
  };

  useEffect(() => {
    // Function to fetch blog posts
    const fetchBlogPosts = async () => {
      try {
        // Create a query to fetch the 'blogs' collection and order by timestamp
        const postsQuery = query(collection(db, 'blogs'), orderBy('timestamp', 'desc'));
        
        // Execute the query to get the posts
        const postsSnapshot = await getDocs(postsQuery);
        
        // Map the documents to extract the data
        const postsData = postsSnapshot.docs.map(doc => doc.data());
        
        // Update the state with the fetched posts
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();  // Call the function to fetch posts
  }, []);

  useEffect(() => {
    if (userEmail) {
      setUsername(userEmail.split('@')[0]);
    }
  }, [userEmail]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="community-page">
      <Navbar />

      <div className="create-post-container">
        <div className="logged-in">
          {userEmail ? <p>Logged in as: {userEmail}</p> : <p>Sign in to create a post.</p>}
        </div>
        <div className="create-post">
          {userEmail && (
            <Link to="/NewBlog">
              <button className="create-post-button">Create Post</button>
            </Link>
          )}
        </div>
      </div>

      <div>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post-container">
            {/* Left side - Image */}
            <img 
              src={`http://localhost:5000${post.imageUrl}`} 
              alt="Failed to load image" 
              className="post-image"
              onClick={() => openModal(`http://localhost:5000${post.imageUrl}`)}
            />

            {/* Full-Size Image Modal */}
            {modalOpen && (
              <div className="modal" onClick={() => setModalOpen(false)}>
                <div className="modal-content">
                  <img src={selectedImage}
                    alt="Failed to load image" />
                  <button className="close-btn" onClick={() => setModalOpen(false)}>X</button>
                </div>
              </div>
            )}
          
            {/* Right side - Text content */}
            <div className="post-content">
              
            {/* Title and User */}
            <div className="post-header">
              <h2 className="post-title">{post.title}</h2>
              <div className="post-info">
                <span className="post-user">by {username}</span>
                <span className="post-date">
                  {new Date(post.timestamp.seconds * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
      
              {/* Camera and Telescope */}
              <p className="post-camera">Taken with {post.camera}</p>
    
              {/* Description */}
              <p className="post-description">{post.content}</p>
            </div>
          </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;