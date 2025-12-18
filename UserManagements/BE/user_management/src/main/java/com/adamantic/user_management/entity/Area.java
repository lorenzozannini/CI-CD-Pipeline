package com.adamantic.user_management.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "areas")
@Getter @Setter // Meglio di @Data per le relazioni JPA per evitare loop su equals/hashCode
@NoArgsConstructor
@AllArgsConstructor
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
        name = "project_areas",
        joinColumns = @JoinColumn(name = "area_id"),
        inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    // Escludiamo projects dal toString per evitare loop infiniti
    private Set<Project> projects = new HashSet<>();

    // Helper methods
    public void addProject(Project project) {
        this.projects.add(project);
        project.getAreas().add(this);
    }

    public void removeProject(Project project) {
        this.projects.remove(project);
        project.getAreas().remove(this);
    }
}