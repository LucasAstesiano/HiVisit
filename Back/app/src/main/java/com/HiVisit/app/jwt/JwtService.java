package com.HiVisit.app.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private final Logger logger = LoggerFactory.getLogger(JwtService.class);
    private static final String SECRET_KEY="f3b94d1c8a9e4b5b7d3f6e2a1c8d7e4f5a6b7c8d9e0a1b2c3d4e5f6a7b8c9d0";
    public String getToken(UserDetails user){
        return getToken(new HashMap<>(), user);
    }

    private  String getToken(Map<String,Object> extraClaims, UserDetails user) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+10000*60*4))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getKey(){
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsernameFromToken(String token) {
        return getClaim(token,Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username=getUsernameFromToken(token);
        if (username.equals(userDetails.getUsername()) && !isTokenExpired(token)) {
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        }else
            throw new RuntimeException(username);
    }
    private Claims getAllClaims(String token){
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }catch (Exception e){
            logger.error("Error parsing token", e);
            return null;
        }
    }

    public <T> T getClaim(String token, Function<Claims,T> claimmsResolver){
        final Claims claims=getAllClaims(token);
        return claimmsResolver.apply(claims);
    }
    private Date getExpiration(String token){
        return  getClaim(token,Claims::getExpiration);
    }
    private boolean isTokenExpired(String token){
        return getExpiration(token).before(new Date());
    }
}
