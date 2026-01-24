package com.openclassrooms.starterjwt.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BadRequestException extends Exception {

    private String messageException;
    private int code;

    public BadRequestException(String message) {
        super(message);
    }

    public String getMessageException() {
        return messageException= "Bad Request";
    }

    public int getCode() {
        return code = 400;
    }
}
