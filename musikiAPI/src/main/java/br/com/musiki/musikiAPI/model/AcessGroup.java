package br.com.musiki.musikiAPI.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "acess_group_sequence", sequenceName = "acess_group_seq", initialValue = 1, allocationSize = 1)
public class AcessGroup {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="acess_group_sequence")
	@Column(name="id", nullable = false, updatable = false)
	private Long id;
	private String description;
	
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
}