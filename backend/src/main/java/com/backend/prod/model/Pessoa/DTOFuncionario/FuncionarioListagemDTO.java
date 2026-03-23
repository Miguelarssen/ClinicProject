package com.backend.prod.model.Pessoa.DTOFuncionario;

import java.sql.Date;

import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Pessoa.TipoFuncionario;

public record FuncionarioListagemDTO(
    Long id,
    String nome,
    String cpf,
    Date nascimento,
    String email,
    TipoFuncionario tipoFuncionario

) {
    public FuncionarioListagemDTO(Funcionario funcionario){
        this(
            funcionario.getId(),
            funcionario.getNome(),
            funcionario.getCpf(),
            funcionario.getNascimento(),
            funcionario.getEmail(),
            funcionario.getTipoFuncionario()

        );
    }
}

    