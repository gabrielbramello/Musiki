package br.com.musiki.musikiAPI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Key {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private String label;
	private String description;
	private String equivalentKey;
	private Integer pitch;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEquivalentKey() {
		return equivalentKey;
	}
	public void setEquivalentKey(String equivalentKey) {
		this.equivalentKey = equivalentKey;
	}
	public Integer getPitch() {
		return pitch;
	}
	public void setPitch(Integer pitch) {
		this.pitch = pitch;
	}	
}