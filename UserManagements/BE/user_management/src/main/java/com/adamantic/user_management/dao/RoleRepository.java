package com.adamantic.user_management.dao;

import com.adamantic.user_management.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    // Cerca un ruolo per nome (es. "ADMIN")
    Optional<Role> findByRole(String role);
}