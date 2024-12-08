# 1. Use a lightweight base image
FROM python:3.10-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the requirements file into the container
COPY requirements.txt .

# 4. Install required Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the app's source code into the container
COPY . .

# 6. Expose the port where the app runs
EXPOSE 8000

# 7. Command to start the application
CMD ["uvicorn", "generate_backend:app", "--host", "0.0.0.0", "--port", "8000"]
