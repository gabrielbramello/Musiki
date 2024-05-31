package br.com.musiki.musikiAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.converter.AudioFeaturesToDTOConverter;
import br.com.musiki.musikiAPI.dto.AudioFeaturesDTO;
import br.com.musiki.musikiAPI.dto.RecommendationsFilterDTO;
import br.com.musiki.musikiAPI.services.spotify.api.SearchTrack;
import se.michaelthelin.spotify.model_objects.miscellaneous.AudioAnalysis;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;
import se.michaelthelin.spotify.model_objects.specification.Recommendations;
import se.michaelthelin.spotify.model_objects.specification.Track;

@CrossOrigin(origins = "*")
@RestController
public class TrackController {

	@Autowired
	private SearchTrack searchTrack;
	
	@GetMapping("/api/spotify/track/{id}")
	public Track searchTrackFromSpotifyApi(@PathVariable String id) {
		return searchTrack.searchTrackById(id);
	}
	
	@GetMapping("/api/spotify/track/audiofeatures/{id}")
	public AudioFeatures searchTracksAudioFeaturesFromSpotifyApi(@PathVariable String id) {
		return searchTrack.getTracksAudioFeatures(id);
	}
	
	@GetMapping("/api/samm/track/audiofeatures/{id}")
	public AudioFeaturesDTO getTracksAudioFeatures(@PathVariable String id) {
		
		AudioFeaturesToDTOConverter audioFeaturesConverter = new AudioFeaturesToDTOConverter();
		AudioFeatures audioFeatures = searchTrack.getTracksAudioFeatures(id);
		AudioFeaturesDTO audioFeaturesDTO = audioFeaturesConverter.convert(audioFeatures);
		
		return audioFeaturesDTO;
	}
	
	@GetMapping("/api/spotify/track/audioanalyses/{id}")
	public AudioAnalysis searchTracksAudioAnalysesFromSpotifyApi(@PathVariable String id) {
		return searchTrack.getTracksAudioAnalyses(id);
	}
	
	@PostMapping("/api/spotify/recommendations/")
	public Recommendations searchRecommendationsFromSpotifyApi(@RequestBody RecommendationsFilterDTO recommendationsFilterDTO) {
		return searchTrack.getTracksRecommendations(recommendationsFilterDTO);
	}
	
}
