package br.com.musiki.musikiAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.musiki.musikiAPI.dto.UserSammDTO;
import br.com.musiki.musikiAPI.exception.usersamm.UserSammException;
import br.com.musiki.musikiAPI.exception.usersamm.UserSammNotFoundException;
import br.com.musiki.musikiAPI.model.UserSamm;
import br.com.musiki.musikiAPI.services.samm.UserSammService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/samm/user/")
public class UserSammController {
	
	@Autowired
	private UserSammService userSammService;
	
	
	@GetMapping("/{id}")
	public ResponseEntity<UserSammDTO> findById(Long id) {
		try {
			UserSammDTO user = userSammService.findUserSammById(id);
			return ResponseEntity.status(200).body(user);
		}
		catch (UserSammNotFoundException e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@PostMapping("/create")
	public ResponseEntity<String> createUserSamm(@RequestBody UserSammDTO userSamm) {
		try {
			UserSamm user = userSammService.saveUserSamm(userSamm);
			
			return ResponseEntity.status(201).body("Usuário criado com sucesso.");
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Erro ao criar o usuário: " + e.getMessage());
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateUserSamm(UserSammDTO userSamm, @PathVariable Long id) {
		try {
			UserSamm user = userSammService.updateUserSamm(userSamm, id);
			
			return ResponseEntity.status(200).body("Usuário atualizado com sucesso.");
		} 
		catch (UserSammNotFoundException e) {
			e.printStackTrace();
			return ResponseEntity.status(404).body("Erro ao criar o usuário: " + e.getMessage());
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Erro ao criar o usuário: " + e.getMessage());
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUserSamm(@PathVariable Long id) {
		try {
			userSammService.deleteUserSammById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
}
