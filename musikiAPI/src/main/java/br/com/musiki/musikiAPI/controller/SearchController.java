package br.com.musiki.musikiAPI.controller;

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
	
	@RequestMapping("/api/spotify/album/{album}")
	public AlbumSimplified searchAlbumFromSpotifyApi(@PathVariable String album) {
		return searchItem.searchAlbum(album);
	}
	
	@RequestMapping("/api/spotify/artist/{artist}")
	public Artist searchArtistFromSpotifyApi(@PathVariable String artist) {
		return searchItem.searchArtist(artist);
	}
}
