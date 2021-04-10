package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.AlbumSimplified;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.requests.data.search.simplified.SearchAlbumsRequest;

import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;

public class SearchAlbum {
	
	public Paging<AlbumSimplified> getAlbum(String q) throws ParseException, SpotifyWebApiException, IOException {
		ClientCredentialAuth clientCredentialAuth = new ClientCredentialAuth();
		SpotifyApi spotifyApi = clientCredentialAuth.getSpotifyApiWithToken();
		SearchAlbumsRequest searchAlbumsRequest = spotifyApi.searchAlbums(q).build();
		Paging<AlbumSimplified> albumSimplifiedPaging = searchAlbumsRequest.execute();
		System.out.println("Total: " + albumSimplifiedPaging.getTotal());
		System.out.println("Total: " + albumSimplifiedPaging.getItems()[0]);
		
		return albumSimplifiedPaging;
	}
}
