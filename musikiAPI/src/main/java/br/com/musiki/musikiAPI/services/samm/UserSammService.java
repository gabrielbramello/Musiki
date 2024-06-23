package br.com.musiki.musikiAPI.services.samm;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.exception.usersamm.UserSammException;
import br.com.musiki.musikiAPI.exception.usersamm.UserSammNotFoundException;
import br.com.musiki.musikiAPI.model.UserSamm;
import br.com.musiki.musikiAPI.repository.UserSammRepository;

@Service
public class UserSammService {
	
	@Autowired
	private UserSammRepository userSammRepository;
	
	public UserSammDTO findUserSammById(Long id) {
		
		try {
			UserSamm userSamm = userSammRepository.findById(id).get();
			UserSammDTO userSammDTO = new UserSammDTO(userSamm);
			return userSammDTO;
			
		} catch (NoSuchElementException e) {
			throw new UserSammNotFoundException("Usuário com id "+id+" não encontrado!");
		}
	}
	
	public Optional<UserSamm> findUserByLogin(String login) {
		try {
			Optional<UserSamm> userSamm = userSammRepository.findByLogin(login);
			return userSamm;
		} catch (NoSuchElementException e) {
			throw new UserSammNotFoundException("Usuário com login "+login+" não encontrado!");
		}
	}
	
	public UserSamm saveUserSamm(UserSammDTO userSammDTO) {
		
		UserSamm userSamm = new UserSamm(userSammDTO);
		return userSammRepository.save(userSamm);		
	}
	
	public UserSamm updateUserSamm(UserSammDTO userSammDTO, Long id) {
		
		UserSamm userSamm = new UserSamm(userSammDTO);
		
		if (id!= null && userSammRepository.existsById(id)) {
			return userSammRepository.save(userSamm);
		}else {
			throw new UserSammNotFoundException("Usuário com id "+id+" não encontrado!");
		}
	}
	
	public void deleteUserSammById(Long id) {
		userSammRepository.deleteById(id);
	}
	
}
