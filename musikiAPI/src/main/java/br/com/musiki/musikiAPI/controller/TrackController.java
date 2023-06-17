package br.com.musiki.musikiAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.services.spotify.api.SearchTrack;
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
}
