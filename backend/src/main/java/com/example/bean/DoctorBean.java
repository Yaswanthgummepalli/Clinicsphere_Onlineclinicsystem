package com.example.bean;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
@Entity
@Table(name="Doctor_table")
public class DoctorBean {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int doctorId;
	@Column
	private String doctor_name;
	@Column
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date_of_birth;
	@Column
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date_of_joining;
	@Column
	private String gender;
	@Column
	private String qualification;
	@Column
	private String specialization;
	@Column
	@JsonProperty("years_of_experience")
	private Integer years_of_experience;
	@Column
	private String street;
	@Column
	private String location;
	@Column
	private String city;
	@Column
	private String state;
	@Column
	private String pincode;
	@Column
	private String contactNumber;
	@Column(name = "email_id")
	private String emailId;
	public int getDoctorId() {
		return doctorId;
	}
	public String getDoctor_name() {
		return doctor_name;
	}
	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}
	public LocalDate getDate_of_birth() {
		return date_of_birth;
	}
	public void setDate_of_birth(LocalDate date_of_birth) {
		this.date_of_birth = date_of_birth;
	}
	public LocalDate getDate_of_joining() {
		return date_of_joining;
	}
	public void setDate_of_joining(LocalDate date_of_joining) {
		this.date_of_joining = date_of_joining;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getSpecialization() {
		return specialization;
	}
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
	public Integer getYears_of_experience() {
		return years_of_experience;
	}
	public void setYears_of_experience(Integer years_of_experience) {
		this.years_of_experience = years_of_experience;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	
}
