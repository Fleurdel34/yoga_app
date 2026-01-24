package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.utils.NumberUtils;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;

    private final UserRepository userRepository;

    public SessionService(SessionRepository sessionRepository, UserRepository userRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }

    public Session create(Session session) {
        return this.sessionRepository.save(session);
    }

    public void delete(Long id) {
        this.sessionRepository.deleteById(id);
    }

    public List<Session> findAll() {
        return this.sessionRepository.findAll();
    }

    @SneakyThrows
    public Session getById(String id) {

        if(NumberUtils.isValidLong(id)){
            throw new IllegalArgumentException("id not valid");
        }

        Long idLong = Long.valueOf(id);
        Session session = this.sessionRepository.findById(idLong).orElse(null);

        if (session == null) {
            throw new NotFoundException("Session not found");
        }

        return session;

    }

    public Session update(String id, Session session) {
        if(NumberUtils.isValidLong(id)){
            throw new IllegalArgumentException("id not valid");
        }
        Long idLong = Long.valueOf(id);
        session.setId(idLong);
        return this.sessionRepository.save(session);
    }

    @SneakyThrows
    public void participate(String id, String userId) {
        if(NumberUtils.isValidLong(id)){
            throw new IllegalArgumentException("id not valid");
        }
        Long idLong = Long.valueOf(id);
        Long idUserLong = Long.valueOf(userId);
        Session session = this.sessionRepository.findById(idLong).orElse(null);
        User user = this.userRepository.findById(idUserLong).orElse(null);

        if (session == null || user == null) {
            throw new NotFoundException("not found session or not found user");
        }

        boolean alreadyParticipate = session.getUsers().stream().anyMatch(o -> o.getId().equals(idUserLong));
        if (alreadyParticipate) {
            throw new BadRequestException("Already Participate");
        }

        session.getUsers().add(user);

        this.sessionRepository.save(session);
    }

    @SneakyThrows
    public void noLongerParticipate(String id, String userId) {
        if(NumberUtils.isValidLong(id)){
            throw new IllegalArgumentException("id not valid");
        }

        Long idLong = Long.valueOf(id);
        Long idUserLong = Long.valueOf(userId);

        Session session = this.sessionRepository.findById(idLong).orElse(null);
        if (session == null) {
            throw new NotFoundException("not found session");
        }

        boolean alreadyParticipate = session.getUsers().stream().anyMatch(o -> o.getId().equals(idUserLong));
        if (!alreadyParticipate) {
            throw new BadRequestException("Not already participate");
        }

        session.setUsers(session.getUsers().stream().filter(user -> !user.getId().equals(idUserLong)).collect(Collectors.toList()));

        this.sessionRepository.save(session);
    }
}
