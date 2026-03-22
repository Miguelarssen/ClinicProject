package com.backend.prod.model.Prontuario;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "prontuario_textos")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProntuarioTexto {
    
    @Id
    private String id;

    @Field("queixaPrincipal")
    private String queixaPrincipal;

    @Field("historiaClinica")
    private String historiaClinica;

    @Field("exameFisico")
    private String exameFisico;

    @Field("diagnostico")
    private String diagnostico;

    @Field("conduta")
    private String conduta;

    @Field("observacoes")
    private String observacoes;

    public ProntuarioTexto(String queixaPrincipal, String historiaClinica, String exameFisico,
                          String diagnostico, String conduta, String observacoes) {
        this.queixaPrincipal = queixaPrincipal;
        this.historiaClinica = historiaClinica;
        this.exameFisico = exameFisico;
        this.diagnostico = diagnostico;
        this.conduta = conduta;
        this.observacoes = observacoes;
    }
}
