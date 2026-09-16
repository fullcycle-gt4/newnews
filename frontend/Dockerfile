# --- Stage 1: Build ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Production Server ---
FROM caddy:alpine AS production

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /app/dist

EXPOSE 8080