package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.requests.data.artists.GetArtistRequest;

@Component
public class SearchArtist extends ApiSpotify {
	
	public SearchArtist(ClientCredentialAuth clientCredentialAuth)
			throws ParseException, SpotifyWebApiException, IOException {
		super(clientCredentialAuth);
	}

	public Artist searchArtistById(String id) {
		try {
			GetArtistRequest getArtistRequest = spotifyApi.getArtist(id)
				    .build();
			
			Artist artist = getArtistRequest.execute();
			
			return artist;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
		
	}
}
