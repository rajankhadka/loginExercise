FROM node:16-alpine3.11
RUN mkdir exercise

WORKDIR /exercise
COPY . .
RUN npm install
EXPOSE 5000
