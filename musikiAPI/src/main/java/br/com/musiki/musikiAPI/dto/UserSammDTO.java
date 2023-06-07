package br.com.musiki.musikiAPI.dto;

import br.com.musiki.musikiAPI.model.UserSamm;

public class UserSammDTO {

    private Long id;
	private String name;
	private String login;
	private String password;
	private String email;
	
	
	public UserSammDTO() {}
	
	public UserSammDTO(UserSamm userSamm){
		this.id = userSamm.getId();
		this.name = userSamm.getName();
		this.login = userSamm.getLogin();
		this.password = userSamm.getPassword();
		this.email = userSamm.getEmail();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
