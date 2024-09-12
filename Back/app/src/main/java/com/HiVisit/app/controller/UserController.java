package com.HiVisit.app.controller;

import com.HiVisit.app.exeptions.UserNotFoundException;
import com.HiVisit.app.model.*;
import com.HiVisit.app.service.AuthService;
import com.HiVisit.app.service.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;

    @GetMapping(value = "/users", produces = "application/json")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/users/{id}", produces = "application/json")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @GetMapping(value = "/users/dni/{dni}", produces = "application/json")
    public Optional<User> getUserByDni(@PathVariable String dni) {
        return userService.getUserByDni(dni);
    }

    //REGISTRAR USUARIO
    @PostMapping(value = "/auth/register")
    public ResponseEntity<AuthResponse> postUser(@RequestBody RegisterRequest request) {
        if (userService.getUserByDni(request.getDni()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                    .body(new AuthResponse("Error: El DNI ingresado ya esta registrado"));
        }
        else
        return ResponseEntity.ok(authService.register(request));
    }
    //REGISTRAR ADMIN
    @PostMapping("/auth/register-admin")
    public AuthResponse registerAdmin(@RequestBody RegisterRequest request) {
        return authService.registerAdmin(request);
    }

    @PutMapping(value = "/users/{id}")
    public void updateUser(@PathVariable String id, @RequestBody User user) {
        userService.updateUser(id, user);
    }

    @DeleteMapping(value = "/users/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    //LOGIN
    @PostMapping(value = "/auth/login")
    public ResponseEntity<AuthResponse> Login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    //Agregar visitas
    @PostMapping(value="/dni/{dni}/visits")
    public ResponseEntity<User> addVisitToUser(@PathVariable String dni, @RequestBody Visit visit) {
        try {
            User user = userService.addVisitToUser(dni,visit);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    //Listar visitas
    @GetMapping(value="/dni/{dni}/visits")
    public ResponseEntity<List<Visit>> getAllVisitsByUserDni(@PathVariable String dni) {
        try {
            List<Visit> visits = userService.getAllVisitsByUserDni(dni);
            return new ResponseEntity<>(visits, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
