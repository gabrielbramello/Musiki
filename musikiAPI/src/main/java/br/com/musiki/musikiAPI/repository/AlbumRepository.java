package br.com.musiki.musikiAPI.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.musiki.musikiAPI.model.Album;

public interface AlbumRepository extends CrudRepository<Album, Long>{
	Optional<Album> findById(Long id);
	Optional<Album> findBySpotifyApiId(String login);;
	void deleteById(Long id);
}
