import React from 'react';
import './AboutUs.css'; // Import a CSS file for styling
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AboutUs = () => {
  return (
    <>
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>
      <section className="about-us-content">
        <div className="about-us-intro">
          <h2>Welcome to ShoeStyle</h2>
          <p>
            At , we believe every step you take should be in comfort and style. Our mission is to provide 
            high-quality, trendy, and affordable footwear for all occasions. Whether you're hitting the gym, 
            attending a formal event, or just enjoying a casual day out, we've got the perfect pair for you.
          </p>
        </div>
        <div className="about-us-values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> Only the best materials for your feet.</li>
            <li><strong>Style:</strong> Stay ahead of the trends with our curated designs.</li>
            <li><strong>Customer Satisfaction:</strong> Your happiness is our priority.</li>
            <li><strong>Sustainability:</strong> We are committed to environmentally friendly practices.</li>
          </ul>
        </div>
        <div className="about-us-history">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, GEEKSFORKICKS started as a small passion project with the aim of bringing fashionable 
            and functional footwear to everyone. Today, we serve thousands of customers worldwide, constantly 
            innovating and expanding our collection to meet your needs.
          </p>
        </div>
      </section>
      <footer className="about-us-footer">
        <p>Thank you for choosing GeeksForKicks. Let us walk together to a better future!</p>
      </footer>
    </div>
    </>
  );
};

export default AboutUs;