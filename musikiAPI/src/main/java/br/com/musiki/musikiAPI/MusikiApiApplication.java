package br.com.musiki.musikiAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.com.musiki.musikiAPI.configuration.Properties;


@SpringBootApplication
public class MusikiApiApplication implements CommandLineRunner{	
	
	@Autowired
	Properties properties;
	
	public static void main(String[] args) {
		
		SpringApplication.run(MusikiApiApplication.class, args);
		
		System.out.println();
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println(properties.getSpotifyApi().getClientId());
		
	}

}
