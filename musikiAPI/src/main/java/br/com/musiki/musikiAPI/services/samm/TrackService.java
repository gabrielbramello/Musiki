package br.com.musiki.musikiAPI.services.samm;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.model.Album;
import br.com.musiki.musikiAPI.model.Track;
import br.com.musiki.musikiAPI.repository.TrackRepository;

@Service
public class TrackService {
	
	@Autowired
	private TrackRepository trackRepository;
	
	public Track findTrackId(Long id) {
		
		try {
			Track track = trackRepository.findById(id).get();
			return track;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Optional<Track> findTrackBySpotifyApiId(String id) {
		try {
			Optional<Track> track = trackRepository.findBySpotifyApiId(id);
			return track;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	public Track saveTrack(Track track) {
		
		try {
			return trackRepository.save(track);
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
	
	public Track saveTrackFromSpotify(se.michaelthelin.spotify.model_objects.specification.Track apiTrack) {
		
		Track track = new Track();
		
		track.setName(apiTrack.getName());
		track.setSpotifyApiId(apiTrack.getId());
		track.setSpotifytrackHref(apiTrack.getHref());
		track.setPopularity(apiTrack.getPopularity());
		
		return trackRepository.save(track);
	}

}
