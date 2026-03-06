package com.backend.prod.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.prod.model.Pessoa.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>, JpaSpecificationExecutor<Funcionario>{

    Funcionario findByEmail(String email);

    List<Funcionario> findByNome(String nome);
}