package com.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bean.ProfileBean;
@Repository
public interface ProfileDAO extends JpaRepository<ProfileBean,String>{

}
