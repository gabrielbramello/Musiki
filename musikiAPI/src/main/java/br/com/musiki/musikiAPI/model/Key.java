package br.com.musiki.musikiAPI.model;

public class Key {
	private Long id;
	private String label;
	private String description;
	private String equivalentKey;
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
	
	
	
}
