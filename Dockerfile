FROM denoland/deno:latest

# Create working directory
WORKDIR /app

# Copy source
COPY . .

# Compile the main app
RUN deno install --allow-scripts

# Run the app
# CMD ["deno", "task", "dev"]
