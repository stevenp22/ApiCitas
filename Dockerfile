# Etapa 1: desarrollo
FROM node:23-slim AS dev
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
EXPOSE 3000
CMD ["npm", "run", "api"]

# Etapa 2: producción
FROM node:23-slim AS prod
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000
CMD ["node", "api.js"]
