# Use Node.js to build Angular
FROM node:latest

WORKDIR /app

# Copy only the package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set API base dynamically before building
ARG API_BASE_URL=http://localhost:8000
RUN sed -i "s|apiBaseUrl: ''|apiBaseUrl: '$API_BASE_URL'|" src/environments/environment.prod.ts

# Build the app
RUN npm run build

# Expose port 4200
EXPOSE 4200

# Start the app
CMD ["npm", "start", "--", "--host", "0.0.0.0"]