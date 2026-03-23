
CREATE TABLE prontuario (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,

    paciente_id BIGINT NOT NULL,
    medico_id BIGINT NOT NULL,
    agendamento_id BIGINT NOT NULL,

    data_atendimento DATETIME2 NOT NULL,

    queixa_principal TEXT,
    historia_clinica TEXT,
    exame_fisico TEXT,
    diagnostico TEXT,
    conduta TEXT,
    observacoes TEXT,

    CONSTRAINT fk_prontuario_paciente
        FOREIGN KEY (paciente_id)
        REFERENCES paciente(id),

    CONSTRAINT fk_prontuario_medico
        FOREIGN KEY (medico_id)
        REFERENCES funcionario(id),

    CONSTRAINT fk_prontuario_agendamento
        FOREIGN KEY (agendamento_id)
        REFERENCES agendamento(id),

    CONSTRAINT uq_prontuario_agendamento UNIQUE (agendamento_id)
);