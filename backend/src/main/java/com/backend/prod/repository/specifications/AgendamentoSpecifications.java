package com.backend.prod.repository.specifications;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.backend.prod.model.Agendamento.Agendamento;

public class AgendamentoSpecifications {

    public static Specification<Agendamento> funcionarioEmail(String email){
        return (root, query, cb) -> 
            email == null ? null :
            cb.equal(root.get("funcionario").get("email"), email);
    }

    public static Specification<Agendamento> pacienteEmail(String email){
        return (root, query, cb) -> 
            email == null ? null :
            cb.equal(root.get("paciente").get("email"), email);
    }

    public static Specification<Agendamento> dataDepois(LocalDateTime data){
        return (root, query, cb) -> 
            data == null ? null :
            cb.greaterThanOrEqualTo(root.get("dataAgendamento"), data);
    }

    public static Specification<Agendamento> dataAntes(LocalDateTime data){
        return (root, query, cb) -> 
            data == null ? null :
            cb.lessThanOrEqualTo(root.get("dataAgendamento"), data);
    }
}