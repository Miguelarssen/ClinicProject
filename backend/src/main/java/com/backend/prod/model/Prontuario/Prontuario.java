package com.backend.prod.model.Prontuario;

import java.time.LocalDateTime;


import com.backend.prod.model.Agendamento.Agendamento;
import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Pessoa.Paciente;
import com.backend.prod.model.Prontuario.DTO.ProntuarioCadastroDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Prontuario")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Prontuario {

    public Prontuario(ProntuarioCadastroDTO dados, Agendamento agendamento) {

        this.agendamento = agendamento;
        this.paciente = agendamento.getPaciente();
        this.medico = agendamento.getMedico();

        this.dataAtendimento = dados.dataAtendimento();

        this.queixaPrincipal = dados.queixaPrincipal();
        this.historiaClinica = dados.historiaClinica();
        this.exameFisico = dados.exameFisico();
        this.diagnostico = dados.diagnostico();
        this.conduta = dados.conduta();
        this.observacoes = dados.observacoes();
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "medico_id", nullable = false)
    private Funcionario medico;

    @OneToOne
    @JoinColumn(name = "agendamento_id")
    private Agendamento agendamento;

    private LocalDateTime dataAtendimento;

    @Column(columnDefinition = "TEXT")
    private String queixaPrincipal;

    @Column(columnDefinition = "TEXT")
    private String historiaClinica;

    @Column(columnDefinition = "TEXT")
    private String exameFisico;

    @Column(columnDefinition = "TEXT")
    private String diagnostico;

    @Column(columnDefinition = "TEXT")
    private String conduta;

    @Column(columnDefinition = "TEXT")
    private String observacoes;
}