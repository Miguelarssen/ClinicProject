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

    CONSTRAINT PK_funcionario PRIMARY KEY (id),
    CONSTRAINT FK_funcionario_pessoa 
        FOREIGN KEY (id) REFERENCES pessoa(id)
        ON DELETE CASCADE
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