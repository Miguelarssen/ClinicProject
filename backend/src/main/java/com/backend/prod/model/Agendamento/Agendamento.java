package com.backend.prod.model.Agendamento;


import java.time.LocalDateTime;

import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Pessoa.Paciente;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "agendamento")
@Entity(name = "agendamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Agendamento {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Funcionario funcionario;

    @ManyToOne
    private Paciente paciente;
    private LocalDateTime dataAgendamento;
    private String motivo;


}
