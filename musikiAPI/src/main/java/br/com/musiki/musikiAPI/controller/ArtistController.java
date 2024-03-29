package br.com.musiki.musikiAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.services.spotify.api.SearchArtist;
import se.michaelthelin.spotify.model_objects.specification.Artist;

@CrossOrigin(origins = "*")
@RestController
public class ArtistController {

	@Autowired
	private SearchArtist searchArtist;
	
	@GetMapping("/api/spotify/artist/{id}")
	public Artist searchArtistFromSpotifyApi(@PathVariable String id) {
		
		Artist artist = searchArtist.searchArtistById(id); 
		
		return artist;
	}
}
