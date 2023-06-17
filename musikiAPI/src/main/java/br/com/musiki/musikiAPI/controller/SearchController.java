package br.com.musiki.musikiAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.dto.SearchDTO;
import br.com.musiki.musikiAPI.services.spotify.api.SearchItem;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Track;

@CrossOrigin(origins = "*")
@RestController
public class SearchController {
	
	@Autowired
	private SearchItem searchItem;
	
	@GetMapping("/api/spotify/search/{query}")
	public List<SearchDTO> searchFromSpotifyApi(@PathVariable String query) {
		return searchItem.search(query);
	}
	
	@GetMapping("/api/spotify/search/album/{album}")
	public List<AlbumSimplified> searchAlbumFromSpotifyApi(@PathVariable String album) {
		return searchItem.searchAlbum(album);
	}
	
	@GetMapping("/api/spotify/search/artist/{artist}")
	public List<Artist> searchArtistFromSpotifyApi(@PathVariable String artist) {
		return searchItem.searchArtist(artist);
	}
	
	@GetMapping("/api/spotify/search/track/{track}")
	public List<Track> searchTrackFromSpotifyApi(@PathVariable String track) {
		return searchItem.searchTrack(track);
	}
}
