package br.com.musiki.musikiAPI.entidades;

import java.util.Date;
import java.util.List;

public class Musica {

	private String titulo;
	private String artista;
	// Por segundos
	private Double duracao;
	private String tom;
	private String anoLancamento;
	private String album;
	private List<String> compositores;
	
	
	public Musica(String titulo, String artista, Double duracao, String tom, String anoLancamento, String album,
			List<String> compositores) {
		this.titulo = titulo;
		this.artista = artista;
		this.duracao = duracao;
		this.tom = tom;
		this.anoLancamento = anoLancamento;
		this.album = album;
		this.compositores = compositores;
	}
	
	public String getTitulo() {
		return this.titulo;
	}
	
	public void setTiturlo(String titulo) {
		this.titulo=titulo;
	}

	public String getArtista() {
		return artista;
	}

	public void setArtista(String artista) {
		this.artista = artista;
	}

	public Double getDuracao() {
		return duracao;
	}

	public void setDuracao(Double duracao) {
		this.duracao = duracao;
	}

	public String getTom() {
		return tom;
	}

	public void setTom(String tom) {
		this.tom = tom;
	}

	public String getAnoLancamento() {
		return anoLancamento;
	}

	public void setAnoLancamento(String anoLancamento) {
		this.anoLancamento = anoLancamento;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public List<String> getCompositores() {
		return compositores;
	}

	public void setCompositores(List<String> compositores) {
		this.compositores = compositores;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	@Override
	public String toString() {
		return "Musica [titulo=" + titulo + ", artista=" + artista + ", duracao=" + duracao + ", tom=" + tom
				+ ", anoLancamento=" + anoLancamento + ", album=" + album + ", compositores=" + compositores + "]";
	}
	
	
	
	
}
