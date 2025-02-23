# Use Node.js to build Angular
FROM node:18 AS frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build --prod

# Use Python for FastAPI backend
FROM python:3.10

WORKDIR /app

# Copy backend code
COPY . /app

# Copy Angular build files into FastAPI (only in production)
COPY --from=frontend-build /frontend/dist/frontend /app/frontend/dist/frontend

# Install FastAPI dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set production environment variable
ENV ENV=production

# Expose port 8000
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]