package br.com.musiki.musikiAPI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TimeSignature {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private Integer denominator;
	private Integer numerator;
	
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