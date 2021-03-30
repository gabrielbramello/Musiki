package br.com.musiki.musikiAPI.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Album {
	@Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	private String type;
	@ManyToOne
	private Artist artist;
	@ManyToMany
	@JoinTable(name = "album_genre", 
				joinColumns = @JoinColumn(name = "album_id"), 
				inverseJoinColumns = @JoinColumn(name = "genre_id"))
	private List<Genres> genres;
	private String label;
	private String name;
	private Integer popularity;
	private Date releaseDate;
	@OneToMany(mappedBy = "album")
	private List<Track> tracks;
	private String featArtistsNames;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public Artist getArtist() {
		return artist;
	}
	public void setArtist(Artist artists) {
		this.artist = artists;
	}
	public List<Genres> getGenres() {
		return genres;
	}
	public void setGenres(List<Genres> genres) {
		this.genres = genres;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
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
	public Date getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}
	public List<Track> getTracks() {
		return tracks;
	}
	public void setTracks(List<Track> tracks) {
		this.tracks = tracks;
	}
	public String getFeatArtistName() {
		return featArtistsNames;
	}
	public void setFeatArtistName(String featArtistName) {
		this.featArtistsNames = featArtistName;
	}
	
	
	
	
}
