package br.com.musiki.musikiAPI.dto;

public class UserFavoriteRequest {

	private Long userId;
	private String elementId;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getElementId() {
		return elementId;
	}
	public void setElementId(String elementId) {
		this.elementId = elementId;
	}
	
	
}
