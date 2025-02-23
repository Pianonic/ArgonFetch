# Use Node.js to build Angular
FROM node:18 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Set API base dynamically before building
ARG API_BASE_URL=http://localhost:8000
RUN sed -i "s|apiBaseUrl: ''|apiBaseUrl: '$API_BASE_URL'|" src/environments/environment.prod.ts

RUN npm run build --prod