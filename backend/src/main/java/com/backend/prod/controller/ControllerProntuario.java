package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Prontuario.Prontuario;
import com.backend.prod.model.Prontuario.DTO.ProntuarioCadastroDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioListagemDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioResponseDTO;
import com.backend.prod.repository.ProntuarioRepository;
import com.backend.prod.service.ProntuarioService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/prontuarios")
public class ControllerProntuario {

    @Autowired
    private ProntuarioService prontuarioService;

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    @GetMapping
    public ResponseEntity<Page<ProntuarioListagemDTO>> listar(
            @PageableDefault(size = 10) Pageable pageable) {

        var prontuarios = prontuarioService.listar(pageable);

        return ResponseEntity.ok(prontuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProntuarioResponseDTO> obterPorId(@PathVariable Long id) {
        Prontuario prontuario = prontuarioService.getProntuarioComTextos(id);
        
        if (prontuario == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(new ProntuarioResponseDTO(prontuario));
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