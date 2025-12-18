package com.adamantic.user_management.dto;

import com.adamantic.user_management.entity.Role;
import lombok.Data;

@Data
public class RoleDTO {
    private Long id;
    private String roleName;

    public static RoleDTO fromEntity(Role role) {
        if (role == null) return null;
        RoleDTO dto = new RoleDTO();
        dto.setId(role.getId());
        dto.setRoleName(role.getRole());
        return dto;
    }
}