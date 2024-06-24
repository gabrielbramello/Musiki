package br.com.musiki.musikiAPI.model;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

import br.com.musiki.musikiAPI.dto.UserSammDTO;

@Entity
public class UserSamm {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_samm_generator")
    @SequenceGenerator(name="user_samm_generator",sequenceName="user_samm_seq",initialValue = 1,allocationSize=1)
	@Column(name = "id", updatable = false, nullable = false, columnDefinition = "serial")
    private Long id;
	private String name;
	private String login;
	
	@JsonIgnore
	private String password;
	private String email;
	private String role;
	
	@ManyToMany
	@JoinTable(name = "user_artist", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "artist_id"))
	private List<Artist> artists;
	
	@ManyToMany
	@JoinTable(name = "user_album", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "album_id"))
	private List<Album> albuns;
	
	@ManyToMany
	@JoinTable(name = "user_track", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "track_id"))
	private List<Track> tracks;
	
	public UserSamm() {}
	
	public UserSamm(UserSammDTO userSamm){
		
		this.name = userSamm.getName();
		this.login = userSamm.getLogin();
		this.email = userSamm.getEmail();
	}
	
	@OneToMany
	private List<Image> images;
	
	@ManyToOne
	private AcessGroup acessGroup;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public List<Image> getImages() {
		return images;
	}
	public void setImage(List<Image> image) {
		this.images = image;
	}
	public AcessGroup getAcessGroup() {
		return acessGroup;
	}
	public void setAcessGroup(AcessGroup acessGroup) {
		this.acessGroup = acessGroup;
	}

	public List<Artist> getArtists() {
		return artists;
	}

	public void setArtists(List<Artist> artists) {
		this.artists = artists;
	}

	public List<Album> getAlbuns() {
		return albuns;
	}

	public void setAlbuns(List<Album> albuns) {
		this.albuns = albuns;
	}

	public List<Track> getTracks() {
		return tracks;
	}

	public void setTracks(List<Track> tracks) {
		this.tracks = tracks;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
}