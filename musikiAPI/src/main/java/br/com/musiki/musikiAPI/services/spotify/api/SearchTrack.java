package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.tracks.GetTrackRequest;


@Component
public class SearchTrack extends ApiSpotify {
	
	public SearchTrack(ClientCredentialAuth clientCredentialAuth)
			throws ParseException, SpotifyWebApiException, IOException {
		super(clientCredentialAuth);
	}
	
	public Track searchTrackById(String id) {
		try {
			GetTrackRequest getTrackRequest = spotifyApi.getTrack(id)
				    .build();
			
			Track track = getTrackRequest.execute();
			
			return track;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
	}
}
