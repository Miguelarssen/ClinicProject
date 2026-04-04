package com.backend.prod.model.Usuario.DTO;

import com.backend.prod.model.Usuario.Usuario;


public record UsuarioResponseDTO(
    Long id,
    String senha,
    String nome,
    String email,
    String role

) {
    public UsuarioResponseDTO(Usuario usuario){
        this(
            usuario.getId(),
            usuario.getSenha(),
            usuario.getFuncionario().getNome(),
            usuario.getFuncionario().getEmail(),
            usuario.getRole().toString()
        );
    }
}

