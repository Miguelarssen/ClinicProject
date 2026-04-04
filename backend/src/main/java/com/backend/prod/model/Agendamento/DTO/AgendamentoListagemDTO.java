package com.backend.prod.model.Agendamento.DTO;

import java.time.LocalDateTime;

import com.backend.prod.model.Agendamento.Agendamento;

public record AgendamentoListagemDTO(    
    Long idAgendamento,
    String emailPaciente,
    String emailMedico,
    Long idRecepcionista,
    LocalDateTime dataAgendamento,
    String motivo

){
    public AgendamentoListagemDTO(Agendamento agendamento){
        this(
            agendamento.getId(),
            agendamento.getPaciente().getEmail(),
            agendamento.getMedico().getEmail(),
            agendamento.getRecepcionista().getId(),
            agendamento.getDataAgendamento(),
            agendamento.getMotivo()
        );
    }
}
