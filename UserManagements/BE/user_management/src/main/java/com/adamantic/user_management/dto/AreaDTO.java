package com.adamantic.user_management.dto;

import com.adamantic.user_management.entity.Area;
import lombok.Data;

@Data
public class AreaDTO {
    private Long id;
    private String name;

    public static AreaDTO fromEntity(Area area) {
        if (area == null) return null;
        AreaDTO dto = new AreaDTO();
        dto.setId(area.getId());
        dto.setName(area.getName());
        return dto;
    }
}