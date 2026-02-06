# --- Estágio 1: Build ---
FROM node:20-alpine AS build

# No Alpine, algumas dependências de pacotes nativos (node-gyp) precisam de bibliotecas extras.
# Se o seu projeto não usa nada nativo, pode remover esta linha para ficar mais leve.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiamos os arquivos de dependências primeiro para aproveitar o cache das camadas do Docker.
COPY package*.json ./

# Usamos 'npm ci' em vez de 'npm install' para builds de CI/Docker. 
# Ele é mais rápido, estrito e garante que as versões sejam idênticas ao package-lock.json.
RUN npm ci

# Copiamos o código-fonte
COPY . .

# Geramos o build de produção
RUN npm run build

# --- Estágio 2: Produção ---
FROM node:20-alpine AS production

WORKDIR /app

# Criamos um usuário de sistema para não rodar o app como 'root' (Boa prática de segurança)
RUN addgroup -S nestjs && adduser -S nestjs -G nestjs

# Copiamos apenas o necessário do estágio de build
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Instalamos apenas as dependências de produção.
# Usamos 'npm ci' novamente com a flag omit=dev para garantir consistência.
RUN npm ci --omit=dev && npm cache clean --force

# Mudamos o proprietário dos arquivos para o usuário que criamos
USER nestjs

EXPOSE 3000

# Usamos node direto no arquivo compilado
CMD ["node", "dist/main"]