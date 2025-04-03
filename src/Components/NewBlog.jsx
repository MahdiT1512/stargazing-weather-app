import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import Navbar from './Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from "../firebase/firebase"; // Import your Firebase app initialization

const NewBlog = () => {
  
  const navigate = useNavigate();  // Initialize navigate for navigation

  const [userEmail, setUserEmail] = useState(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [camera, setCamera] = useState("");
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Prevent the reload prompt only if it's safe
      if (loading) {
        event.preventDefault();
        event.returnValue = '';  // Standard for most browsers
      }
    };
  
    // Add the beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    // Cleanup: Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [loading]); // Trigger when `loading` changes

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

    useEffect(() => {
      if (userEmail) {
        setUsername(userEmail.split('@')[0]);
      }
    }, [userEmail]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Temporary preview URL
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);

    // Reset file input by setting its value to an empty string
    document.getElementById("fileInput").value = "";
};

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Stop any default behavior (just in case)
    console.log("TEST");
    if (!image || !title || !content || !camera) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload image to the server
      
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Get the image URL (path) returned from the server
      const uploadedImageUrl = response.data.imageUrl;
      
      //const uploadedImageUrl = "test"
      // Step 2: Save the post data (title, content, image URL) in Firestore
      const postData = {
        title,
        content,
        camera,
        user: userEmail, // Make sure this has a valid value
        imageUrl: uploadedImageUrl,
        timestamp: serverTimestamp(),
      };
      

      console.log("Post data:", postData); // Log the post data to check its structure
      const blogPostRef = await addDoc(collection(db, "blogs"), postData);
      console.log("Post saved with ID:", blogPostRef.id);
      

      setTitle('');
      setContent('');
      setCamera('');
      setImage(null);
      setPreview('');

      alert('Post successfully submitted!');

      goToCommunityPage();


    } catch (error) {
      console.error('Error uploading image or saving post:', error);
      //alert('Failed to upload image or save post.');
    }

    setLoading(false);
  };

  function goToCommunityPage() {
    navigate('/CommunityPage'); // Navigate to '/CommunityPage'
  }
  

  return (
    <div className="new-blog-page">
      <Navbar />

      <form onSubmit={(e) => e.preventDefault()} >
        <div className="post-container">
          {/* Left side - Image */}
          {preview && <img src={preview}
          alt="Uploaded Preview"
          className="post-image"
          onClick={() => setModalOpen(true)}
          />}


          {/* Full-Size Image Modal */}
          {modalOpen && (
            <div className="modal" onClick={() => setModalOpen(false)}>
              <div className="modal-content">
                <img src={preview}
                  alt="Failed to load image" />
                <button className="close-btn" onClick={() => setModalOpen(false)}>X</button>
              </div>
            </div>
          )}

          <div className="file-input-container">
              <div className='file-buttons'>
              <label className="custom-file-label">
                  Choose File
                  <input 
                      id="fileInput"  // Add an ID to access it
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="input-file"
                  />
              </label>
              {image && (
                  <button className="remove-file-btn" onClick={handleRemoveImage}>
                      Remove
                  </button>
              )}
              </div>
              <span className="file-name">{image ? image.name : "No file chosen"}</span>

          </div>
  
          {/* Right side - Text content */}
          <div className="post-content">
            
            {/* Title and User */}
            <div className="post-header">
              <input 
                type="text" 
                maxLength="50"
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="input-title"
              />
              <div className="post-info">
                <span className="post-user">by {username}</span>
                <span className="post-date">
                  {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
  
            <input 
              type="text" 
              maxLength="50"
              placeholder="Camera" 
              value={camera} 
              onChange={(e) => setCamera(e.target.value)} 
              className="input-camera"
            />
            
  
            <textarea
              maxLength="500"
              placeholder="Content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="input-content"
            />

            <button className="submit-button" type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Post"}
            </button>
            
          </div>
        </div>


      </form>
    </div>
  );
};

export default NewBlog;
