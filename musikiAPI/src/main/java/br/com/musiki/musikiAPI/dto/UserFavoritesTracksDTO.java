package br.com.musiki.musikiAPI.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.musiki.musikiAPI.model.Track;

public class UserFavoritesTracksDTO {

	private UserSammDTO userSamm;
	private List<Track> favoritesTracks = new ArrayList<Track>();
	
	public UserSammDTO getUserSamm() {
		return userSamm;
	}
	public void setUserSamm(UserSammDTO userSamm) {
		this.userSamm = userSamm;
	}
	public List<Track> getFavoritesTracks() {
		return favoritesTracks;
	}
	
	
}
