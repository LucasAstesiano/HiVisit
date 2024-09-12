package com.HiVisit.app.service;

import com.HiVisit.app.Enums.Role;
import com.HiVisit.app.jwt.JwtService;
import com.HiVisit.app.model.AuthResponse;
import com.HiVisit.app.model.LoginRequest;
import com.HiVisit.app.model.RegisterRequest;
import com.HiVisit.app.model.User;
import com.HiVisit.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request){

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getDni(),request.getPassword()));
        UserDetails user=userRepository.findByDni(request.getDni()).orElseThrow();
        String token =jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();

    }
    public AuthResponse register(RegisterRequest request){
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = User.builder()
                .name(request.getName())
                .password(encodedPassword)
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .dni(request.getDni())
                .visits(request.getVisits())
                .role(Role.USER)
                .build();
        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public AuthResponse registerAdmin(RegisterRequest request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = User.builder()
                .name(request.getName())
                .password(encodedPassword)
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .dni(request.getDni())
                .role(Role.ADMIN)
                .build();
        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}
