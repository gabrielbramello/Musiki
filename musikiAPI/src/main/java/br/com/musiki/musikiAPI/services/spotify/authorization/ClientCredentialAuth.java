package br.com.musiki.musikiAPI.services.spotify.authorization;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import br.com.musiki.musikiAPI.configuration.Properties;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

public class ClientCredentialAuth {

	@Autowired
	public Properties properties;
	
	private static final String clientId = "a8c008ec33274427b7f9fb61d854e967";
	private static final String clientSecret = "89d1ea0114d64cb6ab249f6630f1ac04";
	
	//private String clientId = properties.getSpotifyApi().getClientId();
	//qprivate String clientSecret = properties.getSpotifyApi().getClientSecret();

	private SpotifyApi clientCredentials_Sync() throws IOException, SpotifyWebApiException, ParseException {
		
		
		SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId(clientId)
				.setClientSecret(clientSecret).build();
		
		ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
		
		ClientCredentials clientCredentials = clientCredentialsRequest.execute();

		// Set access token for further "spotifyApi" object usage
		spotifyApi.setAccessToken(clientCredentials.getAccessToken());
		
		System.out.println("Expires in: " + clientCredentials.getExpiresIn());
		
		return spotifyApi;
		
	}

	private void clientCredentials_Async() {
		try {
			SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId(clientId)
					.setClientSecret(clientSecret).build();
			
			ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
			final CompletableFuture<ClientCredentials> clientCredentialsFuture = clientCredentialsRequest
					.executeAsync();

			// Thread free to do other tasks...

			// Example Only. Never block in production code.
			final ClientCredentials clientCredentials = clientCredentialsFuture.join();

			// Set access token for further "spotifyApi" object usage
			spotifyApi.setAccessToken(clientCredentials.getAccessToken());

			System.out.println("Expires in: " + clientCredentials.getExpiresIn());
		} catch (CompletionException e) {
			System.out.println("Error: " + e.getCause().getMessage());
		} catch (CancellationException e) {
			System.out.println("Async operation cancelled.");
		}
	}
	
	public SpotifyApi getSpotifyApiWithToken() throws IOException, SpotifyWebApiException, ParseException{
	//	System.out.println(properties.getSpotifyApi().getClientId());
	//	System.out.println(properties.getSpotifyApi().getClientSecret());
		
		return clientCredentials_Sync();
	}

}