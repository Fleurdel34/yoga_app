package com.openclassrooms.starterjwt;



import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = true)
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Test
    public void testRegisterUser() throws Exception{

        String requestBody= """
               {
               "email": "julie@gmail.com",
               "lastName": "Doe",
               "firstName": "julie",
               "password": "toto1234"
               }
               """;


        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully!"));
    }

    @Test
    public void testRegisterUserBadRequest() throws Exception{

        String requestBody= """
               {
               "lastName": "Doe",
               "firstName": "julie",
               "password": "toto1234"
               }
               """;


        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                        .andExpect(status().isBadRequest());
    }

    @Test
    public void testLogin() throws Exception{

        User matthieu = new User(
                "matthieu@gmail.com",
                "Matthieu",
                "Martin",
                passwordEncoder.encode("bibi1234"),
                false );
        userRepository.save(matthieu);


        String requestBody= """
               {
               "email": "matthieu@gmail.com",
               "password": "bibi1234"
               }
               """;


        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                        .andExpect(status().isOk());
    }


    @Test
    public void testLoginUserExist() throws Exception{

        User jean = new User(
                "jean@gmail.com",
                "Jean",
                "Benoit",
                passwordEncoder.encode("rose234"),
                 false);

        userRepository.save(jean);


        String requestBody= """
               {
               "email": "jean@gmail.com",
               "password": "rose234"
               }
               """;


        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.admin").value(false));
    }

    @Test
    public void testLoginUserNoFound() throws Exception{

        User jean = new User(
                "bernard@gmail.com",
                "Bernard",
                "Alexandro",
                passwordEncoder.encode("rose234"),
                false);
        userRepository.save(jean);


        String requestBody= """
               {
               "email": "bastien@gmail.com",
               "password": "rose234"
               }
               """;


        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                        .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginBadRequestMissingEmail() throws Exception {
        String requestBody= """
                {
                    "password": "rose234"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                        .andExpect(status().isBadRequest());
    }



}
