package com.backend.prod.model.Prontuario.DTO;

import jakarta.validation.constraints.NotNull;

public record ProntuarioAtualizaDTO(
    @NotNull
    Long id,
    String queixaPrincipal,
    String historiaClinica,
    String exameFisico,
    String diagnostico,
    String conduta,
    String observacoes
){
}