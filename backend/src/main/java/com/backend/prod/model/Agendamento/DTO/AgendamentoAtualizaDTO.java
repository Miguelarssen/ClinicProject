package com.backend.prod.model.Agendamento.DTO;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record AgendamentoAtualizaDTO (
    @NotNull
    Long id,
    String emailMedico,
    String emailPaciente,
    String emailRecepcionista,
    LocalDateTime dataAgendamento,
    String motivo
){
}
