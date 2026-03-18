-- Adiciona coluna tipo_funcionario à tabela funcionario
ALTER TABLE funcionario
ADD tipo_funcionario VARCHAR(20) NOT NULL DEFAULT 'RECEPCAO';
