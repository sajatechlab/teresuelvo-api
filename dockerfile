FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and built files
COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig*.json ./

# Install production dependencies and tsconfig-paths
RUN npm install --only=production && \
    npm install tsconfig-paths

    # Create a script to run migrations and start the app
RUN echo '#!/bin/sh\n\
npm run migration:run\n\
npm run start:prod' > /app/start.sh && \
chmod +x /app/start.sh

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]