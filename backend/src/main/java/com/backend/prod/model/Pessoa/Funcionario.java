package com.backend.prod.model.Pessoa;

import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioAtualizaDTO;
import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioCadastroDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Funcionario extends Pessoa {

    @Column(name = "tipo_funcionario")
    @Enumerated(EnumType.STRING)
    private TipoFuncionario tipoFuncionario;

    public Funcionario(FuncionarioCadastroDTO dados) {
        super(
                dados.nome(),
                dados.cpf(),
                dados.nascimento(),
                dados.email());
        this.tipoFuncionario = dados.tipoFuncionario();
    }

    public void atualizarFuncionario(FuncionarioAtualizaDTO dados) {
        super.atualizarDados(
                dados.nome(),
                dados.cpf(),
                dados.nascimento(),
                dados.email());
    }
}