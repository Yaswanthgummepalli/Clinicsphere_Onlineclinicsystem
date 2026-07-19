package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.RegisterRequest;
import com.example.service.AuthService;
import com.example.service.*;
@CrossOrigin(origins = {"http://localhost:3000","https://clinic-sphere-online-clinic-system-teal.vercel.app/"})
@RestController
@RequestMapping("/patient")
public class RegisterController {
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public String register(@RequestBody RegisterRequest rr)
	{
		System.out.println("hello");
		return authService.register(rr);
	}
}

