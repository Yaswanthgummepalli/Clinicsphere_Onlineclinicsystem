package com.example.bean;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Credentials")
public class CredentialBean {
	@Id
	private String userId;
	@Column
	private String emailId;
	
	@Column
	private String password;
	@Column
	private String userType;
	@Column
	private int LoginStatus;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public int getLoginStatus() {
		return LoginStatus;
	}
	public void setLoginStatus(int loginStatus) {
		LoginStatus = loginStatus;
	}
	
}
