package br.com.musiki.musikiAPI.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
@Entity
public class Artist {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private Long totalFollowers;
	private String spotifyApiId;
	private String name;
	private Integer popularity;
	private String uriSpotify;
	private String simplifiedGenres;
	
	@ManyToMany(mappedBy = "artists")
	private List<Album> albuns;

	@OneToMany
	private List<Image> images;
	
	@ManyToMany
	@JoinTable(name = "artist_genre", 
		joinColumns = @JoinColumn(name = "artist_id"), 
		inverseJoinColumns = @JoinColumn(name = "genre_id"))
	private List<Genre> genres;
	
	@ManyToMany(mappedBy = "artists")
	@JsonIgnore
	private List<UserSamm> users;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getTotalFollowers() {
		return totalFollowers;
	}

	public void setTotalFollowers(Long totalFollowers) {
		this.totalFollowers = totalFollowers;
	}

	public String getSpotifyApiId() {
		return spotifyApiId;
	}

	public void setSpotifyApiId(String spotifyApiId) {
		this.spotifyApiId = spotifyApiId;
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

	public String getUriSpotify() {
		return uriSpotify;
	}

	public void setUriSpotify(String uriSpotify) {
		this.uriSpotify = uriSpotify;
	}

	public List<Album> getAlbuns() {
		return albuns;
	}

	public void setAlbuns(List<Album> albuns) {
		this.albuns = albuns;
	}

	public List<UserSamm> getUsers() {
		return users;
	}

	public void setUsers(List<UserSamm> users) {
		this.users = users;
	}

	public String getSimplifiedGenres() {
		return simplifiedGenres;
	}

	public void setSimplifiedGenres(String simplifiedGenres) {
		this.simplifiedGenres = simplifiedGenres;
	}
	
	
}