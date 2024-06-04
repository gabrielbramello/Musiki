package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.requests.data.browse.miscellaneous.GetAvailableGenreSeedsRequest;

@Component
public class SearchGenre extends ApiSpotify{

	public SearchGenre(ClientCredentialAuth clientCredentialAuth)
			throws ParseException, SpotifyWebApiException, IOException {
		super(clientCredentialAuth);
	}
	
	public String[] getAllAvaliablesGenres() {
		try {
			GetAvailableGenreSeedsRequest getAvailableGenreSeedsRequest = spotifyApi.getAvailableGenreSeeds()
				    .build();
			
			String[] genres = getAvailableGenreSeedsRequest.execute();
			
			return genres;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
