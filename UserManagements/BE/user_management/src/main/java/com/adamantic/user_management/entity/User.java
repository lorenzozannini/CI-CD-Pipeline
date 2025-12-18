package com.adamantic.user_management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(name = "google_id") 
    private String googleId; 
    // ----------------------

    private String name;
    private String picture;
}