package br.com.musiki.musikiAPI.converter;

import br.com.musiki.musikiAPI.dto.AudioFeaturesDTO;
import br.com.musiki.musikiAPI.enums.Key;
import br.com.musiki.musikiAPI.enums.TimeSignature;
import se.michaelthelin.spotify.enums.Modality;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;

public class AudioFeaturesToDTOConverter implements Converter<AudioFeatures, AudioFeaturesDTO>{

	@Override
	public AudioFeaturesDTO convert(AudioFeatures audioFeatures) {
		
		AudioFeaturesDTO audioFeaturesDTO = new AudioFeaturesDTO(audioFeatures);
		
		audioFeaturesDTO.setAcousticness(convertAcousticness(audioFeatures.getAcousticness()));
		audioFeaturesDTO.setDanceability(convertDanceability(audioFeatures.getDanceability()));
		audioFeaturesDTO.setEnergy(convertEnergy(audioFeatures.getEnergy()));
		audioFeaturesDTO.setInstrumentalness(convertInstrumentalness(audioFeatures.getInstrumentalness()));
		audioFeaturesDTO.setKey(convertKey(audioFeatures.getKey()));
		audioFeaturesDTO.setLiveness(convertLiveness(audioFeatures.getLiveness()));
		audioFeaturesDTO.setMode(convertMode(audioFeatures.getMode()));
		audioFeaturesDTO.setSpeechiness(convertSpeechiness(audioFeatures.getSpeechiness()));
		audioFeaturesDTO.setTimeSignature(convertTimeSignature(audioFeatures.getTimeSignature()));
		audioFeaturesDTO.setValence(convertValence(audioFeatures.getValence()));
		audioFeaturesDTO.setLoudness(convertLoudness(audioFeatures.getLoudness()));
		
		return audioFeaturesDTO;
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
	
	private String convertMode(Modality mode) {
		return mode.name();
	}
	
	private float convertSpeechiness(float speechiness) {
		return speechiness*100;
	}
	
	
	private String convertTimeSignature(int timeSignature) {
		return TimeSignature.fromValue(timeSignature).getDisplayName();
	}
	
	private float convertValence(float valence) {
		return valence*100;
	}
	private String convertKey(int key) {
		return Key.fromValue(key).getDisplayName();
	}
	
	private float convertLoudness(float loudness) {
		float positiveLoudness =  loudness + 60; 
		float percentLoudness = (100 * positiveLoudness)/60;
		return percentLoudness;
	}

}
