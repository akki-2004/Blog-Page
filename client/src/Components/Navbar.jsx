import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/search-icon-png-0.png';
import '../Styles/navbar.css';
import Home from './Home';
import SearchResults from './SearchResults';

export default function Navbar() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const nav = useNavigate();

  const handleSearchClick = async () => {
    if (searchInput.trim() !== '') {
      try {
        const response = await axios.get(`http://localhost:7694/blogsByType?type=${searchInput}`);
        const newFilteredData = response.data;
        setFilteredData(newFilteredData);
        console.log(filteredData);
      
      } catch (error) {
        console.error('Error fetching filtered data from Express server:', error.message);
      }
    } else {
      // Clear the existing data if the search input is empty
      setFilteredData([]);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    // Clear filteredData when search input changes
    setFilteredData([]);
  }, [searchInput]);


  return (
      <div>
        <nav>
          <div className="menu-icon">
            <span className="fas fa-bars"></span> 
          </div>
          <div className="logo">ThoughtThrive</div>
          <div className="nav-items">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to="/create">Create Blog</Link>
            </li>
            <li>
              <Link to="/">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/">Feedback</Link>
            </li>
          </div>
          <div className="search-icon">
          <span className="fas fa-search"></span>
        </div>
        <div className="cancel-icon">
          <span className="fas fa-times"></span>
        </div>
        <form action="#">
          <input
            type="search"
            className="search-data"
            placeholder="Search what you want.."
            required
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearchClick} type="button" className="fas fa-search">
            <img src={logo} style={{ height: '30px', width: '30px' }} alt="search-icon" />
          </button>
        </form>
      </nav>
      
        {/* <SearchResults filteredData={filteredData} /> */}
        
      
    </div>
  );
}
