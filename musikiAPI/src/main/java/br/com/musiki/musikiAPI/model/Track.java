package br.com.musiki.musikiAPI.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Track {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@ManyToMany(mappedBy = "tracks") 
	private List<Album> album;
	private Long duration;
	private Boolean explicit;
	private String spotifyApiId;
	private String name;
	private Integer popularity;
	private Float acousticness;
	private Float danceability;
	private Float energy;
	private Float instrumentalness;
	
	@ManyToOne
	private Key key;
	
	private Float loudness;
	private Integer mode;
	private Float speechiness;
	private Float tempo;
	
	@ManyToOne
	private TimeSignature timeSignature;
	
	private String spotifytrackHref;
	private String spotifyUri;
	
	@ManyToOne
	private Valence valence;

	@ManyToMany(mappedBy = "tracks")
	private List<UserSamm> users;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public List<Album> getAlbum() {
		return album;
	}
	public void setAlbum(List<Album> album) {
		this.album = album;
	}
	public Long getDuration() {
		return duration;
	}
	public void setDuration(Long duration) {
		this.duration = duration;
	}
	public Boolean getExplicit() {
		return explicit;
	}
	public void setExplicit(Boolean explicit) {
		this.explicit = explicit;
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
	public Float getAcousticness() {
		return acousticness;
	}
	public void setAcousticness(Float acousticness) {
		this.acousticness = acousticness;
	}
	public Float getDanceability() {
		return danceability;
	}
	public void setDanceability(Float danceability) {
		this.danceability = danceability;
	}
	public Float getEnergy() {
		return energy;
	}
	public void setEnergy(Float energy) {
		this.energy = energy;
	}
	public Float getInstrumentalness() {
		return instrumentalness;
	}
	public void setInstrumentalness(Float instrumentalness) {
		this.instrumentalness = instrumentalness;
	}
	public Key getKey() {
		return key;
	}
	public void setKey(Key key) {
		this.key = key;
	}
	public Float getLoudness() {
		return loudness;
	}
	public void setLoudness(Float loudness) {
		this.loudness = loudness;
	}
	public Integer getMode() {
		return mode;
	}
	public void setMode(Integer mode) {
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
	public TimeSignature getTimeSignature() {
		return timeSignature;
	}
	public void setTimeSignature(TimeSignature timeSignature) {
		this.timeSignature = timeSignature;
	}
	public String getSpotifytrackHref() {
		return spotifytrackHref;
	}
	public void setSpotifytrackHref(String spotifytrackHref) {
		this.spotifytrackHref = spotifytrackHref;
	}
	public String getSpotifyUri() {
		return spotifyUri;
	}
	public void setSpotifyUri(String spotifyUri) {
		this.spotifyUri = spotifyUri;
	}
	public Valence getValence() {
		return valence;
	}
	public void setValence(Valence valence) {
		this.valence = valence;
	}
	public List<UserSamm> getUsers() {
		return users;
	}
	public void setUsers(List<UserSamm> users) {
		this.users = users;
	}
	
}