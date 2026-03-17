package com.backend.prod.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.backend.prod.model.Agendamento.DTO.AgendamentoCadastroDTO;
import com.backend.prod.model.Agendamento.DTO.AgendamentoListagemDTO;
import com.backend.prod.model.Agendamento.DTO.AgendamentoResponseDTO;
import com.backend.prod.service.AgendamentoService;
import com.backend.prod.repository.AgendamentoRepository;
import com.backend.prod.repository.specifications.AgendamentoSpecifications;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
    
@RestController
@RequestMapping("/agendamentos")
public class ControllerAgendamento {
     @Autowired
     private AgendamentoRepository agendamentoRepository;

    @Autowired
    private AgendamentoService agendamentoService;


    @GetMapping
    @Transactional
    public ResponseEntity<List<AgendamentoListagemDTO>> listar(
            @RequestParam(required = false) String funcionarioEmail,
            @RequestParam(required = false) String pacienteEmail,
            @RequestParam(required = false) LocalDateTime dataInicio,
            @RequestParam(required = false) LocalDateTime dataFim
    ){

        var spec = Specification
                .where(AgendamentoSpecifications.funcionarioEmail(funcionarioEmail))
                .and(AgendamentoSpecifications.pacienteEmail(pacienteEmail))
                .and(AgendamentoSpecifications.dataDepois(dataInicio))
                .and(AgendamentoSpecifications.dataAntes(dataFim));

        var agendamentos = agendamentoRepository.findAll(spec)
                .stream()
                .map(AgendamentoListagemDTO::new)
                .toList();

        return ResponseEntity.ok(agendamentos);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<List<AgendamentoResponseDTO>> cadastrar(@RequestBody @Valid List<AgendamentoCadastroDTO> dados, UriComponentsBuilder uriBuilder){

        var agendamentos = dados.stream()
                .map(agendamentoService::cadastrar)
                .map(AgendamentoResponseDTO::new)
                .toList();

        var uri = uriBuilder.path("/agendamentos").build().toUri();

        return ResponseEntity.created(uri).body(agendamentos);

    }
}
