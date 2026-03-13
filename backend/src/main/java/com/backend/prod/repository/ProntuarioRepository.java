package com.backend.prod.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.prod.model.Prontuario.Prontuario;

public interface ProntuarioRepository 
        extends JpaRepository<Prontuario, Long>, JpaSpecificationExecutor<Prontuario> {
}