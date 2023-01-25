package br.com.musiki.musikiAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.services.spotify.api.SearchAlbum;
import se.michaelthelin.spotify.model_objects.specification.Album;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/spotify/album/")
public class AlbumController {

	@Autowired
	private SearchAlbum searchAlbum;
	
	@GetMapping("/{id}")
	public Album searchAlbumFromSpotifyApi(@PathVariable String id) {
		return searchAlbum.searchAlbumById(id);
	}
}
