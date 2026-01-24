package com.openclassrooms.starterjwt.exception;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NotFoundException extends Exception {

    private String messageException;
    private int code;

    public NotFoundException(String message) {
        super(message);
    }

    public String getMessageException() {
        return messageException= "Not found";
    }

    public int getCode() {
        return code = 404;
    }
}
