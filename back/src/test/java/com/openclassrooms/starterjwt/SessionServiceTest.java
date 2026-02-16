package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

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

        assertThatThrownBy(() -> sessionService.getById("abc"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("id not valid");

        Mockito.verifyNoInteractions(sessionRepository);
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
    void testUpdateSession_IdInvalid() {
        Session yogaUpdate = new Session();
        yogaUpdate.setName("Meditation");
        yogaUpdate.setDate(new Date());
        yogaUpdate.setDescription("relaxing");
        yogaUpdate.setCreatedAt(LocalDateTime.now());
        yogaUpdate.setUpdatedAt(LocalDateTime.now());

        assertThatThrownBy(() -> sessionService.update("abc",yogaUpdate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("id not valid");

        Mockito.verifyNoInteractions(sessionRepository);
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

    @Test
    void testParticipate(){

        String yogaUpdateId = "1";
        Session yoga = new Session();
        yoga.setId(1L);
        yoga.setName("Meditation");
        yoga.setDate(new Date());
        yoga.setUsers(new ArrayList<>());
        yoga.setDescription("relaxing");
        yoga.setCreatedAt(LocalDateTime.now());
        yoga.setUpdatedAt(LocalDateTime.now());

        String userId ="2";
        User john = new User();
        john.setId(2L);
        john.setEmail("john.doe@gmail.com");
        john.setFirstName("John");
        john.setLastName("DOE");
        john.setPassword("toto1234");
        john.setAdmin(false);

        Mockito.when(sessionRepository.findById(Long.valueOf(yogaUpdateId)))
                .thenReturn(Optional.of(yoga));

        Mockito.when(userRepository.findById(Long.valueOf(userId)))
                .thenReturn(Optional.of(john));

        this.sessionService.participate(yogaUpdateId, userId);
        Mockito.verify(sessionRepository).save(yoga);

    }

    @Test
    void testParticipate_IdInvalid() {

        assertThatThrownBy(() -> sessionService.participate("abc","abc"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("id not valid");

        Mockito.verifyNoInteractions(sessionRepository);
    }

    @Test
    void testParticipate_SessionNotFound() {

        Mockito.when(sessionRepository.findById(1L))
                .thenReturn(Optional.empty());

        User john = new User();
        john.setId(2L);
        Mockito.when(userRepository.findById(2L))
                .thenReturn(Optional.of(john));

        try{
            sessionService.participate("1", String.valueOf(john.getId()));
        }catch (Exception e){
            assertThat(e).isInstanceOf(NotFoundException.class)
                    .hasMessage("not found session or not found user");
        }

        Mockito.verify(sessionRepository).findById(1L);
        Mockito.verify(userRepository).findById(2L);
    }

    @Test
    void testParticipate_UserNotFound() {

        Session yoga = new Session();
        yoga.setId(1L);
        yoga.setUsers(new ArrayList<>());

        Mockito.when(sessionRepository.findById(1L))
                .thenReturn(Optional.of(yoga));

        Mockito.when(userRepository.findById(2L))
                .thenReturn(Optional.empty());

        try{
            sessionService.participate("1", "2");
        }catch (Exception e){
            assertThat(e).isInstanceOf(NotFoundException.class)
                    .hasMessage("not found session or not found user");
        }

        Mockito.verify(sessionRepository).findById(1L);
        Mockito.verify(userRepository).findById(2L);
    }

    @Test
    void testParticipate_AlreadyParticipate() {

        Session yoga =new Session();
        yoga.setId(1L);

        User john = new User();
        john.setId(2L);

        yoga.setUsers(new ArrayList<>(List.of(john)));


        Mockito.when(sessionRepository.findById(yoga.getId()))
                .thenReturn(Optional.of(yoga));

        Mockito.when(userRepository.findById(john.getId()))
                .thenReturn(Optional.of(john));

        assertThatThrownBy(() -> sessionService.participate("1","2"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("Already Participate");

        Mockito.verify(sessionRepository, Mockito.never()).save(Mockito.any());
    }

    @Test
    void noLongerParticipateTest_IdInvalid(){
        assertThatThrownBy(() -> sessionService.noLongerParticipate("abc","abc"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("id not valid");

        Mockito.verifyNoInteractions(sessionRepository);

    }

    @Test
    void noLongerParticipateTest_NotAlreadyParticipate() {

        Session yoga =new Session();
        yoga.setId(1L);

        User john = new User();
        john.setId(2L);

        yoga.setUsers(new ArrayList<>(List.of()));


        Mockito.when(sessionRepository.findById(yoga.getId()))
                .thenReturn(Optional.of(yoga));


        assertThatThrownBy(() -> sessionService.noLongerParticipate("1","2"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("Not already participate");

        Mockito.verify(sessionRepository, Mockito.never()).save(Mockito.any());
    }


}
