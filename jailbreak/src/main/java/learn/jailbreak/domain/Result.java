package learn.jailbreak.domain;

import java.util.ArrayList;
import java.util.List;

public class Result<T> {
    private List<String> messages = new ArrayList<>();
    private T payload;

    private ResultType resultType;

    public ResultType getResultType() {
        return resultType;
    }

    public void setResultType(ResultType resultType) {
        this.resultType = resultType;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void addMessage(String message){
        this.messages.add(message);
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public boolean isSuccess() {
        return messages.size() == 0;
    }
}
