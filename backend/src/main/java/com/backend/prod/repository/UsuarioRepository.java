package com.backend.prod.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Usuario.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByFuncionario(Funcionario funcionario);
    Usuario findByFuncionario(Funcionario funcionario);
}