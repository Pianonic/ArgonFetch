# Use Python for FastAPI backend
FROM python:3.10

WORKDIR /app

# Copy requirements first for better caching
COPY ArgonFetch.Backend/requirements.txt .

# Install FastAPI dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install FFmpeg and other dependencies
RUN apt-get update && apt-get install -y ffmpeg

# Copy backend code
COPY ArgonFetch.Backend/ .

# Set production environment variable
ENV ENV=production

# Expose port 8000
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]