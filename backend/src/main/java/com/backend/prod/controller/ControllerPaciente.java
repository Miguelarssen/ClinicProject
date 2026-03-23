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

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/pacientes")
public class ControllerPaciente {
    
    @Autowired
    private PacienteRepository repository;

    @GetMapping
    @Transactional
    public ResponseEntity<Page<PacienteListagemDTO>> listar(@PageableDefault(size = 10) Pageable pageable){ 

        var pacientes = repository.findAll(pageable).map(PacienteListagemDTO::new);
        return ResponseEntity.ok(pacientes);

    }
    
    @PostMapping
    @Transactional  
    public ResponseEntity<List<PacienteResponseDTO>> cadastrar(@RequestBody @Valid List<PacienteCadastroDTO> dados, UriComponentsBuilder uriBuilder){
        var pacientes = dados.stream()
                .map(Paciente::new)
                .peek(repository::save)
                .map(PacienteResponseDTO::new)
                .toList();

        var uri = uriBuilder.path("/pacientes").build().toUri();

        return ResponseEntity.created(uri).body(pacientes);        
    }
    
    @PutMapping
    @Transactional
    public ResponseEntity<List<PacienteResponseDTO>> atualizar(@RequestBody @Valid List<PacienteAtualizaDTO> dados){
        var pacientes = dados.stream()
                .map(dto -> {
                    var paciente = repository.getReferenceById(dto.id());
                    paciente.atualizarPaciente(dto);
                    return paciente;
                })
                .map(PacienteResponseDTO::new)
                .toList();
        
        return ResponseEntity.ok(pacientes);
    }
}

