package com.backend.prod.model.Agendamento.DTO;

import java.time.LocalDateTime;

public record AgendamentoCadastroDTO (
    String emailFuncionario,
    String emailPaciente,
    LocalDateTime dataAgendamento,
    String motivo
){
}
