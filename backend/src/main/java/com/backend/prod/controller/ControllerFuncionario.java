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

@RestController
@RequestMapping("/funcionarios")
public class ControllerFuncionario {
    
    @Autowired
    private FuncionarioRepository repository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<FuncionarioListagemDTO>> listar(){ 

        var funcionarios = repository.findAll().stream().map(FuncionarioListagemDTO::new).toList();
        return ResponseEntity.ok(funcionarios);

    }
    
    @PostMapping
    @Transactional  
    public ResponseEntity<FuncionarioResponseDTO> cadastrar(@RequestBody @Valid FuncionarioCadastroDTO dados, UriComponentsBuilder uriBuilder){
        var funcionario = new Funcionario(dados); 
        repository.save(funcionario);

        var uri = uriBuilder.path("/funcionarios/{id}").buildAndExpand(funcionario.getId()).toUri();

        return ResponseEntity.created(uri).body(new FuncionarioResponseDTO(funcionario));        
    }
    
    @PutMapping
    @Transactional
    public ResponseEntity<FuncionarioResponseDTO> atualizar(@RequestBody @Valid FuncionarioAtualizaDTO dados){
        var funcionario = repository.getReferenceById(dados.id());
        funcionario.atualizarFuncionario(dados);
        
        return ResponseEntity.ok(new FuncionarioResponseDTO(funcionario));
    }
 
    
}
