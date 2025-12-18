package com.adamantic.user_management.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "user_roles")
@Data // Qui @Data va bene perché non ci sono liste/collezioni complesse
@NoArgsConstructor // Lombok genera il costruttore vuoto
@AllArgsConstructor // Lombok genera il costruttore pieno
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = true)
    private Area area;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = true)
    private Project project;
}