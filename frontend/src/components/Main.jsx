import "./Main.css";
import heroImg from "../assets/img 5.png"; 

export default function Main() {
  return (
    <section className="hero">
      <div className="hero-container">
        
      
        <div className="hero-left">
            
          <h1>
            Healthcare, <br />
            <span>Reimagined</span>
          </h1>

          <p>
            Connect with trusted doctors anytime, anywhere.
          </p>

          <div className="hero-icons">
            <div>
              <span>📅</span>
              <p>Book Appointment</p>
            </div>
          
          </div>

         
        </div>

      
        <div className="hero-right">
          <img src={heroImg} alt="ClinicSphere" />
        </div>

      </div>

    
      <div className="hero-card">
        <div>
          <h3>Trusted by Thousands</h3>
          <p>Reliable care you can count on.</p>
        </div>
        <div>
          <h3>Expert Doctors</h3>
          <p>Consult certified and experienced doctors.</p>
        </div>
        <div>
          <h3>Quality Care Always</h3>
          <p>Your health is our top priority.</p>
        </div>
      </div>
    </section>
  );
}