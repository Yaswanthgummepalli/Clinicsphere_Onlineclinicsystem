package com.example.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.RegisterRequest;
import com.example.bean.DoctorBean;
import com.example.service.AuthService;
import com.example.service.*;
@CrossOrigin(origins = {"http://localhost:3000","https://clinic-sphere-online-clinic-system-teal.vercel.app/"})
@RestController
@RequestMapping("/Doctor")
public class DoctorController {
	@Autowired
	private AuthService authService;
	
	
	@PostMapping("/Add")
	public int add(@RequestBody DoctorBean db)
	{
		System.out.println("welcome");
		return authService.addDoctor(db);
	}
	@GetMapping("/selectAll")
	public List<DoctorBean> meth6()
	{
		return authService.selectAll();
	}
}
