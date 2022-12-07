package br.com.musiki.musikiAPI.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Valence {

	@Id
	private Long id;
	private Float spotifyMeasure;
	private String description;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Float getSpotifyMeasure() {
		return spotifyMeasure;
	}
	public void setSpotifyMeasure(Float spotifyMeasure) {
		this.spotifyMeasure = spotifyMeasure;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
