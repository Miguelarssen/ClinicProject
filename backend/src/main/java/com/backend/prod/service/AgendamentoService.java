package com.backend.prod.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.prod.model.Agendamento.Agendamento;
import com.backend.prod.model.Agendamento.DTO.AgendamentoCadastroDTO;
import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Pessoa.Paciente;
import com.backend.prod.model.Pessoa.TipoFuncionario;
import com.backend.prod.repository.AgendamentoRepository;
import com.backend.prod.repository.FuncionarioRepository;
import com.backend.prod.repository.PacienteRepository;

@Service
public class AgendamentoService {
    
    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Agendamento cadastrar(AgendamentoCadastroDTO dados){
        Funcionario medico = funcionarioRepository.findByEmail(dados.emailMedico());
        if (medico == null) {
            throw new IllegalArgumentException("Funcionário com email " + dados.emailMedico() + " não encontrado");
        }
        if (!medico.getTipoFuncionario().equals(TipoFuncionario.MEDICO)) {
            throw new IllegalArgumentException("Funcionário com email " + dados.emailMedico() + " não é um MÉDICO");
        }

        Paciente paciente = pacienteRepository.findByEmail(dados.emailPaciente());
        if (paciente == null) {
            throw new IllegalArgumentException("Paciente com email " + dados.emailPaciente() + " não encontrado");
        }

        Funcionario recepcionista = funcionarioRepository.findByEmail(dados.emailRecepcionista());
        if (recepcionista == null) {
            throw new IllegalArgumentException("Funcionário com email " + dados.emailRecepcionista() + " não encontrado");
        }
        if (!recepcionista.getTipoFuncionario().equals(TipoFuncionario.RECEPCAO)) {
            throw new IllegalArgumentException("Funcionário com email " + dados.emailRecepcionista() + " não é da RECEPÇÃO");
        }
        Agendamento agendamento = new Agendamento(dados, medico, paciente, recepcionista);

        return agendamentoRepository.save(agendamento);

    }
}