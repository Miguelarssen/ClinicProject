CREATE TABLE agendamento (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,

    funcionario_id BIGINT NOT NULL,
    paciente_id BIGINT NOT NULL,

    data_agendamento DATETIME2 NOT NULL,
    motivo VARCHAR(255),

    CONSTRAINT fk_agendamento_funcionario
        FOREIGN KEY (funcionario_id)
        REFERENCES funcionario(id),

    CONSTRAINT fk_agendamento_paciente
        FOREIGN KEY (paciente_id)
        REFERENCES paciente(id)
);