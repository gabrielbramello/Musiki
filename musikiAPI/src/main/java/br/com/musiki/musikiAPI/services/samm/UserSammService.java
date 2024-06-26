package br.com.musiki.musikiAPI.services.samm;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.exception.usersamm.UserSammNotFoundException;
import br.com.musiki.musikiAPI.model.UserSamm;
import br.com.musiki.musikiAPI.repository.UserSammRepository;
import se.michaelthelin.spotify.model_objects.specification.Album;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Track;

@Service
public class UserSammService {
	
	@Autowired
	private UserSammRepository userSammRepository;
	
	@Autowired
	private ArtistService artistService;
	
	@Autowired
	private AlbumService albumService;
	
	@Autowired
	private TrackService trackService;
	
	public UserSammDTO findUserSammById(Long id) {
		
		try {
			UserSamm userSamm = userSammRepository.findById(id).get();
			UserSammDTO userSammDTO = new UserSammDTO(userSamm);
			return userSammDTO;
			
		} catch (NoSuchElementException e) {
			throw new UserSammNotFoundException("Usuário com id "+id+" não encontrado!");
		}
	}
	
	public Optional<UserSamm> findUserByLogin(String login) {
		try {
			Optional<UserSamm> userSamm = userSammRepository.findByLogin(login);
			return userSamm;
		} catch (NoSuchElementException e) {
			throw new UserSammNotFoundException("Usuário com login "+login+" não encontrado!");
		}
	}
	
	public UserSamm saveUserSamm(UserSammDTO userSammDTO) {
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		UserSamm userSamm = new UserSamm(userSammDTO);
		userSamm.setPassword(passwordEncoder.encode(userSammDTO.getPassword()));
		userSamm.setRole("ROLE_ADMIN");
		//userSamm.setPassword(passwordEncoder.encode(userSammDTO.getPassword()));
		
		return userSammRepository.save(userSamm);		
	}
	
	public UserSamm updateUserSamm(UserSammDTO userSammDTO, Long id) {
		
		UserSamm userSamm = new UserSamm(userSammDTO);
		
		if (id!= null && userSammRepository.existsById(id)) {
			return userSammRepository.save(userSamm);
		}else {
			throw new UserSammNotFoundException("Usuário com id "+id+" não encontrado!");
		}
	}
	
	public void deleteUserSammById(Long id) {
		userSammRepository.deleteById(id);
	}
	
	public UserSamm saveFavoriteArtist(Long userId, Artist artist) {
		
		UserSamm user = userSammRepository.findById(userId).get();
		
		Optional<br.com.musiki.musikiAPI.model.Artist> artistSammOptional = artistService.findArtistBySpotifyApiId(artist.getId());
				
		br.com.musiki.musikiAPI.model.Artist artistSamm = null;
		
		if(!artistSammOptional.isEmpty() && artistSammOptional.isPresent()) {
			artistSamm = artistSammOptional.get();
		}else {
			artistSamm = artistService.saveArtistFromSpotify(artist);
		}
		
		user.getArtists().add(artistSamm);
		
		return userSammRepository.save(user);
	}
	
	public UserSamm saveFavoriteAlbum(Long userId, Album album) {
		
		UserSamm user = userSammRepository.findById(userId).get();
		
		Optional<br.com.musiki.musikiAPI.model.Album> albumSammOptional = albumService.findAlbumBySpotifyApiId(album.getId());
		
		br.com.musiki.musikiAPI.model.Album albumSamm = null;
		
		if(!albumSammOptional.isEmpty() && albumSammOptional.isPresent()) {
			albumSamm = albumSammOptional.get();
		}else {
			albumSamm = albumService.saveAlbumFromSpotify(album);
		}
		
		user.getAlbuns().add(albumSamm);
		
		return userSammRepository.save(user);
	}
	
	public UserSamm saveFavoriteTrack(Long userId, Track track) {
		
		UserSamm user = userSammRepository.findById(userId).get();
		
		Optional<br.com.musiki.musikiAPI.model.Track> trackSammOptional = trackService.findTrackBySpotifyApiId(track.getId());
		
		br.com.musiki.musikiAPI.model.Track trackSamm = null;
		
		if(!trackSammOptional.isEmpty() && trackSammOptional.isPresent()) {
			trackSamm = trackSammOptional.get();
		}else {
			trackSamm = trackService.saveTrackFromSpotify(track);
		}
		
		user.getTracks().add(trackSamm);
		
		return userSammRepository.save(user);
	}
	
}
