package com.example.bean;
import java.time.LocalDate;
public class LeaveBean {
	private String leaveid;
	private String doctorId;
	private LocalDate leaveFrom;
	private LocalDate leaveTo;
	private String reason;
	private int status;
	public String getLeaveid() {
		return leaveid;
	}
	public void setLeaveid(String leaveid) {
		this.leaveid = leaveid;
	}
	public String getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}
	public LocalDate getLeaveFrom() {
		return leaveFrom;
	}
	public void setLeaveFrom(LocalDate leaveFrom) {
		this.leaveFrom = leaveFrom;
	}
	public LocalDate getLeaveTo() {
		return leaveTo;
	}
	public void setLeaveTo(LocalDate leaveTo) {
		this.leaveTo = leaveTo;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
}
