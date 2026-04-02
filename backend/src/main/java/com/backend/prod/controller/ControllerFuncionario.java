package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioAtualizaDTO;
import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioCadastroDTO;
import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioListagemDTO;
import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioResponseDTO;
import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.repository.FuncionarioRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/funcionarios")
public class ControllerFuncionario {

    @Autowired
    private FuncionarioRepository repository;

    @GetMapping
    @Transactional
    public ResponseEntity<Page<FuncionarioListagemDTO>> listar(@PageableDefault(size = 10) Pageable pageable) {

        var funcionarios = repository.findAll(pageable).map(FuncionarioListagemDTO::new);
        return ResponseEntity.ok(funcionarios);

    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(repository.count());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<List<FuncionarioResponseDTO>> cadastrar(
            @RequestBody @Valid List<FuncionarioCadastroDTO> dados, UriComponentsBuilder uriBuilder) {
        var funcionarios = dados.stream()
                .map(Funcionario::new)
                .peek(repository::save)
                .map(FuncionarioResponseDTO::new)
                .toList();

        var uri = uriBuilder.path("/funcionarios").build().toUri();

        return ResponseEntity.created(uri).body(funcionarios);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<List<FuncionarioResponseDTO>> atualizar(
            @RequestBody @Valid List<FuncionarioAtualizaDTO> dados) {
        var funcionarios = dados.stream()
                .map(dto -> {
                    var funcionario = repository.getReferenceById(dto.id());
                    funcionario.atualizarFuncionario(dto);
                    return funcionario;
                })
                .map(FuncionarioResponseDTO::new)
                .toList();

        return ResponseEntity.ok(funcionarios);
    }
}
