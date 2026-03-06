package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework  .web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Usuario.DTO.LoginDTO;
import com.backend.prod.model.Usuario.DTO.UsuarioCadastroDTO;
import com.backend.prod.model.Usuario.DTO.UsuarioListagemDTO;
import com.backend.prod.model.Usuario.DTO.UsuarioResponseDTO;
import com.backend.prod.model.Usuario.Usuario;
import com.backend.prod.repository.FuncionarioRepository;
import com.backend.prod.repository.UsuarioRepository;
import com.backend.prod.service.UsuarioService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class ControllerUsuario {
    
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<UsuarioListagemDTO>> listar(){
        var usuarios = usuarioRepository.findAll().stream().map(UsuarioListagemDTO::new).toList();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<UsuarioResponseDTO> cadastrar(@RequestBody @Valid UsuarioCadastroDTO dados, UriComponentsBuilder uriBuilder) {

        Usuario usuario = usuarioService.cadastrar(dados);

        var uri = uriBuilder
                .path("/usuarios/{id}")
                .buildAndExpand(usuario.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(new UsuarioResponseDTO(usuario));
    }

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @PostMapping("/login")
    @Transactional
    public ResponseEntity<UsuarioResponseDTO> login(@RequestBody @Valid LoginDTO dados) {

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

        return ResponseEntity.ok(new UsuarioResponseDTO(usuario));
    }
}