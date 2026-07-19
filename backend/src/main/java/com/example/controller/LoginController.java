package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.LoginRequest;
import com.example.DTO.LoginResponse;
import com.example.service.AuthService;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = {"http://localhost:3000","https://clinicsphere-onlineclinicsystem.vercel.app/"})
public class LoginController {

    @Autowired
    private AuthService authService;

    @PostMapping("/details")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse result = authService.validateLogin(loginRequest);

        return switch (result.getStatus()) {

        case "success" ->
            ResponseEntity.ok(result);

        case "invalid_password" ->
            ResponseEntity.status(401).body(result);

        case "invalid_role" ->
            ResponseEntity.status(403).body(result);

        case "not_registered" ->
            ResponseEntity.status(404).body(result);

        default ->
            ResponseEntity.status(400)
                    .body(result);
    };
    }
}
