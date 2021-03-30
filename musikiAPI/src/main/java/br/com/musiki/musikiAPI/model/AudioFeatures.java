package br.com.musiki.musikiAPI.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class AudioFeatures {
	@Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	private Double acousticness;
	private Double danceability;
	@OneToOne(mappedBy = "audioFeatures")
	private Track track;
	private Double energy;
	private Double instrumentalness;
	@ManyToOne
	private Key key;
	private Double liveness;
	private Double loudness;
	private String scaleMode;
	private Double speechiness;
	private Double tempo;
	@ManyToOne
	private TimeSignature timeSignature;
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
	
	public TimeSignature getTimeSignature() {
		return timeSignature;
	}
	public void setTimeSignature(TimeSignature timeSignature) {
		this.timeSignature = timeSignature;
	}
	public Double getHappiness() {
		return happiness;
	}
	public void setHappiness(Double happiness) {
		this.happiness = happiness;
	}
	
	
}
