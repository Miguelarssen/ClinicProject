package com.backend.prod.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.prod.model.Agendamento.Agendamento;
import com.backend.prod.model.Agendamento.DTO.AgendamentoCadastroDTO;
import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Pessoa.Paciente;
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
        Funcionario funcionario = funcionarioRepository.findByEmail(dados.emailFuncionario());
        Paciente paciente = pacienteRepository.findByEmail(dados.emailPaciente());

        Agendamento agendamento = new Agendamento(dados, funcionario, paciente);

        return agendamentoRepository.save(agendamento);

    }
}