import React from 'react';
import logo1 from '../assets/iitm-cse-logo.png'; 
import logo2 from '../assets/iitm-logo.png'; // Import your logo2
import '../stylings/Footer.css';

function Footer() {
    const textmsg = 'Project by Krishna Sai, Rudra Laxmi Kanth'; // Moved guide to a separate line
    const guide = 'Guide: Prof. Sukhendu Das'; // Added guide line
  return (
    <div className="footer">
      <div className="footer-content">
        <img src={logo2} alt="Logo 2" className="logo" />
        <div className="text">
          <p>{textmsg}</p>
          <p>{guide}</p> {/* Added guide line */}
        </div>
        <div className="copyright">Copyright © 2024 Belongs to VP lab, IITM </div>
        <img src={logo1} alt="Logo 1" className="logo" />
      </div>
    </div>
  );
}

export default Footer;
