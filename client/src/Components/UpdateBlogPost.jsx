import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
import '../Styles/edit.css'

const UpdateBlogPost = (props) => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    type: '',
    customId: null, 
  });
  const navigate=useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Assuming your server is running on http://localhost:7894
        const response = await axios.get(`http://localhost:7694/blogs/${id}`);
        const fetchedBlogData = response.data;

        setBlogData({
          title: fetchedBlogData.title,
          content: fetchedBlogData.content,
          author: fetchedBlogData.author,
          type: fetchedBlogData.type,
          customId: fetchedBlogData.customId, // Set customId from fetched data
        });
      } catch (error) {
        console.error('Error fetching blog data:', error.message);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your server is running on http://localhost:7894
      await axios.patch(`http://localhost:7694/blogs/${id}`, blogData);
      alert('Blog post updated successfully');
      navigate("/");

    
    } catch (error) {
      console.error('Error updating blog post:', error.message);
    }
  };

  return (
    <div>
      <h2 className='iefn'>Edit Blog Post</h2>
      <form onSubmit={handleSubmit}  className='iwruh' >
        <label className='rubi'>Title:</label>
        <input  className='iugb' type="text" name="title" value={blogData.title} onChange={handleChange} required />

        <label className='rubi'>Content:</label>
        <textarea className='iugb' rows={5} type='desc'name="content" value={blogData.content} onChange={handleChange} required />

        <label className='rubi'>Author:</label>
        <input  className='iugb' type="text" name="author" value={blogData.author} onChange={handleChange} required />

        <label className='rubi'>Type:</label>
        <input  className='iugb' type="text" name="type" value={blogData.type} onChange={handleChange} required />

        {/* Add a field for customId if you want to display it or allow editing */}
        {/* <label>CustomId:</label>
        <input type="number" name="customId" value={blogData.customId || ''} onChange={handleChange} readOnly /> */}

        <button type="submit" className='guh'>Update Blog Post</button>
      </form>
    </div>
  );
};

export default UpdateBlogPost;
