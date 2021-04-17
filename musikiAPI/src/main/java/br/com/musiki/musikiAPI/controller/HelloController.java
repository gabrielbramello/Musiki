package br.com.musiki.musikiAPI.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wrapper.spotify.model_objects.specification.AlbumSimplified;
import com.wrapper.spotify.model_objects.specification.Paging;

import br.com.musiki.musikiAPI.services.spotify.api.SearchAlbum;

@RestController
public class HelloController {

	@RequestMapping("/")
	public String hello() {
		return "Hello Worldaaa!";
	}
	
	@RequestMapping("/teste")
	public String teste() {
		try {
			SearchAlbum searchAlbum = new SearchAlbum();
			Paging<AlbumSimplified> albumSimplifiedPaging = searchAlbum.getAlbum("Abba");
			System.out.println("Total: " + albumSimplifiedPaging.getTotal());
			return "Deu bom";
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return "Deu zica";	
		}
		
	}
}
