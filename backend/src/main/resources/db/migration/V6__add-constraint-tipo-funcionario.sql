-- Adiciona constraint para validar os valores permitidos
ALTER TABLE funcionario
ADD CONSTRAINT CK_funcionario_tipo_funcionario
CHECK (tipo_funcionario IN ('MEDICO', 'RECEPCAO'));