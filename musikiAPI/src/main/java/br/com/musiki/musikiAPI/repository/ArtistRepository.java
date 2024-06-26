package br.com.musiki.musikiAPI.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.musiki.musikiAPI.model.Artist;
import br.com.musiki.musikiAPI.model.UserSamm;

public interface ArtistRepository extends CrudRepository<Artist, Long>{
	
	
	Optional<Artist> findById(Long id);
	Optional<Artist> findBySpotifyApiId(String login);
	void deleteById(Long id);
}
