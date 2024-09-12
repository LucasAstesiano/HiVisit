package com.HiVisit.app.service;


import com.HiVisit.app.exeptions.UserNotFoundException;
import com.HiVisit.app.model.User;
import com.HiVisit.app.model.Visit;
import com.HiVisit.app.repository.UserRepository;
import com.HiVisit.app.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    VisitRepository visitRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void createUser(User user){
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }
    public Optional<User> getUserByDni(String dni) {
        return userRepository.findByDni(dni);
    }


    public void updateUser(String userId,User user){
        User user1= (User) userRepository.findById(userId).orElse(null);
        if (user1 != null){
            user1.setDni(user.getDni());
            user1.setName(user.getName());
            user1.setLastName(user.getLastName());
            user1.setPhone(user.getPhone());
            if (!user.getPassword().equals(user1.getPassword())) {
                String encodedPassword = passwordEncoder.encode(user.getPassword());
                user1.setPassword(encodedPassword);
            }
            userRepository.save(user1);
        }

    }
    public void deleteUser(String userId){
        userRepository.deleteById(userId);

    }
    //Login de usuario


    //Agregar visitas
    public User addVisitToUser(String userDni, Visit visit) {
        if (visit == null) {
            throw new IllegalArgumentException("Visit cannot be null");
        }

        Optional<User> optionalUser = userRepository.findByDni(userDni);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.getVisits().add(visit);
            visitRepository.save(visit);
            userRepository.save(user);
            return user;
        } else {
            throw new UserNotFoundException("User with DNI " + userDni + " not found");
        }
    }
    //Listar visitas

    public List<Visit> getAllVisitsByUserDni(String dni) {
        Optional<User> optionalUser = userRepository.findByDni(dni);
        if (optionalUser.isPresent()) {
            return optionalUser.get().getVisits();
        } else {
            throw new UserNotFoundException("User with DNI " + dni + " not found");
        }
    }

}
