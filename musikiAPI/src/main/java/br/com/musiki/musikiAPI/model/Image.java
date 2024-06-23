package br.com.musiki.musikiAPI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Image {

	@Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private String url;
	private Integer height;
	private Integer width;
	
	@ManyToOne
	private Artist artist;
	
	@ManyToOne
	private Album album;
	
	@ManyToOne
	private UserSamm user;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public Integer getWidth() {
		return width;
	}
	public void setWidth(Integer width) {
		this.width = width;
	}
	public Artist getArtist() {
		return artist;
	}
	public void setArtist(Artist artist) {
		this.artist = artist;
	}
	public Album getAlbum() {
		return album;
	}
	public void setAlbum(Album album) {
		this.album = album;
	}
	public UserSamm getUser() {
		return user;
	}
	public void setUser(UserSamm user) {
		this.user = user;
	}
}