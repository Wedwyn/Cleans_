FROM node:18-slim

RUN apt-get update && apt-get install -yq \
  build-essential \
  python3

RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV PORT=3000
 
RUN mkdir dist && chmod 777 dist && mkdir -p dist/preview && chmod 777 dist/preview 
RUN mkdir -p dist/calendar && chmod 777 dist/calendar


CMD ["bash", "-c", "make db-migrate && npm start"]