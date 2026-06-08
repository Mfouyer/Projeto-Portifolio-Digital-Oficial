# build — gera o dist/ com o VITE_PB_URL embutido
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# VITE_PB_URL é injetado no build (Vite "assa" a URL no bundle).
# No Coolify, defina como Build Argument / Build-time env.
ARG VITE_PB_URL
ENV VITE_PB_URL=$VITE_PB_URL
RUN npm run build

# serve — nginx estático com SPA fallback (todas as rotas -> index.html)
FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
