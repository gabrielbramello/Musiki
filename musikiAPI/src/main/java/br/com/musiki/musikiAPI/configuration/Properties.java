package br.com.musiki.musikiAPI.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties
public class Properties {
	SpotifyApi spotifyApi;

	public SpotifyApi getSpotifyApi() {
		return spotifyApi;
	}

	public void setSpotifyApi(SpotifyApi spotifyApi) {
		this.spotifyApi = spotifyApi;
	}
	
}
