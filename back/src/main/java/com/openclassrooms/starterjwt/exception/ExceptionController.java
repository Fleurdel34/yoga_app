package com.openclassrooms.starterjwt.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;


@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> handleBadRequestException(BadRequestException exception){
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setDetails(List.of(exception.getMessageException(), exception.getMessage()));
        return ResponseEntity
                .status(exception.getCode())
                .body(errorResponse);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleBadRequestException(NotFoundException exception){
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setDetails(List.of(exception.getMessageException(), exception.getMessage()));
        return ResponseEntity
                .status(exception.getCode())
                .body(exception.getMessage());
    }
}
