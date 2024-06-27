package br.com.musiki.musikiAPI.services.spotify.authorization;

import java.io.IOException;
import java.time.Instant;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

@Component
public class ClientCredentialAuth {

    private final String clientId;
    private final String clientSecret;
    private SpotifyApi spotifyApi;
    private Instant tokenExpirationTime;

    @Autowired
    public ClientCredentialAuth(@Value("${SPOTIFY_CLIENT_ID}") String clientId,
                                @Value("${SPOTIFY_CLIENT_SECRET}") String clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.spotifyApi = createSpotifyApi();
    }

    public SpotifyApi getSpotifyApiWithToken() throws IOException, SpotifyWebApiException, ParseException {
        if (isTokenExpired()) {
            renewAccessToken();
        }
        return spotifyApi;
    }

    private SpotifyApi createSpotifyApi() {
        return new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .build();
    }

    private ClientCredentials fetchClientCredentials() throws IOException, SpotifyWebApiException, ParseException {
        ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
        return clientCredentialsRequest.execute();
    }

    private boolean isTokenExpired() {
        return tokenExpirationTime == null || Instant.now().isAfter(tokenExpirationTime);
    }

    private void renewAccessToken() throws ParseException {
        try {
            ClientCredentials clientCredentials = fetchClientCredentials();
            spotifyApi.setAccessToken(clientCredentials.getAccessToken());

            // Definir o tempo de expiração do token
            int expiresIn = clientCredentials.getExpiresIn();
            tokenExpirationTime = Instant.now().plusSeconds(expiresIn);

            System.out.println("Token de acesso renovado....");
        } catch (IOException | SpotifyWebApiException e) {
            // Lidar com exceções
            System.err.println("Erro ao renovar o token de acesso " + e.getMessage());
        }
    }

    @Scheduled(fixedDelay = 3600000) // Executa a cada 1 hora
    public void renewAccessTokenScheduled() throws ParseException {
        if (isTokenExpired()) {
            renewAccessToken();
            System.out.println("Token renovado...");
        }
    }
}
