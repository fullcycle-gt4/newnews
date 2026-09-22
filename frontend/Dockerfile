FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

# Inicia o Vite em modo desenvolvimento
# --host 0.0.0.0 permite acessar o projeto pelo localhost
# --port 8080 faz o Vite funcionar na porta 8080
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8080"]