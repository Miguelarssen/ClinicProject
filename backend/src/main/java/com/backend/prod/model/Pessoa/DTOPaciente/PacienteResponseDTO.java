package com.backend.prod.model.Pessoa.DTOPaciente;

import java.sql.Date;

import com.backend.prod.model.Pessoa.Pessoa;

public record PacienteResponseDTO(
    Long id,
    String nome,
    String cpf,
    Date nascimento,
    String email
) {
    public PacienteResponseDTO(Pessoa pessoa){
        this(
            pessoa.getId(),
            pessoa.getNome(),
            pessoa.getCpf(),
            pessoa.getNascimento(),
            pessoa.getEmail()
        );
    }
}

