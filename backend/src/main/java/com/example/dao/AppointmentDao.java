package com.example.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bean.AppointmentBean;
@Repository
public interface AppointmentDao extends JpaRepository<AppointmentBean,Integer>{
	List<AppointmentBean> findByPatientId(int patientId);
}
