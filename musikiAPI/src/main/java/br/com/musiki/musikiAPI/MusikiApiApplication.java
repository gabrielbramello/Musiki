package br.com.musiki.musikiAPI;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.com.musiki.musikiAPI.entidades.Musica;


@SpringBootApplication
public class MusikiApiApplication {

	public static void main(String[] args) {
		
		List<String> compositores = new ArrayList<String>();
		compositores.add("Caetâno Velosi");
		compositores.add("Chico Cunha");
		Double tempo = Double.parseDouble("300");
		Musica musica = new Musica("Bilacoin in a bila World", "Rods e Seus CAbelos", tempo, "C", "2020", "Chimba e as Tilápias",compositores);
		
		System.out.println(musica.toString());
		
		SpringApplication.run(MusikiApiApplication.class, args);
	}

}
