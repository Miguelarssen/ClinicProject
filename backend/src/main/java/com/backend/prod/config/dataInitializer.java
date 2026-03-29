package com.backend.prod.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Date;
import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Pessoa.TipoFuncionario;
import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioCadastroDTO;
import com.backend.prod.model.Usuario.Usuario;
import com.backend.prod.repository.FuncionarioRepository;
import com.backend.prod.repository.UsuarioRepository;

@Configuration
public class dataInitializer {

    @Bean
    CommandLineRunner init(UsuarioRepository usuarioRepository,
            FuncionarioRepository funcionarioRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (usuarioRepository.count() == 0) {

                var funcionarioDTO = new FuncionarioCadastroDTO(
                        "Administrador",
                        "00000000000",
                        Date.valueOf("2000-01-01"),
                        "admin@admin.com",
                        TipoFuncionario.MEDICO);
                var funcionario = new Funcionario(funcionarioDTO);
                funcionarioRepository.save(funcionario);

                var usuario = new Usuario();
                usuario.setFuncionario(funcionario);
                usuario.setSenha(passwordEncoder.encode("123456"));
                usuario.setUserGerente(true);

                usuarioRepository.save(usuario);

                System.out.println("ADMIN CRIADO: admin@admin.com / 123456");
            }
        };
    }
}