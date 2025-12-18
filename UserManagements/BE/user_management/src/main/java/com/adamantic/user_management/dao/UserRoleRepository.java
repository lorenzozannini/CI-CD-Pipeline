package com.adamantic.user_management.dao;

import com.adamantic.user_management.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    // Trova tutti i ruoli/permessi di un singolo utente tramite il suo ID
    List<UserRole> findByUserId(Long userId);

    // Trova tutti i ruoli di un utente tramite la sua Email
    List<UserRole> findByUserEmail(String email);

    // Trova tutti gli utenti che hanno un certo ruolo (es. tutti gli ADMIN)
    List<UserRole> findByRoleRole(String roleName); // Naviga dentro Role -> cerca il campo role
}