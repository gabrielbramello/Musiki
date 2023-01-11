package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.enums.ModelObjectType;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.special.SearchResult;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
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
	
	public void searchTrack(String track) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(track, ModelObjectType.TRACK.getType()).build();
			SearchResult searchResult = searchItemRequest.execute();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void searchArtist(String artist) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(artist, ModelObjectType.ARTIST.getType()).build();
			SearchResult searchResult = searchItemRequest.execute();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void searchPlaylist(String playlist) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(playlist, ModelObjectType.PLAYLIST.getType()).build();
			SearchResult searchResult = searchItemRequest.execute();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void searchShow(String show) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(show, ModelObjectType.SHOW.getType()).build();
			SearchResult searchResult = searchItemRequest.execute();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	public void searchEpisode(String episode) {
		try {
			SearchItemRequest searchItemRequest = spotifyApi.searchItem(episode, ModelObjectType.EPISODE.getType()).build();
			SearchResult searchResult = searchItemRequest.execute();
		}catch(Exception e) {
			e.printStackTrace();
		}
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