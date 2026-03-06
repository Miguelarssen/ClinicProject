package com.backend.prod.model.Usuario.DTO;

import jakarta.validation.constraints.NotNull;

public record LoginDTO(
    @NotNull
    String email,

    @NotNull
    String senha
){  
}
