package br.com.musiki.musikiAPI.model;

import java.util.List;

public class Track {
	private Long id;
	private Album album;
	private List<Artist> artists;
	private Long duration;
	private String name;
	private Integer popularity;
	private AudioFeatures audioFeatures;
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
	public List<Artist> getArtists() {
		return artists;
	}
	public void setArtists(List<Artist> artists) {
		this.artists = artists;
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
	
	
}
