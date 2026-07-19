import React from 'react';
import './About.css';
function About() {
  return (
    <div>
    
      <div className="about-wrapper">
        <div className="about-content-card">
          <h2 className="about-title">Healthcare Reimagined</h2>

          <div className="about-intro">
            <p className="about-intro-text">
              Welcome to <strong>Clinic Sphere</strong>. Our platform is more than just a booking system; it's a comprehensive ecosystem designed to put your health back in your hands. We bridge the distance between you and world-class medical expertise.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon">🎯</div>
              <h3 className="about-card-title">Our Mission</h3>
              <p className="about-card-text">To deliver accessible, immediate, and high-quality healthcare solutions through innovative technology.</p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">🌟</div>
              <h3 className="about-card-title">Our Vision</h3>
              <p className="about-card-text">Empowering individuals globally with seamless access to medical excellence and compassionate care.</p>
            </div>
          </div>

          <div className="about-cta">
            <h3 className="about-cta-title">Why Clinic Sphere?</h3>
            <div className="about-cta-list">
              <div className="about-cta-item">
                <span className="about-cta-badge">1</span>
                <span><strong>Vetted Specialists:</strong> Only the most qualified and experienced doctors join our platform.</span>
              </div>
              <div className="about-cta-item">
                <span className="about-cta-badge">2</span>
                <span><strong>Privacy First:</strong> Your medical records and interactions are protected with bank-grade security.</span>
              </div>
              <div className="about-cta-item">
                <span className="about-cta-badge">3</span>
                <span><strong>Real-time Booking:</strong> No more waiting on hold. Book your slot instantly and get reminders.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
