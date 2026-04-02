package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Usuario.DTO.LoginDTO;
import com.backend.prod.model.Usuario.DTO.UsuarioCadastroDTO;
import com.backend.prod.model.Usuario.DTO.UsuarioListagemDTO;
import com.backend.prod.model.Usuario.DTO.UsuarioResponseDTO;
import com.backend.prod.repository.FuncionarioRepository;
import com.backend.prod.repository.UsuarioRepository;
import com.backend.prod.service.UsuarioService;
import com.backend.prod.service.TokenService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/usuarios")
public class ControllerUsuario {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    @Transactional
    public ResponseEntity<Page<UsuarioListagemDTO>> listar(@PageableDefault(size = 10) Pageable pageable) {
        var usuarios = usuarioRepository.findAll(pageable).map(UsuarioListagemDTO::new);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(usuarioRepository.count());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<List<UsuarioResponseDTO>> cadastrar(@RequestBody @Valid List<UsuarioCadastroDTO> dados,
            UriComponentsBuilder uriBuilder) {

        var usuarios = dados.stream()
                .map(usuarioService::cadastrar)
                .map(UsuarioResponseDTO::new)
                .toList();

        var uri = uriBuilder.path("/usuarios").build().toUri();

        return ResponseEntity.created(uri).body(usuarios);
    }

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @PostMapping("/auth/login")
    @Transactional
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO dados) {

        var funcionario = funcionarioRepository.findByEmail(dados.email());

        if (funcionario == null) {
            return ResponseEntity.badRequest().build();
        }

        var usuario = usuarioRepository.findByFuncionario(funcionario);

        if (usuario == null) {
            return ResponseEntity.badRequest().build();
        }

        boolean cred = usuario.login(dados);

        if (!cred) {
            return ResponseEntity.badRequest().build();
        }

        String token = tokenService.generateToken(usuario);

        return ResponseEntity.ok(java.util.Map.of(
                "token", token,
                "usuario", new UsuarioResponseDTO(usuario)));
    }
}