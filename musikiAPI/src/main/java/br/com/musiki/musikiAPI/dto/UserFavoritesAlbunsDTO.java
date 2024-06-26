package br.com.musiki.musikiAPI.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.musiki.musikiAPI.model.Album;

public class UserFavoritesAlbunsDTO {

	private UserSammDTO userSamm;
	private List<Album> favoritesAlbuns = new ArrayList<Album>();
	
	public UserSammDTO getUserSamm() {
		return userSamm;
	}
	public void setUserSamm(UserSammDTO userSamm) {
		this.userSamm = userSamm;
	}
	public List<Album> getFavoritesAlbuns() {
		return favoritesAlbuns;
	}
	
	
}
