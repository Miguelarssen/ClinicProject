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

import com.backend.prod.model.Pessoa.DTOPaciente.PacienteAtualizaDTO;
import com.backend.prod.model.Pessoa.DTOPaciente.PacienteCadastroDTO;
import com.backend.prod.model.Pessoa.DTOPaciente.PacienteListagemDTO;
import com.backend.prod.model.Pessoa.DTOPaciente.PacienteResponseDTO;
import com.backend.prod.model.Pessoa.Paciente;
import com.backend.prod.repository.PacienteRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/pacientes")
public class ControllerPaciente {
    
    @Autowired
    private PacienteRepository repository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<PacienteListagemDTO>> listar(){ 

        var pacientes = repository.findAll().stream().map(PacienteListagemDTO::new).toList();
        return ResponseEntity.ok(pacientes);

    }
    
    @PostMapping
    @Transactional  
    public ResponseEntity<PacienteResponseDTO> cadastrar(@RequestBody @Valid PacienteCadastroDTO dados, UriComponentsBuilder uriBuilder){
        var paciente = new Paciente(dados); 
        repository.save(paciente);

        var uri = uriBuilder.path("/pacientes/{id}").buildAndExpand(paciente.getId()).toUri();

        return ResponseEntity.created(uri).body(new PacienteResponseDTO(paciente));        
    }
    
    @PutMapping
    @Transactional
    public ResponseEntity<PacienteResponseDTO> atualizar(@RequestBody @Valid PacienteAtualizaDTO dados){
        var Paciente = repository.getReferenceById(dados.id());
        Paciente.atualizarPaciente(dados);
        
        return ResponseEntity.ok(new PacienteResponseDTO(Paciente));
    }

    
}
