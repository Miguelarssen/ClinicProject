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
        
        // O ID do texto será gerado quando ProntuarioTexto for salvo no MongoDB
        // Será inicialmente null até que seja persistido
        this.prontuarioTextoId = null;
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

    @Column(name = "prontuario_texto_id")
    private String prontuarioTextoId;

    // Campos transientes para conveniência (não são persistidos em SQL)
    @Transient
    private transient ProntuarioTexto textos;

    // Getter para acesso conveniente aos textos
    public String getQueixaPrincipal() {
        return textos != null ? textos.getQueixaPrincipal() : null;
    }

    public String getHistoriaClinica() {
        return textos != null ? textos.getHistoriaClinica() : null;
    }

    public String getExameFisico() {
        return textos != null ? textos.getExameFisico() : null;
    }

    public String getDiagnostico() {
        return textos != null ? textos.getDiagnostico() : null;
    }

    public String getConduta() {
        return textos != null ? textos.getConduta() : null;
    }

    public String getObservacoes() {
        return textos != null ? textos.getObservacoes() : null;
    }

    // Setter para definir os textos (usado pelo service)
    public void setTextos(ProntuarioTexto textos) {
        this.textos = textos;
        if (textos != null) {
            this.prontuarioTextoId = textos.getId();
        }
    }
}