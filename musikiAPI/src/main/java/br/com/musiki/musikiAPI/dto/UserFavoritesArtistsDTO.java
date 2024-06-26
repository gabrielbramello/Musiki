package br.com.musiki.musikiAPI.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.musiki.musikiAPI.model.Artist;

public class UserFavoritesArtistsDTO {

	private UserSammDTO userSamm;
	private List<Artist> favoritesArtists = new ArrayList<Artist>();
	public UserSammDTO getUserSamm() {
		return userSamm;
	}
	public void setUserSamm(UserSammDTO userSamm) {
		this.userSamm = userSamm;
	}
	public List<Artist> getFavoritesArtists() {
		return favoritesArtists;
	}

	
	
	
}
