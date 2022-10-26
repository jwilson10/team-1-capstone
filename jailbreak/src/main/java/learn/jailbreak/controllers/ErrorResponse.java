package learn.jailbreak.controllers;

import learn.jailbreak.domain.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorResponse {

    private String message;
    public ErrorResponse(String message){
        this.message = message;
    }

    public ErrorResponse(){};

    public String getMessage(){
        return message;
    }
    //TODO: Implement build
    public static <T> ResponseEntity<Object> build(Result<T> result){
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return null;
    }
}
