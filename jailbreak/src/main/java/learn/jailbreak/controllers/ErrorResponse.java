package learn.jailbreak.controllers;

import learn.jailbreak.domain.Result;
import learn.jailbreak.domain.ResultType;
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

    public static <T> ResponseEntity<Object> build(Result<T> result){
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if(result.getResultType() == null || result.getResultType() == ResultType.INVALID){
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getResultType() == ResultType.INVALID){
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result.getMessages(), status);
    }
}
