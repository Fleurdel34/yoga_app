package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @InjectMocks
    private SessionService sessionService;

    @Test
    void testCreateSession(){

        Session yoga = new Session();
        yoga.setName("Meditation");
        yoga.setDate(new Date());
        yoga.setDescription("relaxing");
        yoga.setCreatedAt(LocalDateTime.now());
        yoga.setUpdatedAt(LocalDateTime.now());

        Mockito.when(sessionRepository.save(yoga))
                .thenReturn(yoga);

        this.sessionService.create(yoga);

        Mockito.verify(sessionRepository).save(yoga);
    }

    @Test
    void testCreateSessionFailed(){

        Session yoga = new Session();
        yoga.setName("Meditation");
        yoga.setDate(new Date());
        yoga.setCreatedAt(LocalDateTime.now());
        yoga.setUpdatedAt(LocalDateTime.now());

        Mockito.when(sessionRepository.save(yoga))
                .thenThrow(new IllegalArgumentException("Description can't be null"));

        try {
            this.sessionService.create(yoga);
        }catch(Exception e){
            assertThat(e).isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("Description can't be null");
        }
    }

    @Test
    void testDeleteSession(){
        Long sessionId= 1L;
        Mockito.doNothing().when(sessionRepository).deleteById(sessionId);
        this.sessionService.delete(sessionId);
        Mockito.verify(sessionRepository).deleteById(sessionId);
    }

    @Test
    void testGedBySessionId(){
        Session yoga = new Session();
        yoga.setId(1L);
        yoga.setName("Meditation");
        yoga.setDate(new Date());
        yoga.setDescription("relaxing");
        yoga.setCreatedAt(LocalDateTime.now());
        yoga.setUpdatedAt(LocalDateTime.now());

        Mockito.when(sessionRepository.findById(1L))
                .thenReturn(Optional.of(yoga));

        this.sessionService.getById("1");
        Mockito.verify(sessionRepository).findById(1L);

    }

    @Test
    void testGedByIdSession_NotFound() {

        Mockito.when(sessionRepository.findById(2L))
                .thenReturn(Optional.empty());

        try{
            sessionService.getById("2");
        }catch (Exception e){
            assertThat(e).isInstanceOf(NotFoundException.class)
                    .hasMessage("Session not found");
        }

        Mockito.verify(sessionRepository).findById(2L);
    }

    @Test
    void testGedByIdSession_IdInvalid() {

        Mockito.when(sessionRepository.findById(2L))
                .thenThrow(new IllegalArgumentException("id not valid"));;

        try{
            sessionService.getById("2");
        }catch (Exception e){
            assertThat(e).isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("id not valid");
        }

        Mockito.verify(sessionRepository).findById(2L);
    }

    @Test
    void testUpdateSession(){

        String yogaUpdateId = "1";
        Session yogaUpdate = new Session();
        yogaUpdate.setName("Meditation");
        yogaUpdate.setDate(new Date());
        yogaUpdate.setDescription("relaxing");
        yogaUpdate.setCreatedAt(LocalDateTime.now());
        yogaUpdate.setUpdatedAt(LocalDateTime.now());

        Mockito.when(sessionRepository.save(yogaUpdate))
                .thenReturn(yogaUpdate);

        this.sessionService.update(yogaUpdateId, yogaUpdate);

        Mockito.verify(sessionRepository).save(yogaUpdate);
    }

    @Test
    void testUpdateSessionFailed(){

        String yogaUpdateId = "1";
        Session yogaUpdate = new Session();
        yogaUpdate.setName("Meditation");
        yogaUpdate.setDate(new Date());
        yogaUpdate.setCreatedAt(LocalDateTime.now());
        yogaUpdate.setUpdatedAt(LocalDateTime.now());

        Mockito.when(sessionRepository.save(yogaUpdate))
                .thenThrow(new IllegalArgumentException("Description can't be null"));

        try {
            this.sessionService.update(yogaUpdateId,  yogaUpdate);
        }catch(Exception e){
            assertThat(e).isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("Description can't be null");
        }
    }

    @Test
    void testFindAllSessions(){
        Session yoga = new Session();
        yoga.setId(1L);
        yoga.setName("Meditation");
        yoga.setDate(new Date());
        yoga.setDescription("relaxing");
        yoga.setCreatedAt(LocalDateTime.now());
        yoga.setUpdatedAt(LocalDateTime.now());

        Session relaxing = new Session();
        relaxing.setId(2L);
        relaxing.setName("Yoga");
        relaxing.setDate(new Date());
        relaxing.setDescription("relaxing and exercise");
        relaxing.setCreatedAt(LocalDateTime.now());
        relaxing.setUpdatedAt(LocalDateTime.now());

        List<Session> sessionList= java.util.List.of(yoga, relaxing);

        Mockito.when(sessionRepository.findAll())
                .thenReturn(sessionList);

        this.sessionService.findAll();
        Mockito.verify(sessionRepository).findAll();

    }
}
