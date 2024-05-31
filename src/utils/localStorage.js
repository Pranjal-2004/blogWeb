// src/utils/localStorage.js
export const savePosts = (posts) => {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};

export const getPosts = () => {
  const posts = localStorage.getItem('blogPosts');
  return posts ? JSON.parse(posts) : [];
};

export const deletePost = (id) => {
  let posts = getPosts();
  posts = posts.filter(post => post.id !== id);
  savePosts(posts);
};

export const updatePost = (updatedPost) => {
  let posts = getPosts();
  posts = posts.map(post => post.id === updatedPost.id ? updatedPost : post);
  savePosts(posts);
};
