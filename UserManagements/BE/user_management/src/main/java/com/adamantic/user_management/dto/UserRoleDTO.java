package com.adamantic.user_management.dto;

import com.adamantic.user_management.entity.UserRole;
import lombok.Data;

@Data
public class UserRoleDTO {
    private Long id;
    private UserDTO user; 
    private RoleDTO role;
    private AreaDTO area;
    private ProjectDTO project;

    // Metodo STANDARD (Completo - va in loop se chiamato da UserDTO)
    public static UserRoleDTO fromEntity(UserRole ur) {
        if (ur == null) return null;
        
        UserRoleDTO dto = new UserRoleDTO();
        dto.setId(ur.getId());
        dto.setUser(UserDTO.fromEntity(ur.getUser())); // <--- QUESTA RIGA CAUSA IL LOOP
        dto.setRole(RoleDTO.fromEntity(ur.getRole()));
        
        if (ur.getArea() != null) dto.setArea(AreaDTO.fromEntity(ur.getArea()));
        if (ur.getProject() != null) dto.setProject(ProjectDTO.fromEntity(ur.getProject()));
        
        return dto;
    }

    // --- NUOVO METODO SICURO ---
    // Questo metodo converte tutto TRANNE l'utente.
    // Lo usiamo quando siamo già dentro UserDTO.
    public static UserRoleDTO fromEntityWithoutUser(UserRole ur) {
        if (ur == null) return null;
        
        UserRoleDTO dto = new UserRoleDTO();
        dto.setId(ur.getId());
        
        // NON settiamo l'User qui, lo lasciamo null!
        // dto.setUser(...);  <-- SALTATA
        
        dto.setRole(RoleDTO.fromEntity(ur.getRole()));
        
        if (ur.getArea() != null) dto.setArea(AreaDTO.fromEntity(ur.getArea()));
        if (ur.getProject() != null) dto.setProject(ProjectDTO.fromEntity(ur.getProject()));
        
        return dto;
    }
}