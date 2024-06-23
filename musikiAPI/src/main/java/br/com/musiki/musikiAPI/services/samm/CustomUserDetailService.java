package br.com.musiki.musikiAPI.services.samm;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.model.UserSamm;
import br.com.musiki.musikiAPI.security.UserPrincipal;


@Component
public class CustomUserDetailService implements UserDetailsService{

	@Autowired
	private UserSammService userSammService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		UserSamm user = userSammService.findUserByLogin(username).orElseThrow();
		
		UserPrincipal userPrincipal = new UserPrincipal();
		userPrincipal.setUserId(user.getId());
		userPrincipal.setLogin(user.getLogin());
		userPrincipal.setAuthorities(List.of(new SimpleGrantedAuthority(user.getRole())));
		userPrincipal.setPassword(user.getPassword());
		
		return userPrincipal;
	}

}
