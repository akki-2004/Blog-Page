import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import EditBlog from './Components/EditBlog';
import UpdateBlogPost from './Components/UpdateBlogPost';
import SearchResults from './Components/SearchResults';
import ContactMe from './Components/Contact';

function App() {
  return (
    <>    
    
   <Router>
   <Navbar/>
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/edit/:id" element={<UpdateBlogPost/>} />
     <Route path="/create" element={<EditBlog/>} />
     <Route path="/search-results" element={<SearchResults />} />
     <Route path="/contact" element={<ContactMe />} />

     {/* Add more routes as needed */}
   </Routes>
 </Router>
 </>

  );
}

export default App;
