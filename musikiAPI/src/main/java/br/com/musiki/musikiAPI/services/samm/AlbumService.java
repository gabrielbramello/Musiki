package br.com.musiki.musikiAPI.services.samm;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.model.Album;
import br.com.musiki.musikiAPI.repository.AlbumRepository;

@Service
public class AlbumService {

	@Autowired
	private AlbumRepository albumRepository;
	
	public Album findAlbumId(Long id) {
		
		try {
			Album album = albumRepository.findById(id).get();
			return album;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Optional<Album> findAlbumBySpotifyApiId(String id) {
		try {
			Optional<Album> album = albumRepository.findBySpotifyApiId(id);
			return album;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	public Album saveAlbum(Album album) {
		
		try {
			return albumRepository.save(album);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}	

	
	public Album updateAlbum(UserSammDTO userSammDTO, Long id) {
		try {
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	
	public void deleteAlbumById(Long id) {
		
	}
	
	public Album saveAlbumFromSpotify(se.michaelthelin.spotify.model_objects.specification.Album apiAlbum) {
		
		Album album = new Album();
		
		album.setName(apiAlbum.getName());
		//album.setReleaseDate(apiAlbum.getReleaseDate());
		album.setSpotifyApiId(apiAlbum.getId());
		album.setTotalTracks(apiAlbum.getTracks().getTotal());
		album.setPopularity(apiAlbum.getPopularity());
		album.setUriSpotify(apiAlbum.getUri());
		
		return albumRepository.save(album);
	}
}
