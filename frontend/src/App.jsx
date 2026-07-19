import React from 'react'
import Main from './components/Main'
import Register from './components/Register'
import HeaderLayout from './components/HeaderLayout' 
import Login from './components/Login'
import PatientDash from './components/PatientDash'
import AdminDash from './components/AdminDash'
import Appointment from './components/Appointment'
import About from './components/About'
import Contact from './components/Contact'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className='content'>
      
      <Router>
        <Routes>
          <Route path="/" element={<HeaderLayout />}>
            <Route index element={<Main />} /> 
            <Route path="about" element={<About />} /> 
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/PatientDash" element={<PatientDash />}></Route>
          <Route path="/AdminDash" element={<AdminDash />}></Route>
         
          <Route path="/appointment" element={<Appointment/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
