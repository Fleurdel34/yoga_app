package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testCreateUser(){
        User jane = new User(null, "jane@gmail.com",
                "Tarzan", "Jane", "Toto1234",
                false, LocalDateTime.now() , LocalDateTime.now());

        User janeOk = new User(1L, "jane@gmail.com",
                "Tarzan", "Jane", "Toto1234",
                false, LocalDateTime.now() , LocalDateTime.now());

        Mockito.when(userRepository.existsByEmail("jane@gmail.com"))
                        .thenReturn(false);

        Mockito.when(userRepository.save(jane))
                .thenReturn(janeOk);
        this.userService.createUser(jane);
        Mockito.verify(userRepository).save(jane);
    }

    @Test
    void createUserWithExceptionEmailExists(){
        User user= new User();
        user.setEmail("jane@gmail.com");

        Mockito.when(userRepository.existsByEmail("jane@gmail.com"))
                .thenReturn(true);

        Assertions.assertThrows(BadRequestException.class, ()->{
                userService.createUser(user);
        });

        Mockito.verify(userRepository, Mockito.never()).save(Mockito.any());

    }

    @Test
    void testCreateUserFailed(){
        User john = new User();
        john.setFirstName("John");
        john.setLastName("DOE");
        john.setPassword("toto1234");
        john.setAdmin(false);

        Mockito.when(userRepository.save(john))
                .thenThrow(new IllegalArgumentException("Email can't be null"));

        try {
            this.userService.createUser(john);
        }catch(Exception e){
            assertThat(e).isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("Email can't be null");
        }
    }

    @Test
    void testFindByEmail(){

        User janeFound = new User(1L, "jane@gmail.com",
                "Tarzan", "Jane", "Toto1234",
                false, LocalDateTime.now() , LocalDateTime.now());

        Mockito.when(userRepository.findByEmail("jane@gmail.com"))
                .thenReturn(Optional.of(janeFound));

        this.userService.findByEmail("jane@gmail.com");
        Mockito.verify(userRepository).findByEmail("jane@gmail.com");
    }

    @Test
    void testFindById(){
        User janeFoundId = new User(1L, "jane@gmail.com",
                "Tarzan", "Jane", "Toto1234",
                false, LocalDateTime.now() , LocalDateTime.now());

        Mockito.when(userRepository.findById(1L))
                .thenReturn(Optional.of(janeFoundId));

        this.userService.findById(String.valueOf(1L));
        Mockito.verify(userRepository).findById(1L);
    }

    @Test
    void testFindById_NotFound() {

        Mockito.when(userRepository.findById(2L))
                .thenReturn(Optional.empty());

        try{
            userService.findById("2");
        }catch (Exception e){
            assertThat(e).isInstanceOf(NotFoundException.class)
                    .hasMessage("User not found");
        };

        Mockito.verify(userRepository).findById(2L);
    }
}
