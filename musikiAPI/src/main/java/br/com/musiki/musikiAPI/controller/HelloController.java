package br.com.musiki.musikiAPI.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import br.com.musiki.musikiAPI.services.spotify.api.SearchAlbum;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Paging;

/*@RestController
public class HelloController {

	@RequestMapping("/")
	public String hello() {
		return "Hello Worldaaa!";
	}
	
	@RequestMapping("/teste")
	public String teste() {
		try {
			SearchAlbum searchAlbum = new SearchAlbum(null);
			Paging<AlbumSimplified> albumSimplifiedPaging = searchAlbum.getAlbum("Abba");
			System.out.println("Total: " + albumSimplifiedPaging.getTotal());
			return "Deu bom";
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return "Deu zica";	
		}
		
	}
}*/
