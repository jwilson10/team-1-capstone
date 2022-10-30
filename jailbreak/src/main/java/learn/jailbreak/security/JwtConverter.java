package learn.jailbreak.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import learn.jailbreak.models.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtConverter {

    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final String ISSUER = "jailbreak";
    private final int EXPIRATION_MINUTES = 45;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;
    public String getTokenFromUser(User user) {
        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getUsername())
                .claim("user_id", user.getUserId())
                .claim("role_id", user.getRoleId())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public User getUserFromToken(String token){
        if(token == null || !token.startsWith("Bearer ")) {
            return null;
        }

        try{
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7));

            String username = jws.getBody().getSubject();
            int appUserId = (int)jws.getBody().get("user_id");
            int roleId = (int) jws.getBody().get("role_id");

            return new User(appUserId, username, null, roleId);
        } catch (JwtException e){
            System.out.println(e);
        }
        return null;
    }
}
