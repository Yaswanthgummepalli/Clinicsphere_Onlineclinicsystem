import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Register.css'
import BASE_URL from '../utils/api'

const api_url = `${BASE_URL}/patient/register`;
function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    street: '',
    location: '',
    city: '',
    state: '',
    pincode: '',
    mobileNo: '',
    emailID: '',
    password: '',
    confirmPassword: '',
    userType: 'P',
    loginStatus: 0
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.street.trim()) newErrors.street = 'Street is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits'
    }
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile Number is required'
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Mobile Number must be 10 digits'
    }
    if (!formData.emailID.trim()) {
      newErrors.emailID = 'Email ID is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailID)) {
      newErrors.emailID = 'Invalid email format'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(api_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

       
        if (response.ok) {
          
          const contentType = response.headers.get("content-type");
          let data;
          if (contentType && contentType.includes("application/json")) {
            data = await response.json();
          } else {
            data = await response.text(); 
          }

          console.log('Registration successful:', data)
          toast.success('Registration successful!', {
            position: 'top-right',
            autoClose: 3000,
            onClose: () => navigate('/')
          })
          
          setSubmitted(true)
          handleReset(); 

        } else {
         
          const errorData = await response.text(); 
          console.error('Registration failed:', errorData)
          toast.error('Registration failed: ' + errorData)
        }
      } catch (error) {
      
        console.error('Network Error:', error)
        toast.error('Server is unreachable. Please try again later.')
      }
    } else {
      setErrors(newErrors)
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      street: '',
      location: '',
      city: '',
      state: '',
      pincode: '',
      mobileNo: '',
      emailID: '',
      password: '',
      confirmPassword: '',
      userType: 'P',
      loginStatus: 0
    })
    setErrors({})
  }

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ]

  return (
    <div className='r-main'>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='r-container'>
        <h1>Register Here</h1>
        <form onSubmit={handleSubmit} className='register-form'>
          
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name *</label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='Enter First Name'
                className={errors.firstName ? 'input-error' : ''}
              />
              {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='lastName'>Last Name *</label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Enter Last Name'
                className={errors.lastName ? 'input-error' : ''}
              />
              {errors.lastName && <span className='error-message'>{errors.lastName}</span>}
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='dateOfBirth'>Date of Birth *</label>
              <input
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'input-error' : ''}
              />
              {errors.dateOfBirth && <span className='error-message'>{errors.dateOfBirth}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='gender'>Gender *</label>
              <select
                id='gender'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'input-error' : ''}
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
              {errors.gender && <span className='error-message'>{errors.gender}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='userType'>User Type</label>
              <select
                id='userType'
                name='userType'
                value={formData.userType}
                onChange={handleChange}
                disabled
              >
                <option value='P'>Patient (P)</option>
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group full-width'>
              <label htmlFor='street'>Street *</label>
              <textarea
                id='street'
                name='street'
                spellCheck="false"
                value={formData.street}
                onChange={handleChange}
                placeholder='Enter Street Address'
                rows='2'
                className={errors.street ? 'input-error' : ''}
              />
              {errors.street && <span className='error-message'>{errors.street}</span>}
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='location'>Location *</label>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                placeholder='Enter Location'
                className={errors.location ? 'input-error' : ''}
              />
              {errors.location && <span className='error-message'>{errors.location}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='city'>City *</label>
              <input
                type='text'
                id='city'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='Enter City'
                className={errors.city ? 'input-error' : ''}
              />
              {errors.city && <span className='error-message'>{errors.city}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='state'>State *</label>
              <select
                id='state'
                name='state'
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'input-error' : ''}
              >
                <option value=''>Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <span className='error-message'>{errors.state}</span>}
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='pincode'>Pincode *</label>
              <input
                type='text'
                id='pincode'
                name='pincode'
                value={formData.pincode}
                onChange={handleChange}
                placeholder='Enter 6-digit Pincode'
                maxLength='6'
                className={errors.pincode ? 'input-error' : ''}
              />
              {errors.pincode && <span className='error-message'>{errors.pincode}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='mobileNo'>Mobile Number *</label>
              <input
                type='tel'
                id='mobileNo'
                name='mobileNo'
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder='Enter 10-digit Mobile Number'
                maxLength='10'
                className={errors.mobileNo ? 'input-error' : ''}
              />
              {errors.mobileNo && <span className='error-message'>{errors.mobileNo}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='emailID'>Email ID *</label>
              <input
                type='email'
                id='emailID'
                name='emailID'
                value={formData.emailID}
                onChange={handleChange}
                placeholder='Enter Email ID'
                className={errors.emailID ? 'input-error' : ''}
              />
              {errors.emailID && <span className='error-message'>{errors.emailID}</span>}
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='password'>Password *</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter Password (min 6 characters)'
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className='error-message'>{errors.password}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password *</label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm Password'
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className='form-buttons'>
            <button type='submit' className='btn-submit'>Register</button>
            <button type='button' className='btn-reset' onClick={handleReset}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
