package com.backend.prod.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.prod.model.Agendamento.Agendamento;
import com.backend.prod.model.Prontuario.Prontuario;
import com.backend.prod.model.Prontuario.DTO.ProntuarioCadastroDTO;
import com.backend.prod.repository.AgendamentoRepository;
import com.backend.prod.repository.ProntuarioRepository;

@Service
public class ProntuarioService {
        
        @Autowired
        private ProntuarioRepository prontuarioRepository;

        @Autowired
        private AgendamentoRepository agendamentoRepository;

        public Prontuario cadastrar(ProntuarioCadastroDTO dados){

            Agendamento agendamento = agendamentoRepository.getReferenceById(dados.idAgendamento());
            Prontuario prontuario = new Prontuario(dados, agendamento);

            return prontuarioRepository.save(prontuario);
    }
}
