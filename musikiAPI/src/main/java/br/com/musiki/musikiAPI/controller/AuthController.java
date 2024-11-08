package br.com.musiki.musikiAPI.controller;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.dto.LoginRequestDTO;
import br.com.musiki.musikiAPI.dto.LoginResponseDTO;
import br.com.musiki.musikiAPI.security.JwtIssuer;
import br.com.musiki.musikiAPI.security.UserPrincipal;
import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/")
public class AuthController {
	
	@Autowired
	private JwtIssuer jwtIssuer;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
    private ClientCredentialAuth clientCredentialAuth;
	
	@PostMapping("/login")
	public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword())
		);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
		
		List<String> roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
		
		String accessToken = jwtIssuer.issue(principal.getUserId(), principal.getLogin(), roles);
		
		LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
		loginResponseDTO.setAccessToken(accessToken);
		
		return loginResponseDTO;

	}
	
	@PostMapping("/renew-token")
    public ResponseEntity<String> renewToken() throws IOException, SpotifyWebApiException, org.apache.hc.core5.http.ParseException {
        try {
            clientCredentialAuth.renewAccessToken();
            return ResponseEntity.ok("Token renovado com sucesso.");
        } catch (ParseException e) {
            return ResponseEntity.status(500).body("Erro ao renovar o token: " + e.getMessage());
        }
    }

}
