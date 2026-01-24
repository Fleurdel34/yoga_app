package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import com.openclassrooms.starterjwt.utils.NumberUtils;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public List<Teacher> findAll() {
        return this.teacherRepository.findAll();
    }

    @SneakyThrows
    public Teacher findById(String id) {

        if(NumberUtils.isValidLong(id)){
            throw new IllegalArgumentException("id not valid");
        }

        Long idLong = Long.valueOf(id);
        Teacher teacher = this.teacherRepository.findById(idLong).orElse(null);

        if (teacher == null) {
            throw new NotFoundException("Teacher not found");
        }

        return teacher;
    }
}
