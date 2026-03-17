-- Adiciona constraint para validar os valores permitidos
ALTER TABLE funcionario
ADD CONSTRAINT CK_funcionario_tipoFuncionario
CHECK (tipoFuncionario IN ('MEDICO', 'RECEPCAO'));