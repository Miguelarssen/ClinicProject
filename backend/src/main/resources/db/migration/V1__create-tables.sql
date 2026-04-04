-- =========================
-- TABELA PESSOA
-- =========================
CREATE TABLE pessoa (
    id BIGINT IDENTITY(1,1) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    nascimento DATE NOT NULL,
    email VARCHAR(255) NOT NULL,

    CONSTRAINT PK_pessoa PRIMARY KEY (id),
    CONSTRAINT UQ_pessoa_cpf UNIQUE (cpf),
    CONSTRAINT UQ_pessoa_email UNIQUE (email)
);

-- =========================
-- TABELA FUNCIONARIO
-- =========================
CREATE TABLE funcionario (
    id BIGINT NOT NULL,
    tipo_funcionario VARCHAR(20) NOT NULL DEFAULT 'RECEPCIONISTA',


    CONSTRAINT PK_funcionario PRIMARY KEY (id),

    CONSTRAINT FK_funcionario_pessoa 
        FOREIGN KEY (id) REFERENCES pessoa(id)
        ON DELETE CASCADE,

    CONSTRAINT CK_funcionario_tipo_funcionario
        CHECK (tipo_funcionario IN ('ADMIN', 'MEDICO', 'RECEPCIONISTA'))


);

-- =========================
-- TABELA PACIENTE
-- =========================
CREATE TABLE paciente (
    id BIGINT NOT NULL,

    CONSTRAINT PK_paciente PRIMARY KEY (id),

    CONSTRAINT FK_paciente_pessoa 
        FOREIGN KEY (id) REFERENCES pessoa(id)
        ON DELETE CASCADE
);

-- =========================
-- TABELA USUARIO
-- =========================
CREATE TABLE usuario (
    id BIGINT IDENTITY(1,1) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    funcionario_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL,

    CONSTRAINT PK_usuario PRIMARY KEY (id),

    CONSTRAINT FK_usuario_funcionario
        FOREIGN KEY (funcionario_id)
        REFERENCES funcionario(id),

    CONSTRAINT UQ_usuario_funcionario UNIQUE (funcionario_id),
    
    CONSTRAINT CK_usuario_role
        CHECK (role IN ('ADMIN', 'MEDICO', 'RECEPCIONISTA'))


);

-- =========================
-- TABELA AGENDAMENTO
-- =========================
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

-- =========================
-- TABELA PRONTUARIO
-- =========================
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

    prontuario_texto_id VARCHAR(255),

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