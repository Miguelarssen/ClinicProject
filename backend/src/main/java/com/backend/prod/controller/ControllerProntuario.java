package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Prontuario.DTO.ProntuarioCadastroDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioListagemDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioResponseDTO;
import com.backend.prod.repository.ProntuarioRepository;
import com.backend.prod.service.ProntuarioService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/prontuarios")
public class ControllerProntuario {

    @Autowired
    private ProntuarioService prontuarioService;

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    @GetMapping
    public ResponseEntity<List<ProntuarioListagemDTO>> listar(){

        var prontuarios = prontuarioRepository.findAll()
                .stream()
                .map(ProntuarioListagemDTO::new)
                .toList();

        return ResponseEntity.ok(prontuarios);

    }

    @PostMapping
    @Transactional
    public ResponseEntity<List<ProntuarioResponseDTO>> cadastrar(@RequestBody @Valid List<ProntuarioCadastroDTO> dados, UriComponentsBuilder uriBuilder){
        var prontuarios = dados.stream()
                .map(prontuarioService::cadastrar)
                .map(ProntuarioResponseDTO::new)
                .toList();
        var uri = uriBuilder.path("/prontuarios").build().toUri();

        return ResponseEntity.created(uri).body(prontuarios);

    }
}