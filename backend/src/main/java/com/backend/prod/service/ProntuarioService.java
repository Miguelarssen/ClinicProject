package com.backend.prod.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import com.backend.prod.model.Agendamento.Agendamento;
import com.backend.prod.model.Prontuario.Prontuario;
import com.backend.prod.model.Prontuario.ProntuarioTexto;
import com.backend.prod.model.Prontuario.DTO.ProntuarioCadastroDTO;
import com.backend.prod.model.Prontuario.DTO.ProntuarioListagemDTO;
import com.backend.prod.repository.AgendamentoRepository;
import com.backend.prod.repository.ProntuarioRepository;
import com.backend.prod.repository.ProntuarioTextoRepository;

@Service
public class ProntuarioService {
        
        @Autowired
        private ProntuarioRepository prontuarioRepository;

        @Autowired
        private AgendamentoRepository agendamentoRepository;

        @Autowired
        private ProntuarioTextoRepository prontuarioTextoRepository;

        public Prontuario cadastrar(ProntuarioCadastroDTO dados){

            Agendamento agendamento = agendamentoRepository.getReferenceById(dados.idAgendamento());
            Prontuario prontuario = new Prontuario(dados, agendamento);

            ProntuarioTexto textos = new ProntuarioTexto(
                dados.queixaPrincipal(),
                dados.historiaClinica(),
                dados.exameFisico(),
                dados.diagnostico(),
                dados.conduta(),
                dados.observacoes()
            );
            
            ProntuarioTexto textosSalvos = prontuarioTextoRepository.save(textos);
            
            prontuario.setTextos(textosSalvos);
            
            return prontuarioRepository.save(prontuario);
        }

    public Page<ProntuarioListagemDTO> listar(Pageable pageable) {

        var prontuarios = prontuarioRepository.findAll(pageable);

        return prontuarios.map(prontuario -> {

            if (prontuario.getProntuarioTextoId() != null) {
                var texto = prontuarioTextoRepository
                    .findById(prontuario.getProntuarioTextoId())
                    .orElse(null);

                prontuario.setTextos(texto);
            }

            return new ProntuarioListagemDTO(prontuario);
        });
    }        

        public Prontuario getProntuarioComTextos(Long prontuarioId) {
            Prontuario prontuario = prontuarioRepository.findById(prontuarioId).orElse(null);
            
            if (prontuario != null && prontuario.getProntuarioTextoId() != null) {
                ProntuarioTexto textos = prontuarioTextoRepository.findById(prontuario.getProntuarioTextoId()).orElse(null);
                prontuario.setTextos(textos);
            }
            
            return prontuario;
        }
}

