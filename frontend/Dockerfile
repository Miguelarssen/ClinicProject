# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências
RUN npm install -g pnpm && pnpm install 

# Copiar código-fonte
COPY . .

# Build da aplicação
RUN pnpm build

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar package.json
COPY package.json pnpm-lock.yaml* ./

# Instalar apenas dependências de produção
RUN pnpm install --prod

# Copiar arquivos compilados do stage anterior
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 3000

# Variável de ambiente padrão
ENV NODE_ENV=production
ENV VITE_API_URL=http://localhost:8080

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
