package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.utils.NumberUtils;
import lombok.SneakyThrows;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @SneakyThrows
    public void createUser(User user){

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new BadRequestException("Error: Email is already taken!");
        }
        this.userRepository.save(user);
    }

    public void delete(Long id) {
        this.userRepository.deleteById(id);
    }

    @SneakyThrows
    public User findById(String id) {
        if(NumberUtils.isValidLong(id)){
            throw new IllegalArgumentException("id not valid");
        }
        Long idLong = Long.valueOf(id);

        User user = this.userRepository.findById(idLong).orElse(null);

        if (user == null) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    public Optional<User> findByEmail(String email){
        return this.userRepository.findByEmail(email);
    }
}
