package com.backend.prod.model.Pessoa.DTOFuncionario;

import java.sql.Date;

import com.backend.prod.model.Pessoa.TipoFuncionario;

public record FuncionarioCadastroDTO(    
    String nome,
    String cpf,
    Date nascimento,
    String email,
    TipoFuncionario tipoFuncionario
) {  
}
