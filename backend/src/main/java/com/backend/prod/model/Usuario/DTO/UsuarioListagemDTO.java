package com.backend.prod.model.Usuario.DTO;

import com.backend.prod.model.Usuario.Usuario;

public record  UsuarioListagemDTO (    
    Long id,
    String email,
    String nome
){
    public UsuarioListagemDTO(Usuario usuario){
        this(
            usuario.getId(),
            usuario.getFuncionario().getEmail(),
            usuario.getFuncionario().getNome()
        );
    }
}
