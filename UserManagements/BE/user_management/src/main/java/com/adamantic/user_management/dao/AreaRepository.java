package com.adamantic.user_management.dao;

import com.adamantic.user_management.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {
    // Spring crea da solo findAll(), save(), deleteById()...
    
    // Se serve cercare per nome:
    // Optional<Area> findByName(String name);
}