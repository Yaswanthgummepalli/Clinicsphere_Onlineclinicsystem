package com.example.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bean.AppointmentBean;
import com.example.service.AuthService;
@CrossOrigin(origins = {"http://localhost:3000","https://clinicsphere-onlineclinicsystem.vercel.app/"})
@RestController
@RequestMapping("/Appointment")
public class AppointmentController {
	@Autowired
	private AuthService authService;
	
	
	@PostMapping("/Add")
	public int add(@RequestBody AppointmentBean ab)
	{
		System.out.println("welcome");
		return authService.appointment(ab);
	}
	@GetMapping("/selectByPatientId/{patientId}")
	public List<AppointmentBean> meth6(@PathVariable int patientId) 
	{
	    
	    return authService.selectAppointmentsByPatientId(patientId); 
	}
//	@GetMapping("/flightById/{flightId}")
//	public FlightBean meth5(@PathVariable int flightId)
//	{
//		return fserv.selectByFlightId(flightId);
//	}
}