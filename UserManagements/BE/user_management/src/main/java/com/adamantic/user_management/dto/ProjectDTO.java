package com.adamantic.user_management.dto;

import com.adamantic.user_management.entity.Project;
import lombok.Data;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private int health;

    public static ProjectDTO fromEntity(Project project) {
        if (project == null) return null;
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setHealth(project.getHealth());
        return dto;
    }
}