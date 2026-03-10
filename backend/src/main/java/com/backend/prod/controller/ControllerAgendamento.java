package com.backend.prod.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Agendamento.Agendamento;
import com.backend.prod.model.Agendamento.DTO.AgendamentoCadastroDTO;
import com.backend.prod.model.Agendamento.DTO.AgendamentoListagemDTO;
import com.backend.prod.model.Agendamento.DTO.AgendamentoResponseDTO;
import com.backend.prod.service.AgendamentoService;
import com.backend.prod.repository.AgendamentoRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
    
@RestController
@RequestMapping("/agendamentos")
public class ControllerAgendamento {
     @Autowired
     private AgendamentoRepository agendamentoRepository;

    @Autowired
    private AgendamentoService agendamentoServic;


     @GetMapping
     @Transactional
     public ResponseEntity<list<AgendamentoListagemDTO>> listar(){
        var agendamentos = agendamentoRepository.findAll().stream().map(AgendamentoListagemDTO::new).toList();
        return ResponseEntity.ok(agendamentos);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<AgendamentoResponseDTO> cadastrar(@RequestBody @Valid AgendamentoCadastroDTO dados, UriComponentsBuilder uri){

        Agendamento agendamento = agendamentoService.cadastrar(dados);

        var uri = uriBuilder
                .path("/agendamentos/{id}")
                .buildAndExpand(agendamento.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(new AgendamentoResponseDTO(agendamento));

    }
}
