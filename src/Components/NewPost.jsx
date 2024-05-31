import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePosts, getPosts } from '../utils/localStorage';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS for React Toastify
import '../Css/NewPost.css';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setThumbnail(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!title || !author || !content || !thumbnail) {
      // Display a notification using React Toastify
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    const posts = getPosts();
    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title,
      author,
      date: currentDate,
      content,
      thumbnail,
    };
    const updatedPosts = [...posts, newPost];
    savePosts(updatedPosts);
    navigate('/');
  };

  return (
    <div className="new-post-container">
      <h1 className="new-post-title">Create New Post</h1>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* Include the ToastContainer component */}
      <ToastContainer />
    </div>
  );
};

export default NewPost;
