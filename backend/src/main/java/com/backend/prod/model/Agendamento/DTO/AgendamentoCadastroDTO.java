package com.backend.prod.model.Agendamento.DTO;

import java.time.LocalDateTime;

public record AgendamentoCadastroDTO (
    String emailMedico,
    String emailPaciente,
    String emailRecepcionista,
    LocalDateTime dataAgendamento,
    String motivo
){
}
