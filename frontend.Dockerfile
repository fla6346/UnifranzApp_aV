FROM node:18-alpine

WORKDIR /app

# Instalar Expo CLI globalmente
RUN npm install -g expo-cli

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer los puertos utilizados por Expo
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Comando para iniciar el servidor Expo
CMD ["expo", "start", "--no-dev", "--minify", "--https", "--host", "0.0.0.0"]