import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import BASE_URL from '../utils/api';

const api_url_login = `${BASE_URL}/login/details`;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email ID is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(api_url_login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

     const data = await response.json();

        if (response.ok && data.status === "success") {

          localStorage.removeItem("userId");
          localStorage.setItem("userId", data.userId);

          toast.success(data.message, {
            position: "top-right",
            autoClose: 3000
          });

          const redirectPath = {
            admin: "/AdminDash",
            patient: "/PatientDash"
          }[formData.role] || "/";

          setTimeout(() => {
            setFormData({
              emailId: "",
              password: "",
              role: ""
            });

            setErrors({});
            navigate(redirectPath);
          }, 500);

        }
        else if (data.status === "invalid_credentials") {

          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000
          });

        }
        else if (data.status === "invalid_role") {

          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000
          });

        }
        else if (data.status === "not_registered") {

          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000
          });

        }
        else {

          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 3000
          });

        }
              
    } catch (error) {
      console.error('Network Error:', error);
      toast.error('Server is unreachable. Please ensure the backend is running.', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        
        <div className="input-group">
          <label htmlFor="emailId">Email ID</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className="login-input"
            placeholder="Enter your Email ID"
          />
          {errors.emailId && <div className="error-message">{errors.emailId}</div>}
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            placeholder="Enter your Password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="login-select"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="patient">Patient</option>
            
          </select>
          {errors.role && <div className="error-message">{errors.role}</div>}
        </div>
        
        <button type="submit" className="login-submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;