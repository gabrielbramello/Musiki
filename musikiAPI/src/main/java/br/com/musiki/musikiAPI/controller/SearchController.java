package br.com.musiki.musikiAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.services.spotify.api.SearchItem;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Artist;

@RestController
public class SearchController {
	
	@Autowired
	private SearchItem searchItem;
	
	@RequestMapping("/api/spotify/search/album/{album}")
	public AlbumSimplified searchAlbumFromSpotifyApi(@PathVariable String album) {
		return searchItem.searchAlbum(album);
	}
	
	@RequestMapping("/api/spotify/search/artist/{artist}")
	public List<Artist> searchArtistFromSpotifyApi(@PathVariable String artist) {
		return searchItem.searchArtist(artist);
	}
}
