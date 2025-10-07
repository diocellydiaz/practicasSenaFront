# syntax=docker/dockerfile:1.6

# ===== build =====
FROM node:20-alpine AS build
WORKDIR /app

# usa lockfile para caché
COPY package*.json ./

# OPCIÓN A: cache de npm en /root/.npm (seguro)
ENV NPM_CONFIG_CACHE=/root/.npm
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build -- --configuration=production

# ===== run =====
FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/dist/proyecto-sena-front/ ./dist/
ENV PORT=8080
EXPOSE 8080
CMD ["serve","-s","dist","-l","8080"]
