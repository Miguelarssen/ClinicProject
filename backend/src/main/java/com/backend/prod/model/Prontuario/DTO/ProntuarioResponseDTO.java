package com.backend.prod.model.Prontuario.DTO;

import java.time.LocalDateTime;

import com.backend.prod.model.Prontuario.Prontuario;

public record ProntuarioResponseDTO(
    Long idProntuario,
    Long idPaciente,
    Long idMedico,
    Long idAgendamento,
    LocalDateTime dataAtendimento,
    String queixaPrincipal,
    String historiaClinica,
    String exameFisico,
    String diagnostico,
    String conduta,
    String observacoes
){
    public ProntuarioResponseDTO(Prontuario prontuario){
        this(
            prontuario.getId(),
            prontuario.getPaciente().getId(),
            prontuario.getMedico().getId(),
            prontuario.getAgendamento().getId(),
            prontuario.getDataAtendimento(),
            prontuario.getQueixaPrincipal(),
            prontuario.getHistoriaClinica(),            
            prontuario.getExameFisico(),
            prontuario.getDiagnostico(),
            prontuario.getConduta(),
            prontuario.getObservacoes()
        );
    }
}