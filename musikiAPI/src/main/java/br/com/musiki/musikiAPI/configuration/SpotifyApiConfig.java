package br.com.musiki.musikiAPI.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;

@Configuration
public class SpotifyApiConfig {
	
	@Bean
	public ClientCredentialAuth clientCredentialAuth(PropertiesConfig properties) {
		 ClientCredentialAuth clientCredentialAuth = new ClientCredentialAuth(properties);
		 return clientCredentialAuth;
	}
}
