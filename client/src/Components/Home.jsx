import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/main.css';
import SearchResults from './SearchResults';

// ... (imports)

const Home = ({ FilteredBlogs }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7894/fetchData');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data from Express server:', error.message);
      }
    };

    // Fetch default blogs only if FilteredBlogs is undefined or has length equal to 0
    if (!FilteredBlogs || FilteredBlogs.length === 0) {
      fetchData();
    }else {
      // If FilteredBlogs has data, set it directly
      setData(FilteredBlogs);
    }
  }, [FilteredBlogs]);

  return (
    
    <div className="blog-list">
      {data.map((blog) => (
        <div className="blog-card" key={blog.customId}>
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-content">{blog.content}</p>
          <div className="blog-author">Author: {blog.author}</div>

          {/* Link to Edit Page */}
          <Link to={`/edit/${blog.customId}`}>
            <button className="read-more-btn">Edit Blog</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
