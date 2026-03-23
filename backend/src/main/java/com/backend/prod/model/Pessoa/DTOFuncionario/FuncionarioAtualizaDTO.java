package com.backend.prod.model.Pessoa.DTOFuncionario;

import java.sql.Date;

import com.backend.prod.model.Pessoa.TipoFuncionario;
import jakarta.validation.constraints.NotNull;

public record FuncionarioAtualizaDTO(
    
    @NotNull
    Long id,
    String nome,
    String cpf,
    Date nascimento,
    String email,
    TipoFuncionario tipoFuncionario

){
    
}
