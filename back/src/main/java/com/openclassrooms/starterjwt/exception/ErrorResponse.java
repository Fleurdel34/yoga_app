package com.openclassrooms.starterjwt.exception;

import lombok.Data;

import java.util.List;

@Data
public class ErrorResponse {
    private List<String> details;
}
