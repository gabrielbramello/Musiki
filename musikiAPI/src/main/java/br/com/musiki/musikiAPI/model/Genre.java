package br.com.musiki.musikiAPI.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Genre {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private String description;
	
	@ManyToMany(mappedBy = "genres")
	private List<Artist> artists;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
<<<<<<< HEAD
	
	
	
}
=======
	public List<Album> getAlbuns() {
		return albuns;
	}
	public void setAlbuns(List<Album> albuns) {
		this.albuns = albuns;
	}
}
>>>>>>> 8f454ea2789e14abf706d7b0e88cc72038a355f7
