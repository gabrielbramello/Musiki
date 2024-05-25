package br.com.musiki.musikiAPI.dto;

import se.michaelthelin.spotify.enums.Modality;
import se.michaelthelin.spotify.enums.ModelObjectType;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;

public class AudioFeaturesDTO {
	
	private Float acousticness;
	private String analysisUrl;
	private Float danceability;
	private Integer durationMs;
	private Float energy;
	private String id;
	private Float instrumentalness;
	private Integer key;
	private Float liveness;
	private Float loudness;
	private Modality mode;
	private Float speechiness;
	private Float tempo;
	private Integer timeSignature;
	private String trackHref;
	private ModelObjectType type;
	private String uri;
	private Float valence;
	
	public AudioFeaturesDTO(AudioFeatures audioFeatures) {
		this.acousticness = audioFeatures.getAcousticness();
		this.analysisUrl = audioFeatures.getAnalysisUrl();
		this.danceability = audioFeatures.getDanceability();
		this.durationMs = audioFeatures.getDurationMs();
		this.energy = audioFeatures.getEnergy();
		this.id = audioFeatures.getId();
		this.instrumentalness = audioFeatures.getInstrumentalness();
		this.key = audioFeatures.getKey();
		this.liveness = audioFeatures.getLiveness();
		this.loudness = audioFeatures.getLoudness();
		this.mode = audioFeatures.getMode();
		this.speechiness = audioFeatures.getSpeechiness();
		this.tempo = audioFeatures.getTempo();
		this.timeSignature = audioFeatures.getTimeSignature();
		this.trackHref = audioFeatures.getTrackHref();
		this.type = audioFeatures.getType();
		this.uri = audioFeatures.getUri();
		this.valence = audioFeatures.getValence();
	}
	
	public Float getAcousticness() {
		return acousticness;
	}
	public void setAcousticness(Float acousticness) {
		this.acousticness = acousticness;
	}
	public String getAnalysisUrl() {
		return analysisUrl;
	}
	public void setAnalysisUrl(String analysisUrl) {
		this.analysisUrl = analysisUrl;
	}
	public Float getDanceability() {
		return danceability;
	}
	public void setDanceability(Float danceability) {
		this.danceability = danceability;
	}
	public Integer getDurationMs() {
		return durationMs;
	}
	public void setDurationMs(Integer durationMs) {
		this.durationMs = durationMs;
	}
	public Float getEnergy() {
		return energy;
	}
	public void setEnergy(Float energy) {
		this.energy = energy;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Float getInstrumentalness() {
		return instrumentalness;
	}
	public void setInstrumentalness(Float instrumentalness) {
		this.instrumentalness = instrumentalness;
	}
	public Integer getKey() {
		return key;
	}
	public void setKey(Integer key) {
		this.key = key;
	}
	public Float getLiveness() {
		return liveness;
	}
	public void setLiveness(Float liveness) {
		this.liveness = liveness;
	}
	public Float getLoudness() {
		return loudness;
	}
	public void setLoudness(Float loudness) {
		this.loudness = loudness;
	}
	public Modality getMode() {
		return mode;
	}
	public void setMode(Modality mode) {
		this.mode = mode;
	}
	public Float getSpeechiness() {
		return speechiness;
	}
	public void setSpeechiness(Float speechiness) {
		this.speechiness = speechiness;
	}
	public Float getTempo() {
		return tempo;
	}
	public void setTempo(Float tempo) {
		this.tempo = tempo;
	}
	public Integer getTimeSignature() {
		return timeSignature;
	}
	public void setTimeSignature(Integer timeSignature) {
		this.timeSignature = timeSignature;
	}
	public String getTrackHref() {
		return trackHref;
	}
	public void setTrackHref(String trackHref) {
		this.trackHref = trackHref;
	}
	public ModelObjectType getType() {
		return type;
	}
	public void setType(ModelObjectType type) {
		this.type = type;
	}
	public String getUri() {
		return uri;
	}
	public void setUri(String uri) {
		this.uri = uri;
	}
	public Float getValence() {
		return valence;
	}
	public void setValence(Float valence) {
		this.valence = valence;
	}
	  
	  

}
