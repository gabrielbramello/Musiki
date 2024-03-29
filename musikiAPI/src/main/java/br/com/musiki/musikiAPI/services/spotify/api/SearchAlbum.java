package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Album;
import se.michaelthelin.spotify.requests.data.albums.GetAlbumRequest;

@Component
public class SearchAlbum extends ApiSpotify {
	
	public SearchAlbum(ClientCredentialAuth clientCredentialAuth)
			throws ParseException, SpotifyWebApiException, IOException {
		super(clientCredentialAuth);
	}
	
	public Album searchAlbumById(String id) {
		try {
			GetAlbumRequest getAlbumRequest = spotifyApi.getAlbum(id)
				    .build();
			
			Album album = getAlbumRequest.execute();
			
			return album;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
