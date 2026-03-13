package com.backend.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.prod.model.Prontuario.Prontuario;
import com.backend.prod.model.Prontuario.DTO.ProntuarioCadastroDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioAtualizaDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioListagemDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioResponseDTO;
import com.backend.prod.repository.ProntuarioRepository;
import com.backend.prod.service.ProntuarioService;

@RestController
@RequestMapping("/prontuarios")
public class ProntuarioController {

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
    public ProntuarioResponseDTO cadastrar(@RequestBody ProntuarioCadastroDTO dados){
        Prontuario prontuario = prontuarioService.cadastrar();
    }

    @PutMapping
    public ProntuarioResponseDTO atualizar(@RequestBody ProntuarioAtualizaDTO dados){

    }
}