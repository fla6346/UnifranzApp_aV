FROM node:18-alpine

WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que se ejecuta el servidor Node.js
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["node", "server.js"]