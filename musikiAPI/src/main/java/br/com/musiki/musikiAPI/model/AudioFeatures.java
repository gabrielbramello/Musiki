package br.com.musiki.musikiAPI.model;

public class AudioFeatures {
	private Long id;
	private Double acousticness;
	private Double danceability;
	private Track track;
	private Double energy;
	private Double instrumentalness;
	private Key key;
	private Double liveness;
	private Double loudness;
	private String scaleMode;
	private Double speechiness;
	private Double tempo;
	private String timeSignature;
	private Double happiness;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Double getAcousticness() {
		return acousticness;
	}
	public void setAcousticness(Double acousticness) {
		this.acousticness = acousticness;
	}
	public Double getDanceability() {
		return danceability;
	}
	public void setDanceability(Double danceability) {
		this.danceability = danceability;
	}
	public Track getTrack() {
		return track;
	}
	public void setTrack(Track track) {
		this.track = track;
	}
	public Double getEnergy() {
		return energy;
	}
	public void setEnergy(Double energy) {
		this.energy = energy;
	}
	public Double getInstrumentalness() {
		return instrumentalness;
	}
	public void setInstrumentalness(Double instrumentalness) {
		this.instrumentalness = instrumentalness;
	}
	public Key getKey() {
		return key;
	}
	public void setKey(Key key) {
		this.key = key;
	}
	public Double getLiveness() {
		return liveness;
	}
	public void setLiveness(Double liveness) {
		this.liveness = liveness;
	}
	public Double getLoudness() {
		return loudness;
	}
	public void setLoudness(Double loudness) {
		this.loudness = loudness;
	}
	public String getScaleMode() {
		return scaleMode;
	}
	public void setScaleMode(String scaleMode) {
		this.scaleMode = scaleMode;
	}
	public Double getSpeechiness() {
		return speechiness;
	}
	public void setSpeechiness(Double speechiness) {
		this.speechiness = speechiness;
	}
	public Double getTempo() {
		return tempo;
	}
	public void setTempo(Double tempo) {
		this.tempo = tempo;
	}
	public String getTimeSignature() {
		return timeSignature;
	}
	public void setTimeSignature(String timeSignature) {
		this.timeSignature = timeSignature;
	}
	public Double getHappiness() {
		return happiness;
	}
	public void setHappiness(Double happiness) {
		this.happiness = happiness;
	}
	
	
}
