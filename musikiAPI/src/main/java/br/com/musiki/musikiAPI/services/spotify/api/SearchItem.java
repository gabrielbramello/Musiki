package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

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
	 
	public AlbumSimplified searchAlbum(String album) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(album, ModelObjectType.ALBUM.getType())
													.limit(10)
													.build();
			
			SearchResult searchResult = searchItemRequest.execute();
			
			AlbumSimplified albumSimplifed = searchResult.getAlbums().getItems()[0]; 
			
			return albumSimplifed;
			
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	public List<Track> searchTrack(String track) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(track, ModelObjectType.TRACK.getType())
					.limit(10)
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
					.limit(10)
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
	
//	public static void searchItem_Sync() {
//		try {
//			final SearchResult searchResult = searchItemRequest.execute();
//
//			System.out.println("Total tracks: " + searchResult.getTracks().getTotal());
//		} catch (IOException | SpotifyWebApiException | ParseException e) {
//			System.out.println("Error: " + e.getMessage());
//		}
//	}
//
//	public static void searchItem_Async() {
//		try {
//			final CompletableFuture<SearchResult> searchResultFuture = searchItemRequest.executeAsync();
//
//			// Thread free to do other tasks...
//
//			// Example Only. Never block in production code.
//			final SearchResult searchResult = searchResultFuture.join();
//
//			System.out.println("Total tracks: " + searchResult.getTracks().getTotal());
//		} catch (CompletionException e) {
//			System.out.println("Error: " + e.getCause().getMessage());
//		} catch (CancellationException e) {
//			System.out.println("Async operation cancelled.");
//		}
//	}
//
//	public static void main(String[] args) {
//		searchItem_Sync();
//		searchItem_Async();
//	}
}