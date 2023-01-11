package br.com.musiki.musikiAPI.services.spotify.authorization;

import java.io.IOException;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;


import br.com.musiki.musikiAPI.configuration.PropertiesConfig;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

public class ClientCredentialAuth {

	private String clientId;
	private String clientSecret;
	
	@Autowired
	public ClientCredentialAuth(PropertiesConfig properties) {
		
		this.clientId = properties.getClientId();
		this.clientSecret = properties.getClientSecret();
		System.out.println("SpotifyApi ClientId: "+properties.getClientId());
		System.out.println("SpotifyApi ClientSecret: "+properties.getClientSecret());
	}

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
		return clientCredentials_Sync();
	}

}