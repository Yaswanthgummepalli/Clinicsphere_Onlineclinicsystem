import React, { useState, useEffect } from 'react';
import './AdminDash.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../utils/api';

const api_url_doctor = `${BASE_URL}/Doctor/Add`;
const api_url_doctor_get = `${BASE_URL}/Doctor/selectAll`;

function AdminDash() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('add');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [adminName, setAdminName] = useState('Choudary');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setAdminName(storedUser.name || storedUser.id || 'Choudary');
  }, []);

  const [formData, setFormData] = useState({
    doctor_name: '',
    date_of_birth: '',
    date_of_joining: '',
    gender: '',
    qualification: '',
    specialization: '',
    years_of_experience: '',
    street: '',
    location: '',
    city: '',
    state: '',
    pincode: '',
    contactNumber: '',
    email_id: ''
  });

  useEffect(() => {
    if (activeTab === 'list') {
      fetchDoctors();
    }
    if (activeTab === 'appointments') {
      fetchAppointments();
    }
  }, [activeTab]);

  const fetchAppointments = () => {
    const localApts = JSON.parse(localStorage.getItem('clinic_sphere_appointments') || '[]');
    setAppointments(localApts);
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(api_url_doctor_get);
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        toast.error("Failed to fetch doctors list");
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error("Server unreachable. Could not load doctors.");
    }
  };

  const handleLogout = () => {
    toast.info('Logged out successfully.');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(api_url_doctor, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json(); 
        toast.success(`Doctor added successfully!`);

        // Reset form fields
        setFormData({
          doctor_name: '', date_of_birth: '', date_of_joining: '', gender: '',
          qualification: '', specialization: '', years_of_experience: '',
          street: '', location: '', city: '', state: '',
          pincode: '', contactNumber: '', email_id: ''
        });
      } else {
        const errorMsg = await response.text();
        toast.error('Failed to add doctor: ' + errorMsg);
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error('Server is unreachable. Please ensure the backend is running.');
    }
  };

  const handleConfirmAppointment = (apt) => {
    const localApts = JSON.parse(localStorage.getItem('clinic_sphere_appointments') || '[]');
    const updatedApts = localApts.map(item => 
      item.id === apt.id ? { ...item, status: 'Confirmed' } : item
    );
    
    localStorage.setItem('clinic_sphere_appointments', JSON.stringify(updatedApts));
    setAppointments(updatedApts);
    toast.success("Appointment Confirmed successfully!");
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="header-container">
        <div className="header-top">
          <div className="logo-wrap">
            <h1>Clinic Sphere</h1>
          </div>

          <div className="header-actions">
            <span className="welcome-text" style={{ color: 'white', fontWeight: 'bold', marginRight: '15px' }}>
              Welcome, {adminName}
            </span>
            <div className="nav-wrap">
              <Link to="/AdminDash" className='nav-link'>Dashboard</Link>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-main-content">
        {/* Navigation Tabs */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Doctor
          </button>
          <button 
            className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            View Doctors
          </button>
          <button 
            className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointment Requests
          </button>
        </div>

        {/* View Switches */}
        {activeTab === 'add' ? (
          <div className="doctor-interface">
            <h2 className="interface-title">Add New Doctor</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Doctor Name</label>
                  <input 
                    type="text" 
                    name="doctor_name" 
                    value={formData.doctor_name} 
                    onChange={handleChange} 
                    placeholder="Dr. Name"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Date of Joining</label>
                  <input type="date" name="date_of_joining" value={formData.date_of_joining} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Qualification</label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Specialization</label>
                  <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Years of Experience</label>
                  <input type="number" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Email ID</label>
                  <input type="email" name="email_id" value={formData.email_id} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Street</label>
                  <input type="text" name="street" value={formData.street} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-submit-container">
                <button type="submit" className="submit-button">
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        ) : activeTab === 'list' ? (
          <div className="doctor-list-interface">
            <h2 className="interface-title">Registered Doctors</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length > 0 ? doctors.map(doc => (
                    <tr key={doc.userId || doc.id}>
                      <td>{doc.doctor_name}</td>
                      <td>{doc.specialization}</td>
                      <td>{doc.years_of_experience} yrs</td>
                      <td>{doc.contactNumber}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No doctors found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="appointment-list-interface">
            <h2 className="interface-title">Appointment Requests</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Doctor ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? appointments.map(apt => (
                    <tr key={apt.id}>
                      <td>{apt.patientId}</td>
                      <td>{apt.doctor_Id || apt.doctorId}</td>
                      <td>{apt.appointmentDate}</td>
                      <td>{apt.appointmentTime}</td>
                      <td>
                        <span className={`status-badge ${(apt.status || 'Pending').toLowerCase().replace(' ', '-')}`}>
                          {apt.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        {apt.status !== 'Confirmed' && (
                          <button 
                            onClick={() => handleConfirmAppointment(apt)}
                            className="confirm-button"
                          >
                            Confirm
                          </button>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No appointment requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDash;