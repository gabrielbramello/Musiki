package br.com.musiki.musikiAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wrapper.spotify.model_objects.specification.AlbumSimplified;

import br.com.musiki.musikiAPI.services.spotify.api.SearchItem;

@RestController
public class SearchController {
	
	@Autowired
	private SearchItem searchItem;
	
	@RequestMapping("/api/spotify/album/{album}")
	public AlbumSimplified searchAlbumFromSpotifyApi(@PathVariable String album) {
		return searchItem.searchAlbum(album);
	}
}