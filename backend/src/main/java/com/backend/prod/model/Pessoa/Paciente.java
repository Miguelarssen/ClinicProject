package com.backend.prod.model.Pessoa;

import com.backend.prod.model.Pessoa.DTOPaciente.PacienteAtualizaDTO;
import com.backend.prod.model.Pessoa.DTOPaciente.PacienteCadastroDTO;

import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Paciente extends Pessoa {

    public Paciente(PacienteCadastroDTO dados) {
        super(
            dados.nome(),
            dados.cpf(),
            dados.nascimento(),
            dados.email()
        );
    }

    public void atualizarPaciente(PacienteAtualizaDTO dados) {
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