# Stage 1: Build the application
FROM node:20.8.1-slim
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
RUN npm run build

# # Stage 2: Production image
# FROM node:20.8.1-bullseye

# WORKDIR /app

# # Copy built files from the previous stage
# COPY --from=build /app/ .
# # TODO: Need to optimizing the build

# Expose port
EXPOSE 3000
# Command to run the server
CMD ["npm", "run", "start"]
