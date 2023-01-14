package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.dto.SearchDTO;
import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.enums.ModelObjectType;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.special.SearchResult;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.search.SearchItemRequest;

@Component
public class SearchItem extends ApiSpotify{
	
	public SearchItem(ClientCredentialAuth clientCredentialAuth)
			throws ParseException, SpotifyWebApiException, IOException {
		super(clientCredentialAuth);
	}
	 
	public List<SearchDTO> search(String query) {
		
		List<SearchDTO> searchDTOList = new ArrayList<SearchDTO>();
		try {
			
			List<AlbumSimplified> albumList = searchAlbum(query);
			
			for (AlbumSimplified albumSimplified : albumList) {
				SearchDTO searchDTO = new SearchDTO(albumSimplified);
				searchDTOList.add(searchDTO);
			}
			
			List<Artist> artistList = searchArtist(query);
			
			for (Artist artist : artistList) {
				SearchDTO searchDTO = new SearchDTO(artist);
				searchDTOList.add(searchDTO);
			}
			
			List<Track> trackList = searchTrack(query); 
			
			for (Track track : trackList) {
				SearchDTO searchDTO = new SearchDTO(track);
				searchDTOList.add(searchDTO);
			}
			
			
			return searchDTOList;
			
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	public List<AlbumSimplified> searchAlbum(String album) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(album, ModelObjectType.ALBUM.getType())
													.limit(3)
													.build();
			
			SearchResult searchResult = searchItemRequest.execute();
			
			AlbumSimplified[] albumsSimplifed = searchResult.getAlbums().getItems(); 
			
			List<AlbumSimplified> albumList = Arrays.asList(albumsSimplifed);
			
			return albumList;
			
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	public List<Track> searchTrack(String track) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(track, ModelObjectType.TRACK.getType())
					.limit(3)
					.build();
			SearchResult searchResult = searchItemRequest.execute();
			
			Track [] tracks = searchResult.getTracks().getItems();
			
			List<Track> trackList = Arrays.asList(tracks);
			
			return trackList;
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Artist> searchArtist(String artist) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(artist, ModelObjectType.ARTIST.getType())
					.limit(3)
					.build();
			SearchResult searchResult = searchItemRequest.execute();
			
			Artist[] artistSimplified = searchResult.getArtists().getItems();
			
			List<Artist> artistsList = Arrays.asList(artistSimplified);
			return artistsList;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
}