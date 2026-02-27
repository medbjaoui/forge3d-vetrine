# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (cache-friendly layer)
COPY package*.json ./

# Install dependencies
RUN npm install --prefer-offline

# Copy all source files
COPY . .

# Build the production bundle
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
