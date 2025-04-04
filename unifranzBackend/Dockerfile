FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Puerto del backend (ejemplo: 3000)
EXPOSE 3000

CMD ["npm", "start"]