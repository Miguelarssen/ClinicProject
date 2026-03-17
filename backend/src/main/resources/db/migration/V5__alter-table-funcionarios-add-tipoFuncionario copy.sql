-- Adiciona coluna tipoFuncionario à tabela funcionario
ALTER TABLE funcionario
ADD tipoFuncionario VARCHAR(20) NOT NULL DEFAULT 'RECEPCAO';

