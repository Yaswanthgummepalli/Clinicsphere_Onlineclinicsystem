package com.example.dao;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bean.CredentialBean;
@Repository
public interface CredentialsDAO extends JpaRepository<CredentialBean,String>{
		Optional<CredentialBean> findByEmailId(String emailId);
}
