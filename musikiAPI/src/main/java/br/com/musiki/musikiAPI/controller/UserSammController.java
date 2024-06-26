package br.com.musiki.musikiAPI.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.dto.UserFavoriteRequest;
import br.com.musiki.musikiAPI.dto.UserFavoritesAlbunsDTO;
import br.com.musiki.musikiAPI.dto.UserFavoritesArtistsDTO;
import br.com.musiki.musikiAPI.dto.UserFavoritesTracksDTO;
import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.exception.usersamm.UserSammNotFoundException;
import br.com.musiki.musikiAPI.model.UserSamm;
import br.com.musiki.musikiAPI.services.samm.UserSammService;
import br.com.musiki.musikiAPI.services.spotify.api.SearchAlbum;
import br.com.musiki.musikiAPI.services.spotify.api.SearchArtist;
import br.com.musiki.musikiAPI.services.spotify.api.SearchTrack;
import se.michaelthelin.spotify.model_objects.specification.Album;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Track;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/samm/user/")
public class UserSammController {
	
	@Autowired
	private UserSammService userSammService;
	
	@Autowired
	private SearchArtist searchArtist;
	
	@Autowired
	private SearchAlbum searchAlbum;
	
	@Autowired
	private SearchTrack searchTrack;
	
	@GetMapping("/{id}")
	public ResponseEntity<UserSammDTO> findById(@PathVariable("id") Long id) {
		try {
			UserSammDTO user = userSammService.findUserSammById(id);
			return ResponseEntity.status(200).body(user);
		}
		catch (UserSammNotFoundException e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@PostMapping("/create")
	public ResponseEntity<String> createUserSamm(@RequestBody UserSammDTO userSamm) {
		try {
			
			try {
				Optional<UserSamm> usuarioExistente = userSammService.findUserByLogin(userSamm.getLogin());
				
				if(!usuarioExistente.isEmpty() && usuarioExistente.isPresent()) {
					return ResponseEntity.status(500).body("Erro ao criar o usuário: usuário já existe.");
				}
				
			} catch (UserSammNotFoundException e) {
				
			}
			
			UserSamm user = userSammService.saveUserSamm(userSamm);
			return ResponseEntity.status(201).body("Usuário criado com sucesso.");
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Erro ao criar o usuário: " + e.getMessage());
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateUserSamm(@RequestBody UserSammDTO userSamm, @PathVariable Long id) {
		try {
			UserSamm user = userSammService.updateUserSamm(userSamm, id);
			
			return ResponseEntity.status(200).body("Usuário atualizado com sucesso.");
		} 
		catch (UserSammNotFoundException e) {
			e.printStackTrace();
			return ResponseEntity.status(404).body("Erro ao criar o usuário: " + e.getMessage());
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Erro ao criar o usuário: " + e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUserSamm(@PathVariable Long id) {
		try {
			userSammService.deleteUserSammById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@GetMapping("/favorites/artists/{id}")
	public ResponseEntity<UserFavoritesArtistsDTO> getFavoriteArtist(@PathVariable("id") Long id) {
		
		UserFavoritesArtistsDTO userFavoritesArtists = userSammService.getUserFavoritesArtists(id);
		return ResponseEntity.status(200).body(userFavoritesArtists);
	}
	
	@PostMapping("/favorite/artist")
	public ResponseEntity<UserSamm> addUserFavoriteArtist(@RequestBody UserFavoriteRequest userFavoriteArtistRequest) {
		
		Artist artist = searchArtist.searchArtistById(userFavoriteArtistRequest.getElementId()); 
		
		UserSamm userSamm = userSammService.saveFavoriteArtist(userFavoriteArtistRequest.getUserId(), artist);
		return ResponseEntity.status(200).body(userSamm);
	}
	
	@DeleteMapping("/favorite/artist/{userId}/{artistId}")
    public UserSamm removeArtistFromFavorites(@PathVariable Long userId, @PathVariable Long artistId) {
        return userSammService.removeArtistFromFavorites(userId, artistId);
    }
	
	@GetMapping("/favorites/albuns/{id}")
	public ResponseEntity<UserFavoritesAlbunsDTO> getFavoriteAlbum(@PathVariable("id") Long id) {
		
		UserFavoritesAlbunsDTO userFavoritesAlbuns = userSammService.getUserFavoritesAlbuns(id);
		return ResponseEntity.status(200).body(userFavoritesAlbuns);
	}
	
	@PostMapping("/favorite/album")
	public ResponseEntity<UserSamm> addUserFavoriteAlbum(@RequestBody UserFavoriteRequest userFavoriteAlbumRequest) {
		Album album = searchAlbum.searchAlbumById(userFavoriteAlbumRequest.getElementId());
		
		UserSamm userSamm = userSammService.saveFavoriteAlbum(userFavoriteAlbumRequest.getUserId(), album);
		return ResponseEntity.status(200).body(userSamm);
	}
	
	@DeleteMapping("/favorite/album/{userId}/{albumId}")
    public UserSamm removeAlbumFromFavorites(@PathVariable Long userId, @PathVariable Long albumId) {
        return userSammService.removeAlbumFromFavorites(userId, albumId);
    }
	
	@GetMapping("/favorites/tracks/{id}")
	public ResponseEntity<UserFavoritesTracksDTO> getFavoriteTrack(@PathVariable("id") Long id) {
		
		UserFavoritesTracksDTO userFavoritesTracks = userSammService.getUserFavoritesTracks(id);
		return ResponseEntity.status(200).body(userFavoritesTracks);
	}
	
	@PostMapping("/favorite/track")
	public ResponseEntity<UserSamm> addUserFavoriteTrack(@RequestBody UserFavoriteRequest userFavoriteAlbumRequest) {
		
		Track track = searchTrack.searchTrackById(userFavoriteAlbumRequest.getElementId());
		
		UserSamm userSamm = userSammService.saveFavoriteTrack(userFavoriteAlbumRequest.getUserId(), track);
		return ResponseEntity.status(200).body(userSamm);
	}
	

	
	@DeleteMapping("/favorite/track/{userId}/{trackId}")
    public UserSamm removeTrackFromFavorites(@PathVariable Long userId, @PathVariable Long trackId) {
        return userSammService.removeTrackFromFavorites(userId, trackId);
    }
}
