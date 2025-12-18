package com.adamantic.user_management.controller;

import com.adamantic.user_management.dto.UserDTO;
import com.adamantic.user_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users") // Questo è l'indirizzo base: http://localhost:8080/users
@CrossOrigin(origins = "*")   // Permette al frontend di chiamare questo servizio
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/showAll") // http://localhost:8080/users/showAll
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}