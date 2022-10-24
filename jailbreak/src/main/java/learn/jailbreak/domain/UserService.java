package learn.jailbreak.domain;

import learn.jailbreak.data.UserRepository;
import learn.jailbreak.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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


    public void validatePassword(){

    }

    public Result<User> create(String username, String password) {
        return new Result<User>();
    }
}
