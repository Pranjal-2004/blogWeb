import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPosts, updatePost } from '../utils/localStorage';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = getPosts();
  const post = posts.find(post => post.id === parseInt(id));

  const [title, setTitle] = useState(post?.title || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Current date
  const [content, setContent] = useState(post?.content || '');
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || '');

  useEffect(() => {
    if (!post) {
      navigate('/');
    }
  }, [post, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      id: parseInt(id),
      title,
      author,
      date,
      content,
      thumbnail,
    };
    updatePost(updatedPost);
    navigate(`/post/${id}`);
  };

  return (
    <div className="new-post-container">
      <h1 className="new-post-title">Edit Post</h1>
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
            onChange={handleImageUpload}
          />
          {thumbnail && <img src={thumbnail} alt="Thumbnail Preview" className="thumbnail-preview" />}
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;