package com.example.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bean.DoctorBean;
@Repository
public interface DoctorDao extends JpaRepository<DoctorBean, Integer>{
	Optional<DoctorBean> findByEmailId(String emailId);
}
