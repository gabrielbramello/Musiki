package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;

@Component
public class ApiSpotify {
	
	protected SpotifyApi spotifyApi;
	
	@Autowired
	public ApiSpotify(ClientCredentialAuth clientCredentialAuth) throws ParseException, SpotifyWebApiException, IOException {
		this.spotifyApi = clientCredentialAuth.getSpotifyApiWithToken();
	}
	
}
