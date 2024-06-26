package br.com.musiki.musikiAPI.services.samm;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.musiki.musikiAPI.dto.UserFavoritesAlbunsDTO;
import br.com.musiki.musikiAPI.dto.UserFavoritesArtistsDTO;
import br.com.musiki.musikiAPI.dto.UserFavoritesTracksDTO;
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
		
		Optional<UserSamm> userSammOptional = userSammRepository.findById(id);
		
		if (!userSammOptional.isEmpty() && userSammOptional.isPresent()) {
			
			UserSamm userSamm = userSammOptional.get();
			userSamm.setName(userSammDTO.getName());
			userSamm.setEmail(userSammDTO.getEmail());
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
	
	public UserFavoritesTracksDTO getUserFavoritesTracks(Long userId) {
		
		UserFavoritesTracksDTO userFavoritesTracksDTO = new UserFavoritesTracksDTO();
		
		UserSamm user = userSammRepository.findById(userId).get();
		
		UserSammDTO userSammDTO = new UserSammDTO(user);
		
		userFavoritesTracksDTO.setUserSamm(userSammDTO);
		userFavoritesTracksDTO.getFavoritesTracks().addAll(user.getTracks());
		
		return userFavoritesTracksDTO;
	}
	
	public UserFavoritesAlbunsDTO getUserFavoritesAlbuns(Long userId) {
		
		UserFavoritesAlbunsDTO userFavoritesAlbunsDTO = new UserFavoritesAlbunsDTO();
		
		UserSamm user = userSammRepository.findById(userId).get();
		
		UserSammDTO userSammDTO = new UserSammDTO(user);
		
		userFavoritesAlbunsDTO.setUserSamm(userSammDTO);
		userFavoritesAlbunsDTO.getFavoritesAlbuns().addAll(user.getAlbuns());
		
		return userFavoritesAlbunsDTO;
	}
	
	public UserFavoritesArtistsDTO getUserFavoritesArtists(Long userId) {
		
		UserFavoritesArtistsDTO userFavoritesArtistsDTO = new UserFavoritesArtistsDTO();
		
		UserSamm user = userSammRepository.findById(userId).get();
		
		UserSammDTO userSammDTO = new UserSammDTO(user);
		
		userFavoritesArtistsDTO.setUserSamm(userSammDTO);
		userFavoritesArtistsDTO.getFavoritesArtists().addAll(user.getArtists());
		
		return userFavoritesArtistsDTO;
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
	
	public UserSamm removeTrackFromFavorites(Long userId, Long trackId) {
        UserSamm user = userSammRepository.findById(userId).get();

        Optional<br.com.musiki.musikiAPI.model.Track> trackOptional = user.getTracks().stream()
                .filter(track -> track.getId().equals(trackId))
                .findFirst();

        if (trackOptional.isPresent()) {
            user.getTracks().remove(trackOptional.get());
            return userSammRepository.save(user);
        } else {
            throw new RuntimeException("Track não encontrada nos favoritos do usuário");
        }
    }
	
	public UserSamm removeAlbumFromFavorites(Long userId, Long albumId) {
        UserSamm user = userSammRepository.findById(userId).get();

        Optional<br.com.musiki.musikiAPI.model.Album> albumOptional = user.getAlbuns().stream()
                .filter(album -> album.getId().equals(albumId))
                .findFirst();

        if (albumOptional.isPresent()) {
            user.getAlbuns().remove(albumOptional.get());
            return userSammRepository.save(user);
        } else {
            throw new RuntimeException("Album não encontrada nos favoritos do usuário");
        }
    }
	
	public UserSamm removeArtistFromFavorites(Long userId, Long artistId) {
        UserSamm user = userSammRepository.findById(userId).get();

        Optional<br.com.musiki.musikiAPI.model.Artist> artistOptional = user.getArtists().stream()
                .filter(artist -> artist.getId().equals(artistId))
                .findFirst();

        if (artistOptional.isPresent()) {
            user.getArtists().remove(artistOptional.get());
            return userSammRepository.save(user);
        } else {
            throw new RuntimeException("Album não encontrada nos favoritos do usuário");
        }
    }
	
}
