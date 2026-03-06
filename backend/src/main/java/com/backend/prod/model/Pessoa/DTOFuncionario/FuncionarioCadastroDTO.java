package com.backend.prod.model.Pessoa.DTOFuncionario;

import java.sql.Date;

public record FuncionarioCadastroDTO(    
    String nome,
    String cpf,
    Date nascimento,
    String email
) {  
}
