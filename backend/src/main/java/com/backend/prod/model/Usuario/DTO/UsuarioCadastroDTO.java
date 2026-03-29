package com.backend.prod.model.Usuario.DTO;

public record UsuarioCadastroDTO (

    Long funcionarioId,
    String senhaUsuario,
    String emailFuncionarioGerente,
    String senhaFuncionarioGerente

){
}
