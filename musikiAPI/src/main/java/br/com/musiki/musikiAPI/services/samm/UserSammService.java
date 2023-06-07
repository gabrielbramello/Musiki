package br.com.musiki.musikiAPI.services.samm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.model.UserSamm;
import br.com.musiki.musikiAPI.repository.UserSammRepository;

@Service
public class UserSammService {
	
	@Autowired
	private UserSammRepository userSammRepository;
	
	public UserSamm findUserSammById(Long id) {
		UserSamm userSamm = userSammRepository.findById(id).get();
		return userSamm;
	}
	
	public UserSamm saveUserSamm(UserSammDTO userSammDTO) {
		
		UserSamm userSamm = new UserSamm(userSammDTO);
		return userSammRepository.save(userSamm);		
	}
	
	public UserSamm updateUserSamm(UserSammDTO userSammDTO) {
		
		UserSamm userSamm = new UserSamm(userSammDTO);
		
		if (userSamm.getId() != null && userSammRepository.existsById(userSamm.getId())) {
			return userSammRepository.save(userSamm);
		}
		
		return null;
	}
	
	public void deleteUserSammById(Long id) {
		userSammRepository.deleteById(id);
	}
	
}
