// ContactMe.js
import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 style={{"textAlign:":"center"}}>Contact Me</h1>
      <div className="contact-info">
        <p>Email: naniakshay361@gmail.com</p>
        <p>Phone: 6300584860</p>
        {/* <p>Address: 1234 Street Name, City, Country</p> */}
      </div>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />
        
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" placeholder="Your message" required></textarea>
        
        <button type="submit"  style={{    "backgroundColor":"cornsilk" , "color":"black"}}>Send</button>
      </form>
    </div>
  );
};

export default Contact;
