package br.com.musiki.musikiAPI.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "seq_acess_group", sequenceName = "seq_acess_group", allocationSize = 1, initialValue = 5)
public class AcessGroup {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY,generator="seq_acess_group")
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
