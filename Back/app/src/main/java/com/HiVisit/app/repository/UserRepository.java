package com.HiVisit.app.repository;

import com.HiVisit.app.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByDniAndPassword(String dni,String password);
    Optional<User> findByDni(String dni);

}
