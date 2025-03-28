FROM  node:20-alphine3.20

WORKDIR /app

COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 5173

CMD ["npm","start","dev"]