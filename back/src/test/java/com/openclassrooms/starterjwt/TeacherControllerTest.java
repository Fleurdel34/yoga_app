package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TeacherControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private TeacherRepository teacherRepository;

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testFindById() throws Exception{
        Teacher teacher = new Teacher();
        teacher.setFirstName("Jean");
        teacher.setLastName("Dupont");
        teacherRepository.save(teacher);

        mockMvc.perform(get("/api/teacher/"+ teacher.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(teacher.getId()))
                .andExpect(jsonPath("$.firstName").value("Jean"))
                .andExpect(jsonPath("$.lastName").value("Dupont"));

    }


    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testFindAll() throws Exception{
        Teacher teacher1 = new Teacher();
        teacher1.setFirstName("Jean");
        teacher1.setLastName("Dupont");
        teacherRepository.save(teacher1);

        Teacher teacher2 = new Teacher();
        teacher2.setFirstName("Marie");
        teacher2.setLastName("Sophie");
        teacherRepository.save(teacher2);

        mockMvc.perform(get("/api/teacher")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].firstName").value("Elodie"))
                .andExpect(jsonPath("$[1].firstName").value("Jean"));
    }

    @Test
    void testFindAllUnauthorized() throws Exception{
        Teacher teacher14 = new Teacher();
        teacher14.setFirstName("Eloise");
        teacher14.setLastName("Antoine");
        teacherRepository.save(teacher14);

        Teacher teacher25 = new Teacher();
        teacher25.setFirstName("Christelle");
        teacher25.setLastName("André");
        teacherRepository.save(teacher25);

        mockMvc.perform(get("/api/teacher")
                 .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testFindByIdUnauthorized() throws Exception{
        Teacher teacher12 = new Teacher();
        teacher12.setFirstName("Elodie");
        teacher12.setLastName("Bastien");
        teacherRepository.save(teacher12);

        mockMvc.perform(get("/api/teacher/"+ teacher12.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
