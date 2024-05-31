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

  const countWords = (text) => {
    return text.split(/\s+/).filter(word => word !== '').length;
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to='/' className="navbar-brand">BlogWeb</Link>
        <Link to="/new" className="create-post-link">Create New Post</Link>
      </nav>
      <h1 className="home-title">Blog Home</h1>
      <div className="post-list">
        {posts.length === 0 ? (
          <div className="no-posts">No blogs yet</div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-item">
              <Link to={`/post/${post.id}`} className="post-link">
                {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="thumbnail"/>}
                <div className="post-content">
                  <span className="post-title">{post.title}</span>
                  <span className="post-author">By {post.author}</span>
                  <p className="post-description">
                    {countWords(post.content) > 20
                      ? `${post.content.split(' ').slice(0, 20).join(' ')}...`
                      : post.content}
                    {countWords(post.content) > 10 && (
                      <Link to={`/post/${post.id}`} className="read-more-link"></Link>
                    )}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
