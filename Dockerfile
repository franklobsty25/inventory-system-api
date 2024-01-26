FROM node:18-alpine

WORKDIR /inventory

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=${PORT}
ENV SECRET=${SECRET}
ENV MONGODB_URL=${MONGOD_URL}

EXPOSE 5001

CMD npm start