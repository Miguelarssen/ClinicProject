CREATE TABLE usuario (
    id BIGINT IDENTITY(1,1) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    funcionario_id BIGINT NOT NULL,

    CONSTRAINT PK_usuario PRIMARY KEY (id),

    CONSTRAINT FK_usuario_funcionario
        FOREIGN KEY (funcionario_id)
        REFERENCES funcionario(id),

    CONSTRAINT UQ_usuario_funcionario UNIQUE (funcionario_id)
);