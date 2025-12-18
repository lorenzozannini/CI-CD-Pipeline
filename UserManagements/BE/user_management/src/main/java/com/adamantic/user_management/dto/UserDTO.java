package com.adamantic.user_management.dto;

import com.adamantic.user_management.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String picture;
    private String googleId; // Rinominato anche qui per coerenza

    public static UserDTO fromEntity(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setPicture(user.getPicture());
        
        // Ora usiamo il getter corretto generated da Lombok
        dto.setGoogleId(user.getGoogleId()); 
        return dto;
    }

    public User toEntity() {
        User user = new User();
        user.setId(this.id);
        user.setEmail(this.email);
        user.setName(this.name);
        user.setPicture(this.picture);
        
        // Setter corretto
        user.setGoogleId(this.googleId);
        return user;
    }
}