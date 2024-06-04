package br.com.musiki.musikiAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.services.spotify.api.SearchGenre;

@CrossOrigin(origins = "*")
@RestController
public class GenreController {

	@Autowired
	private SearchGenre searchGenre;
	
	@GetMapping("/api/spotify/genres/")
	public String[] getAllAvaliblesGenres() {
		return searchGenre.getAllAvaliablesGenres();
	}
}
