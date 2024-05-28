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
	private String key;
	private Float liveness;
	private Float loudness;
	private String mode;
	private Float speechiness;
	private Float tempo;
	private String timeSignature;
	private String trackHref;
	private ModelObjectType type;
	private String uri;
	private Float valence;
	
	public AudioFeaturesDTO() {}
	
	/**
	 * Construtor para setar apenas os valores imutáveis da origem 
	 * @param audioFeatures
	 */
	public AudioFeaturesDTO(AudioFeatures audioFeatures) {

		this.analysisUrl = audioFeatures.getAnalysisUrl();
		this.durationMs = audioFeatures.getDurationMs();
		this.id = audioFeatures.getId();
		this.trackHref = audioFeatures.getTrackHref();
		this.type = audioFeatures.getType();
		this.uri = audioFeatures.getUri();
		this.loudness = audioFeatures.getLoudness();
		this.tempo = audioFeatures.getTempo();
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
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
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
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
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
	public String getTimeSignature() {
		return timeSignature;
	}
	public void setTimeSignature(String timeSignature) {
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
