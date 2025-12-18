package com.adamantic.user_management.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString; // Importante per l'exclude
import java.util.ArrayList;
import java.util.List;

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

    private String name;
    private String picture;

    // --- NUOVA PARTE ---
    // Mappiamo la relazione inversa: Un utente ha molti UserRole
    // "mappedBy = 'user'" significa: "vai a vedere la variabile 'user' nella classe UserRole per capire come collegarti"
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER) 
    @ToString.Exclude // FONDAMENTALE: evita il crash per loop infinito nei log
    private List<UserRole> userRoles = new ArrayList<>();
    // -------------------
}