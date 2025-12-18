package com.adamantic.user_management.dto;

import com.adamantic.user_management.entity.UserRole;
import lombok.Data;

@Data
public class UserRoleDTO {
    private Long id;
    private UserDTO user;
    private RoleDTO role;
    private AreaDTO area;       // Potrebbe essere null
    private ProjectDTO project; // Potrebbe essere null

    public static UserRoleDTO fromEntity(UserRole ur) {
        if (ur == null) return null;
        
        UserRoleDTO dto = new UserRoleDTO();
        dto.setId(ur.getId());
        
        // Conversione sicura
        dto.setUser(UserDTO.fromEntity(ur.getUser()));
        dto.setRole(RoleDTO.fromEntity(ur.getRole()));
        
        // Controllo se area esiste prima di convertirla
        if (ur.getArea() != null) {
            dto.setArea(AreaDTO.fromEntity(ur.getArea()));
        }
        
        // Controllo se project esiste prima di convertirlo
        if (ur.getProject() != null) {
            dto.setProject(ProjectDTO.fromEntity(ur.getProject()));
        }
        
        return dto;
    }
}