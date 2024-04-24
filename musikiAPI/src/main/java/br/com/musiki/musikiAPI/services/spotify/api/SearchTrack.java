package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.miscellaneous.AudioAnalysis;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioAnalysisForTrackRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioFeaturesForTrackRequest;
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
	
	public AudioFeatures getTracksAudioFeatures(String id) {
		try {
			
			GetAudioFeaturesForTrackRequest getAudioFeaturesRequest = spotifyApi.getAudioFeaturesForTrack(id)
					.build();

			AudioFeatures audioFeatures = getAudioFeaturesRequest.execute();
			
			return audioFeatures;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
	}
	
	public AudioAnalysis getTracksAudioAnalyses(String id) {
		try {
			
			GetAudioAnalysisForTrackRequest getAudioAnalysisForTrackRequest = spotifyApi.getAudioAnalysisForTrack(id)
					.build();
			
			AudioAnalysis audioAnalysis = getAudioAnalysisForTrackRequest.execute();
			
			return audioAnalysis;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
	}
}
