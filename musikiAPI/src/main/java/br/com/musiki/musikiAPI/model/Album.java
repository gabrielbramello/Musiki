package br.com.musiki.musikiAPI.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Album {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private Integer totalTracks;
	private String href;
	private String spotifyApiId;
	
	@ManyToOne
	private AlbumType albumType;
	
	@OneToMany
	private List<Image> images;
	
	@ManyToMany
	@JoinTable(name = "album_artist", 
				joinColumns = @JoinColumn(name = "album_id"), 
				inverseJoinColumns = @JoinColumn(name = "artist_id"))
	
	private List<Artist> artists;
	private String name;
	private Integer popularity;
	private Date releaseDate;
	
	@ManyToMany
	@JoinTable(name = "album_track", 
				joinColumns = @JoinColumn(name = "album_id"), 
				inverseJoinColumns = @JoinColumn(name = "track_id"))
	private List<Track> tracks;
	private String uriSpotify;
	
	@ManyToMany(mappedBy = "albuns")
	@JsonIgnore
	private List<UserSamm> users;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getTotalTracks() {
		return totalTracks;
	}
	public void setTotalTracks(Integer totalTracks) {
		this.totalTracks = totalTracks;
	}
	public String getHref() {
		return href;
	}
	public void setHref(String href) {
		this.href = href;
	}
	public String getSpotifyApiId() {
		return spotifyApiId;
	}
	public void setSpotifyApiId(String spotifyApiId) {
		this.spotifyApiId = spotifyApiId;
	}
	public AlbumType getAlbumType() {
		return albumType;
	}
	public void setAlbumType(AlbumType albumType) {
		this.albumType = albumType;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		this.images = images;
	}
	public List<Artist> getArtists() {
		return artists;
	}
	public void setArtists(List<Artist> artists) {
		this.artists = artists;
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
	public String getUriSpotify() {
		return uriSpotify;
	}
	public void setUriSpotify(String uriSpotify) {
		this.uriSpotify = uriSpotify;
	}
	public List<UserSamm> getUsers() {
		return users;
	}
	public void setUsers(List<UserSamm> users) {
		this.users = users;
	}
	
}