-- =========================
-- ALTER TABLE PRONTUARIO - Adicionar suporte a MongoDB para textos
-- =========================

ALTER TABLE prontuario
ADD prontuario_texto_id VARCHAR(255) NULL;
