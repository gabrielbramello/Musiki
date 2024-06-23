package br.com.musiki.musikiAPI.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.musiki.musikiAPI.model.UserSamm;

public interface UserSammRepository extends CrudRepository<UserSamm, Long>{
	
	
	Optional<UserSamm> findById(Long id);
	Optional<UserSamm> findByLogin(String login);
	UserSamm save(UserSamm userSamm);
	void deleteById(Long id);
}
