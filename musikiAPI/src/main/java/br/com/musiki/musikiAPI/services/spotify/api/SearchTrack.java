package br.com.musiki.musikiAPI.services.spotify.api;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Component;

import br.com.musiki.musikiAPI.dto.RecommendationsFilterDTO;
import br.com.musiki.musikiAPI.services.spotify.authorization.ClientCredentialAuth;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.miscellaneous.AudioAnalysis;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;
import se.michaelthelin.spotify.model_objects.specification.Recommendations;
import se.michaelthelin.spotify.model_objects.specification.RecommendationsSeed;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.browse.GetRecommendationsRequest;
import se.michaelthelin.spotify.requests.data.browse.GetRecommendationsRequest.Builder;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioAnalysisForTrackRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioFeaturesForTrackRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetTrackRequest;


@Component
public class SearchTrack extends ApiSpotify {
	
	public SearchTrack(ClientCredentialAuth clientCredentialAuth)
			throws ParseException, SpotifyWebApiException, IOException {
		super(clientCredentialAuth);
	}
	
	public Track searchTrackById(String id) {
		try {
			GetTrackRequest getTrackRequest = spotifyApi.getTrack(id)
				    .build();
			
			Track track = getTrackRequest.execute();
			
			return track;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
	}
	
	public AudioFeatures getTracksAudioFeatures(String id) {
		try {
			
			GetAudioFeaturesForTrackRequest getAudioFeaturesRequest = spotifyApi.getAudioFeaturesForTrack(id)
					.build();

			AudioFeatures audioFeatures = getAudioFeaturesRequest.execute();
			
			return audioFeatures;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
	}
	
	public AudioAnalysis getTracksAudioAnalyses(String id) {
		try {
			
			GetAudioAnalysisForTrackRequest getAudioAnalysisForTrackRequest = spotifyApi.getAudioAnalysisForTrack(id)
					.build();
			
			AudioAnalysis audioAnalysis = getAudioAnalysisForTrackRequest.execute();
			
			return audioAnalysis;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
	}
	
	public Recommendations getTracksRecommendations(RecommendationsFilterDTO recommendationsFilterDTO) {
		
		try {
			Builder getRecommendationsRequestBuilder = spotifyApi.getRecommendations()
			        .limit(recommendationsFilterDTO.getLimit());

			if (recommendationsFilterDTO.getSeedArtists() != null) {
			    getRecommendationsRequestBuilder.seed_artists(recommendationsFilterDTO.getSeedArtists());
			}

			if (recommendationsFilterDTO.getSeedGenres() != null) {
			    getRecommendationsRequestBuilder.seed_genres(recommendationsFilterDTO.getSeedGenres());
			}

			if (recommendationsFilterDTO.getSeedTracks() != null) {
			    getRecommendationsRequestBuilder.seed_tracks(recommendationsFilterDTO.getSeedTracks());
			}

			if (recommendationsFilterDTO.getMinAcousticness() != null && recommendationsFilterDTO.getMinAcousticness() > 0) {
			    getRecommendationsRequestBuilder.min_acousticness(recommendationsFilterDTO.getMinAcousticness());
			}

			if (recommendationsFilterDTO.getMaxAcousticness() != null && recommendationsFilterDTO.getMaxAcousticness() > 0) {
			    getRecommendationsRequestBuilder.max_acousticness(recommendationsFilterDTO.getMaxAcousticness());
			}

			if (recommendationsFilterDTO.getTargetAcousticness() != null && recommendationsFilterDTO.getTargetAcousticness() > 0) {
			    getRecommendationsRequestBuilder.target_acousticness(recommendationsFilterDTO.getTargetAcousticness());
			}

			if (recommendationsFilterDTO.getMinDanceability() != null && recommendationsFilterDTO.getMinDanceability() > 0) {
			    getRecommendationsRequestBuilder.min_danceability(recommendationsFilterDTO.getMinDanceability());
			}

			if (recommendationsFilterDTO.getMaxDanceability() != null && recommendationsFilterDTO.getMaxDanceability() > 0) {
			    getRecommendationsRequestBuilder.max_danceability(recommendationsFilterDTO.getMaxDanceability());
			}

			if (recommendationsFilterDTO.getTargetDanceability() != null && recommendationsFilterDTO.getTargetDanceability() > 0) {
			    getRecommendationsRequestBuilder.target_danceability(recommendationsFilterDTO.getTargetDanceability());
			}

			if (recommendationsFilterDTO.getMinDurationMs() != null && recommendationsFilterDTO.getMinDurationMs() > 0) {
			    getRecommendationsRequestBuilder.min_duration_ms(recommendationsFilterDTO.getMinDurationMs());
			}

			if (recommendationsFilterDTO.getMaxDurationMs() != null && recommendationsFilterDTO.getMaxDurationMs() > 0) {
			    getRecommendationsRequestBuilder.max_duration_ms(recommendationsFilterDTO.getMaxDurationMs());
			}

			if (recommendationsFilterDTO.getTargetDurationMs() != null && recommendationsFilterDTO.getTargetDurationMs() > 0) {
			    getRecommendationsRequestBuilder.target_duration_ms(recommendationsFilterDTO.getTargetDurationMs());
			}

			if (recommendationsFilterDTO.getMinEnergy() != null && recommendationsFilterDTO.getMinEnergy() > 0) {
			    getRecommendationsRequestBuilder.min_energy(recommendationsFilterDTO.getMinEnergy());
			}

			if (recommendationsFilterDTO.getMaxEnergy() != null && recommendationsFilterDTO.getMaxEnergy() > 0) {
			    getRecommendationsRequestBuilder.max_energy(recommendationsFilterDTO.getMaxEnergy());
			}

			if (recommendationsFilterDTO.getTargetEnergy() != null && recommendationsFilterDTO.getTargetEnergy() > 0) {
			    getRecommendationsRequestBuilder.target_energy(recommendationsFilterDTO.getTargetEnergy());
			}

			if (recommendationsFilterDTO.getMinInstrumentalness() != null && recommendationsFilterDTO.getMinInstrumentalness() > 0) {
			    getRecommendationsRequestBuilder.min_instrumentalness(recommendationsFilterDTO.getMinInstrumentalness());
			}

			if (recommendationsFilterDTO.getMaxInstrumentalness() != null && recommendationsFilterDTO.getMaxInstrumentalness() > 0) {
			    getRecommendationsRequestBuilder.max_instrumentalness(recommendationsFilterDTO.getMaxInstrumentalness());
			}

			if (recommendationsFilterDTO.getTargetInstrumentalness() != null && recommendationsFilterDTO.getTargetInstrumentalness() > 0) {
			    getRecommendationsRequestBuilder.target_instrumentalness(recommendationsFilterDTO.getTargetInstrumentalness());
			}

			if (recommendationsFilterDTO.getMinKey() != null && recommendationsFilterDTO.getMinKey() > 0) {
			    getRecommendationsRequestBuilder.min_key(recommendationsFilterDTO.getMinKey());
			}

			if (recommendationsFilterDTO.getMaxKey() != null && recommendationsFilterDTO.getMaxKey() > 0) {
			    getRecommendationsRequestBuilder.max_key(recommendationsFilterDTO.getMaxKey());
			}

			if (recommendationsFilterDTO.getTargetKey() != null && recommendationsFilterDTO.getTargetKey() > 0) {
			    getRecommendationsRequestBuilder.target_key(recommendationsFilterDTO.getTargetKey());
			}

			if (recommendationsFilterDTO.getMinLiveness() != null && recommendationsFilterDTO.getMinLiveness() > 0) {
			    getRecommendationsRequestBuilder.min_liveness(recommendationsFilterDTO.getMinLiveness());
			}

			if (recommendationsFilterDTO.getMaxLiveness() != null && recommendationsFilterDTO.getMaxLiveness() > 0) {
			    getRecommendationsRequestBuilder.max_liveness(recommendationsFilterDTO.getMaxLiveness());
			}

			if (recommendationsFilterDTO.getTargetLiveness() != null && recommendationsFilterDTO.getTargetLiveness() > 0) {
			    getRecommendationsRequestBuilder.target_liveness(recommendationsFilterDTO.getTargetLiveness());
			}

			if (recommendationsFilterDTO.getMinLoudness() != null && recommendationsFilterDTO.getMinLoudness() > 0) {
			    getRecommendationsRequestBuilder.min_loudness(recommendationsFilterDTO.getMinLoudness());
			}

			if (recommendationsFilterDTO.getMaxLoudness() != null && recommendationsFilterDTO.getMaxLoudness() > 0) {
			    getRecommendationsRequestBuilder.max_loudness(recommendationsFilterDTO.getMaxLoudness());
			}

			if (recommendationsFilterDTO.getTargetLoudness() != null && recommendationsFilterDTO.getTargetLoudness() > 0) {
			    getRecommendationsRequestBuilder.target_loudness(recommendationsFilterDTO.getTargetLoudness());
			}

			if (recommendationsFilterDTO.getMinMode() != null && recommendationsFilterDTO.getMinMode() > 0) {
			    getRecommendationsRequestBuilder.min_mode(recommendationsFilterDTO.getMinMode());
			}

			if (recommendationsFilterDTO.getMaxMode() != null && recommendationsFilterDTO.getMaxMode() > 0) {
			    getRecommendationsRequestBuilder.max_mode(recommendationsFilterDTO.getMaxMode());
			}

			if (recommendationsFilterDTO.getTargetMode() != null && recommendationsFilterDTO.getTargetMode() > 0) {
			    getRecommendationsRequestBuilder.target_mode(recommendationsFilterDTO.getTargetMode());
			}

			if (recommendationsFilterDTO.getMinPopularity() != null && recommendationsFilterDTO.getMinPopularity() > 0) {
			    getRecommendationsRequestBuilder.min_popularity(recommendationsFilterDTO.getMinPopularity());
			}

			if (recommendationsFilterDTO.getMaxPopularity() != null && recommendationsFilterDTO.getMaxPopularity() > 0) {
			    getRecommendationsRequestBuilder.max_popularity(recommendationsFilterDTO.getMaxPopularity());
			}

			if (recommendationsFilterDTO.getTargetPopularity() != null && recommendationsFilterDTO.getTargetPopularity() > 0) {
			    getRecommendationsRequestBuilder.target_popularity(recommendationsFilterDTO.getTargetPopularity());
			}

			if (recommendationsFilterDTO.getMinSpeechiness() != null && recommendationsFilterDTO.getMinSpeechiness() > 0) {
			    getRecommendationsRequestBuilder.min_speechiness(recommendationsFilterDTO.getMinSpeechiness());
			}

			if (recommendationsFilterDTO.getMaxSpeechiness() != null && recommendationsFilterDTO.getMaxSpeechiness() > 0) {
			    getRecommendationsRequestBuilder.max_speechiness(recommendationsFilterDTO.getMaxSpeechiness());
			}

			if (recommendationsFilterDTO.getTargetSpeechiness() != null && recommendationsFilterDTO.getTargetSpeechiness() > 0) {
			    getRecommendationsRequestBuilder.target_speechiness(recommendationsFilterDTO.getTargetSpeechiness());
			}

			if (recommendationsFilterDTO.getMinTempo() != null && recommendationsFilterDTO.getMinTempo() > 0) {
			    getRecommendationsRequestBuilder.min_tempo(recommendationsFilterDTO.getMinTempo());
			}

			if (recommendationsFilterDTO.getMaxTempo() != null && recommendationsFilterDTO.getMaxTempo() > 0) {
			    getRecommendationsRequestBuilder.max_tempo(recommendationsFilterDTO.getMaxTempo());
			}

			if (recommendationsFilterDTO.getTargetTempo() != null && recommendationsFilterDTO.getTargetTempo() > 0) {
			    getRecommendationsRequestBuilder.target_tempo(recommendationsFilterDTO.getTargetTempo());
			}

			if (recommendationsFilterDTO.getMinTimeSignature() != null && recommendationsFilterDTO.getMinTimeSignature() > 0) {
			    getRecommendationsRequestBuilder.min_time_signature(recommendationsFilterDTO.getMinTimeSignature());
			}

			if (recommendationsFilterDTO.getMaxTimeSignature() != null && recommendationsFilterDTO.getMaxTimeSignature() > 0) {
			    getRecommendationsRequestBuilder.max_time_signature(recommendationsFilterDTO.getMaxTimeSignature());
			}

			if (recommendationsFilterDTO.getTargetTimeSignature() != null && recommendationsFilterDTO.getTargetTimeSignature() > 0) {
			    getRecommendationsRequestBuilder.target_time_signature(recommendationsFilterDTO.getTargetTimeSignature());
			}

			if (recommendationsFilterDTO.getMinValence() != null && recommendationsFilterDTO.getMinValence() > 0) {
			    getRecommendationsRequestBuilder.min_valence(recommendationsFilterDTO.getMinValence());
			}

			if (recommendationsFilterDTO.getMaxValence() != null && recommendationsFilterDTO.getMaxValence() > 0) {
			    getRecommendationsRequestBuilder.max_valence(recommendationsFilterDTO.getMaxValence());
			}

			if (recommendationsFilterDTO.getTargetValence() != null && recommendationsFilterDTO.getTargetValence() > 0) {
			    getRecommendationsRequestBuilder.target_valence(recommendationsFilterDTO.getTargetValence());
			}


				    
//				    .seed_artists("")
//				    .seed_genres(recommendationsFilterDTO.getSeedGenres())
//				    .seed_tracks(recommendationsFilterDTO.getSeedTracks())
//				    .min_acousticness(recommendationsFilterDTO.getMinAcousticness())
//				    .max_acousticness(recommendationsFilterDTO.getMaxAcousticness())
//				    .target_acousticness(recommendationsFilterDTO.getTargetAcousticness())
//				    .min_danceability(recommendationsFilterDTO.getMinDanceability())
//				    .max_danceability(recommendationsFilterDTO.getMaxDanceability())
//				    .target_danceability(recommendationsFilterDTO.getTargetDanceability())
//				    .min_duration_ms(recommendationsFilterDTO.getMinDurationMs())
//				    .max_duration_ms(recommendationsFilterDTO.getMaxDurationMs())
//				    .target_duration_ms(recommendationsFilterDTO.getTargetDurationMs())
//				    .min_energy(recommendationsFilterDTO.getMinEnergy())
//				    .max_energy(recommendationsFilterDTO.getMaxEnergy())
//				    .target_energy(recommendationsFilterDTO.getTargetEnergy())
//				    .min_instrumentalness(recommendationsFilterDTO.getMinInstrumentalness())
//				    .max_instrumentalness(recommendationsFilterDTO.getMaxInstrumentalness())
//				    .target_instrumentalness(recommendationsFilterDTO.getTargetInstrumentalness())
//				    .min_key(recommendationsFilterDTO.getMinKey())
//				    .max_key(recommendationsFilterDTO.getMaxKey())
//				    .target_key(recommendationsFilterDTO.getTargetKey())
//				    .min_liveness(recommendationsFilterDTO.getMinLiveness())
//				    .max_liveness(recommendationsFilterDTO.getMaxLiveness())
//				    .target_liveness(recommendationsFilterDTO.getTargetLiveness())
//				    .min_loudness(recommendationsFilterDTO.getMinLoudness())
//				    .max_loudness(recommendationsFilterDTO.getMaxLoudness())
//				    .target_loudness(recommendationsFilterDTO.getTargetLoudness())
//				    .min_mode(recommendationsFilterDTO.getMinMode())
//				    .max_mode(recommendationsFilterDTO.getMaxMode())
//				    .target_mode(recommendationsFilterDTO.getTargetMode())
//				    .min_popularity(recommendationsFilterDTO.getMinPopularity())
//				    .max_popularity(recommendationsFilterDTO.getMaxPopularity())
//				    .target_popularity(recommendationsFilterDTO.getTargetPopularity())
//				    .min_speechiness(recommendationsFilterDTO.getMinSpeechiness())
//				    .max_speechiness(recommendationsFilterDTO.getMaxSpeechiness())
//				    .target_speechiness(recommendationsFilterDTO.getTargetSpeechiness())
//				    .min_tempo(recommendationsFilterDTO.getMinTempo())
//				    .max_tempo(recommendationsFilterDTO.getMaxTempo())
//				    .target_tempo(recommendationsFilterDTO.getTargetTempo())
//				    .min_time_signature(recommendationsFilterDTO.getMinTimeSignature())
//				    .max_time_signature(recommendationsFilterDTO.getMaxTimeSignature())
//				    .target_time_signature(recommendationsFilterDTO.getTargetTimeSignature())
//				    .min_valence(recommendationsFilterDTO.getMinValence())
//				    .max_valence(recommendationsFilterDTO.getMaxValence())
//				    .target_valence(recommendationsFilterDTO.getTargetValence())
//				    .build();

				    
			GetRecommendationsRequest getRecommendationsRequest = getRecommendationsRequestBuilder.build();   
			Recommendations recommendations = getRecommendationsRequest.execute();
			
			return recommendations;
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
