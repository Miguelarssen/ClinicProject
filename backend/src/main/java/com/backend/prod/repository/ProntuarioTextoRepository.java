package com.backend.prod.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.prod.model.Prontuario.ProntuarioTexto;

public interface ProntuarioTextoRepository extends MongoRepository<ProntuarioTexto, String> {
}
