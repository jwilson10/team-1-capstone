package learn.jailbreak.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String username;
    private String userPassword;

    @Column(name="role_id")
    private int roleId;

    public User(int userId, String username, String userPassword, int roleId){
        this.userId = userId;
        this.username = username;
        this.userPassword = userPassword;
        this.roleId = roleId;
    }

    public User(){
    }

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name="user_id", insertable = false, updatable = false, nullable = false)
    private List<Game> games;


    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = null;
        switch(roleId){
            case 1:
                authority = new SimpleGrantedAuthority("USER");
                break;
            case 2:
                authority = new SimpleGrantedAuthority("ADMIN");
                break;
        }

        ArrayList<GrantedAuthority> result = new ArrayList<>();
        result.add(authority);
        return result;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
}
