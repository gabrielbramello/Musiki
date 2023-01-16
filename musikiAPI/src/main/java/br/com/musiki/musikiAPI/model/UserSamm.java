package br.com.musiki.musikiAPI.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

@Entity
public class UserSamm {
	
    @Id
    @GeneratedValue(generator = "user_samm_sequence", strategy = GenerationType.AUTO)
    @SequenceGenerator(name="user_samm_sequence",sequenceName="user_samm_seq",initialValue = 1,allocationSize=1)
    private Long id;
	private String name;
	private String login;
	private String password;
	private String email;

	/*
	 * @Column( name = "id_user_samm", unique = true, updatable=false, nullable =
	 * false)
	 * 
	 * @Id
	 * 
	 * @GeneratedValue( generator = "user_samm_sequence",
	 * strategy=GenerationType.SEQUENCE )
	 */
	
	@OneToMany
	private List<Image> images;
	
	@ManyToOne
	private AcessGroup acessGroup;
	
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

	public List<Image> getImages() {
		return images;
	}
	public void setImage(List<Image> image) {
		this.images = image;
	}
	public AcessGroup getAcessGroup() {
		return acessGroup;
	}
	public void setAcessGroup(AcessGroup acessGroup) {
		this.acessGroup = acessGroup;
	}
}