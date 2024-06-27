package br.com.musiki.musikiAPI.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PropertiesConfig {
	@Value("${SPOTIFY_CLIENT_ID}")
	private String clientId;
	@Value("${SPOTIFY_CLIENT_SECRET}")
	private String clientSecret;
	public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}
	public String getClientSecret() {
		return clientSecret;
	}
	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}
}
