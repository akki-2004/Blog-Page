// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/create.css';

function EditPage(props) {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    type: '',
    customId: null, // Include customId in the initial state
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your server with the entire blogData
      const serverResponse = await axios.post('http://localhost:7894/postData', blogData);

      // Log the server's response
      alert( serverResponse.data.message);

      // Clear the form after successful submission
      setBlogData({
        title: '',
        content: '',
        author: '',
        type: '',
        customId: null, // Reset customId after submission, or set it to the desired value
      });
    } catch (error) {
      console.error('Error creating a new blog post:', error.message);
    }
  };

  return (
    <div>
      <h2 className='ase'>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className='heloo'>
        <label className='uegb'>Title:</label>
        <input className='uriwg' type="text" name="title" value={blogData.title} onChange={handleChange} required />

        <label className='uegb'>Content:</label>
        <textarea className='uriwg' rows={5} type='desc'name="content" value={blogData.content} onChange={handleChange} required />

        <label className='uegb'>Author:</label>
        <input className='uriwg' type="text" name="author" value={blogData.author} onChange={handleChange} required />

        <label className='uegb'>Type:</label>
        <input className='uriwg' type="text" name="type" value={blogData.type} onChange={handleChange} required />

        <button className='elgh' type="submit">Create Blog Post</button>
      </form>
    </div>
  );
}

export default EditPage;
