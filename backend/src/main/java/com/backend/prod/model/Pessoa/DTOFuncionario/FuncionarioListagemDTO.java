package com.backend.prod.model.Pessoa.DTOFuncionario;

import java.sql.Date;

import com.backend.prod.model.Pessoa.Pessoa;

public record FuncionarioListagemDTO(
    Long id,
    String nome,
    String cpf,
    Date nascimento,
    String email

) {
    public FuncionarioListagemDTO(Pessoa pessoa){
        this(
            pessoa.getId(),
            pessoa.getNome(),
            pessoa.getCpf(),
            pessoa.getNascimento(),
            pessoa.getEmail()

        );
    }
}

    