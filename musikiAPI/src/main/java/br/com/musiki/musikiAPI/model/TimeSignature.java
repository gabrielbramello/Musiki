package br.com.musiki.musikiAPI.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class TimeSignature {
	@Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	private Integer denominator;
	private Integer numerator;
	@OneToMany(mappedBy = "timeSignature")
	private List<AudioFeatures> audioFeatures;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getDenominator() {
		return denominator;
	}
	public void setDenominator(Integer denominator) {
		this.denominator = denominator;
	}
	public Integer getNumerator() {
		return numerator;
	}
	public void setNumerator(Integer numerator) {
		this.numerator = numerator;
	}
	
	
	
}
