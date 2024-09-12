FROM node:18-alpine as builder

WORKDIR /app

ARG REACT_APP_HOST

ENV REACT_APP_HOST $REACT_APP_HOST

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.19.0-alpine

COPY --from=builder /app/build/ /usr/share/nginx/html