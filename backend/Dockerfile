FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

# CMD ["npm", "run", "dev"] #when using docker compose
CMD ["node", "./bin/www"]  
