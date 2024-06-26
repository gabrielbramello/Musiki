package br.com.musiki.musikiAPI.services.samm;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.model.Artist;
import br.com.musiki.musikiAPI.repository.ArtistRepository;


@Service
public class ArtistService {
	
	@Autowired
	private ArtistRepository artistRepository;
	
	public Artist findArtistId(Long id) {
		
		try {
			Artist artist = artistRepository.findById(id).get();
			return artist;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Optional<Artist> findArtistBySpotifyApiId(String id) {
		try {
			Optional<Artist> artist = artistRepository.findBySpotifyApiId(id);
			return artist;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	public Artist saveArtist(Artist artist) {
		
		try {
			return artistRepository.save(artist);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}	

	
	public Artist updateArtist(UserSammDTO userSammDTO, Long id) {
		try {
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	
	public void deleteArtistById(Long id) {
		
	}
	
	public Artist saveArtistFromSpotify(se.michaelthelin.spotify.model_objects.specification.Artist apiArtist) {
		
		Artist artist = new Artist();
		
		artist.setName(apiArtist.getName());
		artist.setSpotifyApiId(apiArtist.getId());
		artist.setPopularity(apiArtist.getPopularity());
		artist.setSimplifiedGenres(String.join(", ", apiArtist.getGenres())); 
		
		return artistRepository.save(artist);
	}
}
