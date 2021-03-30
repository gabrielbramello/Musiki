package br.com.musiki.musikiAPI.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
@Entity
public class Track {
	@Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	@ManyToOne
	private Album album;
	private Long duration;
	private String name;
	private Integer popularity;
	@OneToOne
	private AudioFeatures audioFeatures;
	private String featArtistisNames;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Album getAlbum() {
		return album;
	}
	public void setAlbum(Album album) {
		this.album = album;
	}
	public Long getDuration() {
		return duration;
	}
	public void setDuration(Long duration) {
		this.duration = duration;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getPopularity() {
		return popularity;
	}
	public void setPopularity(Integer popularity) {
		this.popularity = popularity;
	}
	public AudioFeatures getAudioFeatures() {
		return audioFeatures;
	}
	public void setAudioFeatures(AudioFeatures audioFeatures) {
		this.audioFeatures = audioFeatures;
	}
	public String getFeatArtistisNames() {
		return featArtistisNames;
	}
	public void setFeatArtistisNames(String featArtistisNames) {
		this.featArtistisNames = featArtistisNames;
	}
	
	
}
