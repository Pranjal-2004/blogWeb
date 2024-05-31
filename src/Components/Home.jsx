// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../utils/localStorage.js';
import '../Css/Home.css'; // Import the CSS file

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  return (
    <div className="main-container">
  <nav className="navbar">
    <div className="navbar-brand">Blog</div>
    <Link to="/new" className="create-post-link">Create New Post</Link>
  </nav>
  <div className="home-container">
    <h1 className="home-title">Blog Home</h1>
    <ul className="post-list">
      {posts.length === 0 ? (
        <li className="no-posts">No blogs yet</li>
      ) : (
        posts.map(post => (
          <li key={post.id} className="post-item">
            <div className="post-container">
              <Link to={`/post/${post.id}`} className="post-link">
                {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="thumbnail" />}
                <span className="post-title">{post.title}</span>
              </Link>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
</div>

  );
};

export default Home;
