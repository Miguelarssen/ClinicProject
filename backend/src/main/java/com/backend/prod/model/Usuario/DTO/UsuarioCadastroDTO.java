package com.backend.prod.model.Usuario.DTO;

import com.backend.prod.model.Pessoa.TipoFuncionario;

public record UsuarioCadastroDTO(

                Long funcionarioId,
                String senhaUsuario,
                String emailFuncionarioGerente,
                String senhaFuncionarioGerente,
                TipoFuncionario role

) {
}
