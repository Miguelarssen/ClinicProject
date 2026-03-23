package com.backend.prod.model.Prontuario.DTO;

import java.time.LocalDateTime;

public record ProntuarioCadastroDTO(
    Long idAgendamento,
    LocalDateTime dataAtendimento,
    String queixaPrincipal,
    String historiaClinica,
    String exameFisico,
    String diagnostico,
    String conduta,
    String observacoes
){
}