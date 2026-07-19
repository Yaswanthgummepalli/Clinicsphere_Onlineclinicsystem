package com.example.service;
import com.example.DTO.*;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.DTO.RegisterRequest;
import com.example.bean.AppointmentBean;
import com.example.bean.CredentialBean;
import com.example.bean.DoctorBean;

import com.example.bean.ProfileBean;
import com.example.dao.AppointmentDao;
import com.example.dao.CredentialsDAO;
import com.example.dao.DoctorDao;
import com.example.dao.ProfileDAO;
import com.example.*;
@Service
public class AuthService{
	@Autowired
	private ProfileDAO pdao;
	@Autowired
	private CredentialsDAO cdao;
	@Autowired
	private DoctorDao ddao;
	@Autowired
	private AppointmentDao adao;
	public String register(RegisterRequest rr)
	{
		String userId =generateUserId(rr.getFirstName());
		String encodedPassword = encodePassword(rr.getPassword());
		
		CredentialBean cb=new CredentialBean();
		cb.setUserId(userId);
		cb.setEmailId(rr.getEmailId());
		cb.setPassword(encodedPassword);
		cb.setUserType(rr.getUserType());
		cb.setLoginStatus(1);
		
		ProfileBean pb=new ProfileBean();
		pb.setUserId(userId);
		pb.setFirstName(rr.getFirstName());
		pb.setLastName(rr.getLastName());
		pb.setDateOfBirth(rr.getDateOfBirth());
		pb.setGender(rr.getGender());
		pb.setStreet(rr.getStreet());
		pb.setLocation(rr.getLocation());
		pb.setCity(rr.getCity());
		pb.setState(rr.getState());
		pb.setPincode(rr.getPincode());
		pb.setMobileNumber(rr.getMobileNumber());
		pb.setEmailId(rr.getEmailId());
		
		pdao.save(pb);
		cdao.save(cb);
		return "Registration Successful";
	}
	private String generateUserId(String name) {
	        return name.substring(0,2).toUpperCase() + System.currentTimeMillis()%100000;
	    }
	private String encodePassword(String password) {
		return Base64.getEncoder().encodeToString(password.getBytes());
	}
	public int addDoctor(DoctorBean db)
	{
		
		
		if(db!=null)
		{
			
			ddao.save(db);
			return 1;
		}
		else
		{
			return 0;
		}
	}
	public int appointment(AppointmentBean ab)
	{
		if(ab!=null)
		{
			adao.save(ab);
			return 1;
		}
		else
		{
			return 0;
		}
	}
	public LoginResponse validateLogin(LoginRequest request) {

	    String email = request.getEmailId();
	    String password = request.getPassword();
	    String selectedRole = request.getRole().toLowerCase();

	    return validateUser(email, password, selectedRole);
	}
	private LoginResponse validateUser(String email,
            String rawPassword,
            String selectedRole) {

	Optional<CredentialBean> optional = cdao.findByEmailId(email);
	
	
	if (optional.isEmpty()) {
	return new LoginResponse(
	"not_registered",
	"User not registered",
	null
	);
	}

		CredentialBean creds = optional.get();
		
		
		String encodedInput =
		Base64.getEncoder().encodeToString(rawPassword.getBytes());
		
		if (!creds.getPassword().equals(encodedInput)) {
		
			return new LoginResponse(
				    "invalid_credentials",
				    "Invalid email or password",
				    null
				);
		}
		
		
		String dbRole = creds.getUserType();

	    if (dbRole.equalsIgnoreCase("P")) {
	        dbRole = "patient";
	    }

	    if (!dbRole.equalsIgnoreCase(selectedRole)) {
	        return new LoginResponse(
	                "invalid_role",
	                "Please select the correct role",
	                null
	        );
	    }
		
		return new LoginResponse(
		"success",
		"Login Successful",
		creds.getUserId()
		);
	}
    public List<DoctorBean> selectAll()
    {
    	return ddao.findAll();
    }
    public List<AppointmentBean> selectAppointmentsByPatientId(int patientId) {
        return adao.findByPatientId(patientId);
    }
//    public FlightBean selectByFlightId(int flightId)
//    {
//    	FlightBean f=new FlightBean();
//    Optional<FlightBean> opt=fdao.findById(Integer.valueOf(flightId));
//    if(opt.isPresent())
//    {
//     f=opt.get();
//    }
//    return f;
//    }
//   
//	
//	
	
	
}
