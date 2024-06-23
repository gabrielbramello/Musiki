package br.com.musiki.musikiAPI.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtToPrincipalConverter {

	public UserPrincipal convert(DecodedJWT jwt) {
		
		UserPrincipal userPrincipal = new UserPrincipal();
		userPrincipal.setUserId(Long.valueOf(jwt.getSubject()));
		userPrincipal.setLogin(jwt.getClaim("l").asString());
		userPrincipal.setAuthorities(extractAuthoritiesFromClaim(jwt));
		
		return userPrincipal;
	}
	
	private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt){
		Claim claim = jwt.getClaim("a");
		
		if(claim.isNull() || claim.isMissing()) {
			return List.of();
		}
		return claim.asList(SimpleGrantedAuthority.class);
	}
}
