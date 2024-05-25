package br.com.musiki.musikiAPI.converter;

import br.com.musiki.musikiAPI.dto.AudioFeaturesDTO;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;

public class AudioFeaturesToDTOConverter implements Converter<AudioFeatures, AudioFeaturesDTO>{

	@Override
	public AudioFeaturesDTO convert(AudioFeatures source) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private float convertAcousticness(float acousticness) {
		return acousticness*100;
	}
	
	private float convertDanceability(float danceability) {
		return danceability*100;
	}
	
	private float convertEnergy(float energy) {
		return energy*100;
	}
	
	private float convertInstrumentalness(float instrumentalness) {
		return instrumentalness*100;
	}
	
	private float convertLiveness(float liveness) {
		return liveness*100;
	}
	
	private float convertLoudness(float loudness) {
		return 0;
	}
	
	private int convertMode(int mode) {
		return 0;
	}
	
	private float convertSpeechiness(float speechiness) {
		return 0;
	}
	
	private float convertTempo(float tempo) {
		return 0;
	}
	
	private int convertTimeSignature(int timeSignature) {
		return 0;
	}
	
	private float convertValence(float valence) {
		return 0;
	}

}
