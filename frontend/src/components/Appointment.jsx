import React, { useState, useEffect } from 'react';
import './Appointment.css';
import BASE_URL from '../utils/api';

const API_URL_APPOINTMENT_ADD = `${BASE_URL}/Appointment/Add`;
const API_URL_DOCTOR_GET_ALL = `${BASE_URL}/Doctor/selectAll`;
const API_URL_APPOINTMENT_GET_BY_PATIENT = `${BASE_URL}/Appointment/selectByPatientId/`;


function Appointment() {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchPatientId, setSearchPatientId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Fetch doctors from backend
    const fetchDoctorsFromBackend = async () => {
      try {
        const response = await fetch(API_URL_DOCTOR_GET_ALL);
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        }
      } catch (error) {
        console.error('Error fetching doctors from backend:', error);
      }
    };
    fetchDoctorsFromBackend();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientId.trim()) newErrors.patientId = 'Patient ID is required';
    if (!formData.doctorId) newErrors.doctorId = 'Please select a doctor';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Date is required';
    if (!formData.appointmentTime) newErrors.appointmentTime = 'Time is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

 
   
    setFormData({ patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '' });
    setErrors({});
    alert('Appointment Request Submitted! We are processing your request.');

  
    try {
      const response = await fetch(API_URL_APPOINTMENT_ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        handleFetchAppointments();
      } else {
         const errorMsg = await response.text();
          alert(errorMsg);
      }
    } catch (error) {
      console.error('Network Error during backend submission:', error);
      alert('Network error');
    }
  };

  const handleFetchAppointments = async () => {

    if (!searchPatientId.trim()) {
        alert("Please enter Patient ID");
        return;
    }

    setHasSearched(true);

    try {

        const response = await fetch(
            `${API_URL_APPOINTMENT_GET_BY_PATIENT}${searchPatientId}`
        );

        if (response.ok) {

            const backendApts = await response.json();

           const enrichedAppointments = backendApts.map(apt => ({
                ...apt,
                doctorName: apt.doctorId
            }));

            setAppointments(enrichedAppointments);

        } else {

            setAppointments([]);

        }

    } catch (error) {

        console.error(error);

    }

};

  return (
    <div className="appointment-container">
      <div className="appointment-left">
        <form className="appointment-form" onSubmit={handleSubmit}>
          <h2>Book an Appointment</h2>

         
          <div className="form-group">
            <label htmlFor="patientId">Patient ID</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              placeholder="Enter your Patient ID"
              className="form-input"
            />
            {errors.patientId && <div className="error-text">{errors.patientId}</div>}
          </div>

         
          <div className="form-group">
            <label htmlFor="doctorId">Doctor</label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select a Doctor</option>
              {doctors.map(d => (
                <option key={d.userId || d.id} value={d.userId || d.id}>
                  {d.doctor_name} ({d.specialization})
                </option>
              ))}
            </select>
            {errors.doctorId && <div className="error-text">{errors.doctorId}</div>}
          </div>

        
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              className="form-input"
            />
            {errors.appointmentDate && <div className="error-text">{errors.appointmentDate}</div>}
          </div>

         
          <div className="form-group">
            <label htmlFor="appointmentTime">Appointment Time</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleInputChange}
              className="form-input"
            />
            {errors.appointmentTime && <div className="error-text">{errors.appointmentTime}</div>}
          </div>

          <button type="submit" className="submit-btn">Book Appointment</button>
        </form>
      </div>

     
      <div className="appointment-right">
        <div className="details-section">
          <h3>View Appointment Details</h3>

          <div className="form-group" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Enter Patient ID"
              className="form-input"
              value={searchPatientId}
              onChange={(e) => setSearchPatientId(e.target.value)}
              style={{ flex: 1 }}
            />
            <button 
              className="submit-btn" 
              style={{ width: 'auto', marginTop: 0, padding: '10px 20px' }}
              onClick={handleFetchAppointments}
            >
              View
            </button>
          </div>

          {!hasSearched ? (
            <div className="no-appointments">
              <p>Enter a Patient ID above to view appointment history.</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="no-appointments">
              <p>No appointments found for Patient ID: {searchPatientId}</p>
              <p>Please double-check the ID and try again.</p>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map(apt => (
                <div
                  key={apt.appointmentId}
                  className={`appointment-card ${apt.status === 'Confirmed' ? 'confirmed' : 'pending'}`}
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <div className="appointment-card-header">
                    <h4>Patient ID: {apt.patientId}</h4>
                    <span className={`status-badge ${apt.status.toLowerCase().replace(' ', '-')}`}>
                      {apt.status}
                    </span>
                  </div>
                  <p><strong>Doctor:</strong> {apt.doctorName}</p>
                  <p><strong>Date:</strong> {apt.appointmentDate}</p>
                  <p><strong>Time:</strong> {apt.appointmentTime}</p>
                </div>
              ))}
            </div>
          )}

          {selectedAppointment && (
            <div className="appointment-detail-modal">
              
              <div className="modal-content">
                <h3>Appointment Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Appointment ID:</strong> {selectedAppointment.appointmentId}
                  </div>
                  <div className="detail-item">
                    <strong>Patient ID:</strong> {selectedAppointment.patientId}
                  </div>
                  <div className="detail-item">
                    <strong>Doctor Name:</strong> {selectedAppointment.doctorName}
                  </div>
                  <div className="detail-item">
                    <strong>Doctor ID:</strong> {selectedAppointment.doctorId}
                  </div>
                  <div className="detail-item">
                    <strong>Specialization:</strong> {selectedAppointment.specialization}
                  </div>
                  <div className="detail-item">
                    <strong>Appointment Date:</strong> {selectedAppointment.appointmentDate}
                  </div>
                  <div className="detail-item">
                    <strong>Appointment Time:</strong> {selectedAppointment.appointmentTime}
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong> <span className={`status-badge ${selectedAppointment.status.toLowerCase().replace(' ', '-')}`}>{selectedAppointment.status}</span>
                  </div>
                
                </div>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedAppointment(null)}
                >
                  Close Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
