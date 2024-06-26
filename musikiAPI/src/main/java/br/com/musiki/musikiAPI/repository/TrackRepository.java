package br.com.musiki.musikiAPI.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.musiki.musikiAPI.model.Track;

public interface TrackRepository extends CrudRepository<Track, Long>{
	Optional<Track> findById(Long id);
	Optional<Track> findBySpotifyApiId(String login);
	void deleteById(Long id);
}
