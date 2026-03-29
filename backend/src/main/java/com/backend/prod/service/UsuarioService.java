package com.backend.prod.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Usuario.DTO.UsuarioCadastroDTO;
import com.backend.prod.model.Usuario.Usuario;
import com.backend.prod.repository.FuncionarioRepository;
import com.backend.prod.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Usuario cadastrar(UsuarioCadastroDTO dados) {

        Funcionario funcionario = funcionarioRepository.findById(dados.funcionarioId())
        .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        Funcionario gerente = funcionarioRepository.findByEmail(dados.emailFuncionarioGerente());
        Usuario usuarioGerente = usuarioRepository.findByFuncionario(gerente);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(!encoder.matches(dados.senhaUsuario(), usuarioGerente.getSenha())){
            throw new IllegalArgumentException("Senha incorreta");
        }

        if (usuarioRepository.existsByFuncionario(funcionario)) {
            throw new RuntimeException("Funcionário já possui usuário");
        }

        Usuario usuario = new Usuario(dados, funcionario);

        return usuarioRepository.save(usuario);
    }
}