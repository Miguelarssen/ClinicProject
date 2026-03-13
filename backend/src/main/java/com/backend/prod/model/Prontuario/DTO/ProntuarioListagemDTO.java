package com.backend.prod.model.Prontuario.DTO;

import java.time.LocalDateTime;

import com.backend.prod.model.Prontuario.Prontuario;

public record ProntuarioListagemDTO(
    Long idProntuario,
    Long idPaciente,
    Long idMedico,
    Long idAgendamento,
    LocalDateTime dataAtendimento,
    String diagnostico
){
    public ProntuarioListagemDTO(Prontuario prontuario){
        this(
            prontuario.getId(),
            prontuario.getPaciente().getId(),
            prontuario.getMedico().getId(),
            prontuario.getAgendamento().getId(),
            prontuario.getDataAtendimento(),
            prontuario.getDiagnostico()
        );
    }
}