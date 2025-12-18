package com.adamantic.user_management.service;

import com.adamantic.user_management.dto.UserDTO;
import com.adamantic.user_management.entity.User;
import com.adamantic.user_management.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Funzione che recupera tutti gli utenti e li converte in DTO
    public List<UserDTO> getAllUsers() {
        // 1. Recupera la lista di Entity dal DB
        List<User> users = userRepository.findAll();

        // 2. Converte la lista di Entity in una lista di DTO
        // Usiamo gli Stream di Java per farlo in modo elegante
        return users.stream()
                .map(UserDTO::fromEntity) // Chiama il metodo statico che abbiamo fatto prima
                .collect(Collectors.toList());
    }
}