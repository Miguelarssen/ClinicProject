package com.backend.prod.model.Pessoa;

import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioAtualizaDTO;
import com.backend.prod.model.Pessoa.DTOFuncionario.FuncionarioCadastroDTO;

import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Funcionario extends Pessoa {

    private TipoFuncionario tipoFuncionario;

    public Funcionario(FuncionarioCadastroDTO dados) {
        super(
            dados.nome(),
            dados.cpf(),
            dados.nascimento(),
            dados.email()
        );
        this.tipoFuncionario = dados.tipoFuncionario();
    }

    public void atualizarFuncionario(FuncionarioAtualizaDTO dados) {
        super.atualizarDados(
            dados.nome(),
            dados.cpf(),
            dados.nascimento(), 
            dados.email()
        );

        //Exemplo para futuras adições na classe paciente
        /*if (dados.convenio() != null) {
            this.convenio = dados.convenio();
        }*/
    }
}