package com.backend.prod.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.prod.model.Agendamento.Agendamento;
import com.backend.prod.model.Prontuario.Prontuario;
import com.backend.prod.model.Prontuario.ProntuarioTexto;
import com.backend.prod.model.Prontuario.DTO.ProntuarioCadastroDTO;
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

            // Criar e salvar os textos em MongoDB
            ProntuarioTexto textos = new ProntuarioTexto(
                dados.queixaPrincipal(),
                dados.historiaClinica(),
                dados.exameFisico(),
                dados.diagnostico(),
                dados.conduta(),
                dados.observacoes()
            );
            
            ProntuarioTexto textosSalvos = prontuarioTextoRepository.save(textos);
            
            // Vincular os textos ao prontuario
            prontuario.setTextos(textosSalvos);
            
            // Salvar o prontuário em SQL
            return prontuarioRepository.save(prontuario);
        }

        /**
         * Carrega um prontuário com seus textos do MongoDB
         * @param prontuarioId ID do prontuário em SQL
         * @return Prontuário com textos carregados
         */
        public Prontuario getProntuarioComTextos(Long prontuarioId) {
            Prontuario prontuario = prontuarioRepository.findById(prontuarioId).orElse(null);
            
            if (prontuario != null && prontuario.getProntuarioTextoId() != null) {
                ProntuarioTexto textos = prontuarioTextoRepository.findById(prontuario.getProntuarioTextoId()).orElse(null);
                prontuario.setTextos(textos);
            }
            
            return prontuario;
        }
}

