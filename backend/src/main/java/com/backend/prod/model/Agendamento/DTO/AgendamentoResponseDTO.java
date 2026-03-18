package com.backend.prod.model.Agendamento.DTO;

import java.time.LocalDateTime;

import com.backend.prod.model.Agendamento.Agendamento;

public record AgendamentoResponseDTO(    
    Long idAgendamento,
    Long idPaciente,
    Long idMedico,
    Long idRecepcionista,
    LocalDateTime dataAgendamento,
    String motivo

){
    public AgendamentoResponseDTO(Agendamento agendamento){
        this(
            agendamento.getId(),
            agendamento.getPaciente().getId(),
            agendamento.getMedico().getId(),
            agendamento.getRecepcionista().getId(),
            agendamento.getDataAgendamento(),
            agendamento.getMotivo()
        );
    }
}
