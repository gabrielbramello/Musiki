package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;


import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Paging;

public class SearchAlbum {
	
	public Paging<AlbumSimplified> getAlbum(String q) throws ParseException, SpotifyWebApiException, IOException {
//		ClientCredentialAuth clientCredentialAuth = new ClientCredentialAuth();
//		SpotifyApi spotifyApi = clientCredentialAuth.getSpotifyApiWithToken();
//		SearchAlbumsRequest searchAlbumsRequest = spotifyApi.searchAlbums(q).build();
//		Paging<AlbumSimplified> albumSimplifiedPaging = searchAlbumsRequest.execute();
//		System.out.println("Total: " + albumSimplifiedPaging.getTotal());
//		System.out.println("Total: " + albumSimplifiedPaging.getItems()[0]);
		
		return null;
	}
}
