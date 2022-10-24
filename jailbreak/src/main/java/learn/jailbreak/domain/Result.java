package learn.jailbreak.domain;

import java.util.List;

public class Result<T> {
    private List<String> messages;
    private T payload;

    public List<String> getMessages() {
        return messages;
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
