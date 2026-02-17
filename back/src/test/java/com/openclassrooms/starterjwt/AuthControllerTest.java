package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.controllers.AuthController;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.response.JwtResponse;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Optional;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Mock
    UserService userService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthController authController;


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
    public void testLoginUserIsAdmin() throws Exception{

        User jean = new User(
                "jean@gmail.com",
                "Jean",
                "Benoit",
                passwordEncoder.encode("rose234"),
                 true);

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
                        .andExpect(jsonPath("$.admin").value(true));
    }

    @Test
    public void testLoginUserNotIsAdmin() throws Exception{

        User jean = new User(
                "elodie@gmail.com",
                "Elodie",
                "Francois",
                passwordEncoder.encode("rose234"),
                false);

        userRepository.save(jean);


        String requestBody= """
               {
               "email": "elodie@gmail.com",
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

    @Test
    public void testLoginUserNull()  {

        LoginRequest request = new LoginRequest();
        request.setEmail("usernull@gmail.com");
        request.setPassword("testpassword");

        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(1L)
                .username("usernull@gmail.com")
                .firstName("Fabien")
                .lastName("test")
                .build();
        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("jwttoken");
        when(userService.findByEmail(anyString())).thenReturn(Optional.empty());

        ResponseEntity<?> response =authController.authenticateUser(request);

        JwtResponse body = (JwtResponse) response.getBody();
        Assertions.assertNotNull(body);
        Assertions.assertFalse(body.getAdmin());



    }



}
