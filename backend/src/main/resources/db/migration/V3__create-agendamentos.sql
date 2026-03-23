CREATE TABLE agendamento (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,

    medico_id BIGINT NOT NULL,
    paciente_id BIGINT NOT NULL,
    recepcionista_id BIGINT NOT NULL,

    data_agendamento DATETIME2 NOT NULL,
    motivo VARCHAR(255),

    CONSTRAINT fk_agendamento_medico
        FOREIGN KEY (medico_id)
        REFERENCES funcionario(id),

    CONSTRAINT fk_agendamento_paciente
        FOREIGN KEY (paciente_id)
        REFERENCES paciente(id),
        
    CONSTRAINT fk_agendamento_recepcao
        FOREIGN KEY (recepcionista_id)
        REFERENCES funcionario(id)
);