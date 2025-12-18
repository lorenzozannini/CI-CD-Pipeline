package com.adamantic.user_management.dao;

import com.adamantic.user_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    // Ora questo funziona perché User.java ha la variabile "googleId"
    Optional<User> findByGoogleId(String googleId); 
}