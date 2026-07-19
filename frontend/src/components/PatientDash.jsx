import React from 'react';
import './PatientDash.css';
import { Link, useNavigate } from 'react-router-dom';
import Main from './Main'
function PatientDash() {
  const userId=localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('logged out successfully.');
    navigate('/');
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-top">
          <div className="logo-wrap">
            <h1>Clinic Sphere</h1>
          </div>

          <div className="header-actions">
        
            {userId && (<span className='nav-link'>User Id :{userId}</span>)}
            <div className="nav-wrap">
              <Link to="/PatientDash" className='nav-link'>Dashboard</Link> {/* Added Dashboard link */}
              <Link to="/appointment" className='nav-link'>Appointments</Link>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <Main/>
    </div>
  );
}

export default PatientDash;
