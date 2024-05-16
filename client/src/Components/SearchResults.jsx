import React from 'react';
import { Link} from 'react-router-dom';
import '../Styles/main.css';
const SearchResults = ({filteredData}) => {

  if (filteredData.length === 0) {
    return <p>No search results found.</p>;
  }

  return (
    <div>
      <h2 className="ruio">{filteredData[0].type} Blogs</h2>
      <div className="blog-list">
      {filteredData.map((blog) => (
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
    </div>
  );
};


export default SearchResults;
