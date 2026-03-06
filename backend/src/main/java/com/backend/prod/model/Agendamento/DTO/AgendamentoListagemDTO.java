package com.backend.prod.model.Agendamento.DTO;

import java.time.LocalDateTime;

import com.backend.prod.model.Agendamento.Agendamento;

public record AgendamentoListagemDTO(    
    Long idAgendamento,
    Long idPaciente,
    Long idFuncionario,
    LocalDateTime dataAgendamento,
    String motivo

){
    public AgendamentoListagemDTO(Agendamento agendamento){
        this(
            agendamento.getId(),
            agendamento.getPaciente().getId(),
            agendamento.getFuncionario().getId(),
            agendamento.getDataAgendamento(),
            agendamento.getMotivo()
        );
    }
}
