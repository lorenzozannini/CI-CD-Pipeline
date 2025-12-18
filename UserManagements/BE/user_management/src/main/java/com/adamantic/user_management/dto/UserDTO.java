package com.adamantic.user_management.dto;

import com.adamantic.user_management.entity.User;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String picture;
    
    // 1. Ho rimosso googleId (così non viene inviato al frontend)

    // 2. Ho cambiato il tipo da List<UserRoleDTO> a List<String>
    private List<String> roles = new ArrayList<>();

    public static UserDTO fromEntity(User user) {
        if (user == null) return null;
        
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setPicture(user.getPicture());
        // Non settiamo più il googleId

        // --- LOGICA SEMPLIFICATA PER I RUOLI ---
        if (user.getUserRoles() != null) {
            List<String> roleNames = user.getUserRoles().stream()
                // Entriamo nell'oggetto UserRole -> prendiamo l'oggetto Role -> prendiamo la stringa nome
                .map(userRole -> userRole.getRole().getRole()) 
                .collect(Collectors.toList());
            
            dto.setRoles(roleNames);
        }
        // ---------------------------------------

        return dto;
    }

    public User toEntity() {
        User user = new User();
        user.setId(this.id);
        user.setEmail(this.email);
        user.setName(this.name);
        user.setPicture(this.picture);
        return user;
    }
}