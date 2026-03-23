package com.backend.prod.model.Pessoa;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;   
import lombok.NoArgsConstructor;

@Table(name = "pessoa")
@Entity(name = "Pessoas")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
public abstract class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private Date nascimento;
    private String email;

    protected Pessoa(String nome, String cpf, Date nascimento, String email) {
        this.nome = nome;   
        this.cpf = cpf;
        this.nascimento = nascimento;
        this.email = email;
    }

    public void atualizarDados(String nome, String cpf, Date nascimento, String email) {

        if (nome != null) this.nome = nome;
        if (cpf != null) this.cpf = cpf;
        if (nascimento != null) this.nascimento = nascimento;
        if (email != null) this.email = email;
    }
}