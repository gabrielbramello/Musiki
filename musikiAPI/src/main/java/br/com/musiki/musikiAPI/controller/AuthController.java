package br.com.musiki.musikiAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/")
public class AuthController {
	
	@Autowired
	private JwtIssuer jwtIssuer;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword())
		);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
		
		List<String> roles = principal.getAuthorities().stream()
								.map(GrantedAuthority::getAuthority)
								.toList();
		
		String accessToken = jwtIssuer.issue(principal.getUserId(), principal.getLogin(), roles);
		
		LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
		loginResponseDTO.setAccessToken(accessToken);
		
		return loginResponseDTO;
	}

}
