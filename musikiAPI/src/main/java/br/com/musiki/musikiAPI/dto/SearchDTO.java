package br.com.musiki.musikiAPI.dto;

import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Track;

public class SearchDTO {
	
	private String id;
	private String name;
	private String type;
	
	
	public SearchDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public SearchDTO(AlbumSimplified album) {
		this.id = album.getId();
		this.name = album.getName();
		this.type = album.getType().getType();
	}
	
	public SearchDTO(Artist artist) {
		this.id = artist.getId();
		this.name = artist.getName();
		this.type = artist.getType().getType();
	}
	
	public SearchDTO(Track track) {
		this.id = track.getId();
		this.name = track.getName() + " - "+track.getArtists()[0].getName();
		this.type = track.getType().getType();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	
}
