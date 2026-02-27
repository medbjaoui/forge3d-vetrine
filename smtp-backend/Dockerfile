# ══════════════════════════════════════════════════════════════════════════════
# FORGE3D BACKEND - Dockerfile
# ══════════════════════════════════════════════════════════════════════════════

FROM node:20-alpine

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install --production

# Copier le code source
COPY server.js ./

# Exposer le port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer le serveur
CMD ["node", "server.js"]
