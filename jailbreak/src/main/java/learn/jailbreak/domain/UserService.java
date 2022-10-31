package learn.jailbreak.domain;

import learn.jailbreak.data.UserRepository;
import learn.jailbreak.models.User;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null || !user.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return user;
    }

    public Result<User> create(String username, String password) {
        Result<User> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }

        result = validateUsername(username);
        if(!result.isSuccess()){
            return result;
        }

        password = passwordEncoder.encode(password);

        User appUser = new User(0, username, password, 2);

        try {
            appUser = userRepository.save(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException e) {
            result.addMessage("The provided username already exists");
        }

        return result;
    }

    private Result<User> validateUsername(String username) {
        Result result = new Result();
        if(userRepository.findByUsername(username) != null){
            result.addMessage("The provided username already exists");
        }
        return result;
    }

    private Result<User> validate(String username, String password) {
        Result<User> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addMessage("username is required");
            return result;
        }

        if (password == null) {
            result.addMessage("password is required");
            return result;
        }

        if (username.length() > 50) {
            result.addMessage("username must be less than 50 characters");
        }

        if (!isValidPassword(password)) {
            result.addMessage(
                    "password must be at least 8 character and contain a digit," +
                            " a letter, and a non-digit/non-letter");
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }
}
