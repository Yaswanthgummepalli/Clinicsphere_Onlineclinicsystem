import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div>
      <div className="contact-wrapper">
        <div className="contact-content-card">
          <h2 className="contact-title">Contact Us</h2>
          
          <div className="contact-grid">
          
            <div className="info-card">
              <div className="card-icon">📍</div>
              <h3>Our Location</h3>
              <p>
                clinic sphere,chittor road,<br />
                palamener,<br />
                Andhra pradesh
              </p>
            </div>

            
            <div className="info-card">
              <div className="card-icon">📞</div>
              <h3>Call Us</h3>
              <p>
                General Inquiry: +1 (555) 000-1111<br />
                Appointments: +1 (555) 222-3333<br />
                Emergency: 911
              </p>
            </div>

          
            <div className="info-card">
              <div className="card-icon">📧</div>
              <h3>Email Us</h3>
              <p>
                support@clinicsphere.com<br />
                contact@clinicsphere.com<br />
                hr@clinicsphere.com
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;