package com.backend.prod.model.Pessoa.DTOPaciente;

import java.sql.Date;

public record PacienteCadastroDTO(    
    String nome,
    String cpf,
    Date nascimento,
    String email
) {  
}
