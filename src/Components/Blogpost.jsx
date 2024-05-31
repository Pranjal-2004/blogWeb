// src/components/BlogPost.js
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPosts, deletePost } from '../utils/localStorage';
import '../Css/BlogPost.css'; // Import the CSS file

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = getPosts();
  const post = posts.find(post => post.id === parseInt(id));

  if (!post) {
    return <h2>Post not found</h2>;
  }

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      deletePost(parseInt(id));
      navigate('/');
    }
  };

  return (
    <div className="blog-post-outer-container">
      <div className="blog-post-container">
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-author-date">
          <strong>Author:</strong> {post.author} | <strong>Date:</strong> {post.date}
        </div>
        {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="blog-post-thumbnail" />}
        <div className="blog-post-content-container">
          <p className="blog-post-content">{post.content}</p>
        </div>
        <div className="blog-post-buttons">
          <button onClick={handleDelete} className="delete-post-button">Delete Post</button>
          <Link to={`/edit/${id}`} className="edit-post-link">Edit Post</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
