
FROM node:20.17.0-alpine AS base

WORKDIR /app

COPY ./package*.json .

RUN npm install
