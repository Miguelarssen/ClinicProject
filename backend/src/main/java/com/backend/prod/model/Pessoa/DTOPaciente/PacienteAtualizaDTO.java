package com.backend.prod.model.Pessoa.DTOPaciente;

import java.sql.Date;

import jakarta.validation.constraints.NotNull;

public record PacienteAtualizaDTO(
    
    @NotNull
    Long id,
    String nome,
    String cpf,
    Date nascimento,
    String email

){
    
}
