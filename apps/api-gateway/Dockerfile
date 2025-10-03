FROM node:22-alpine AS base


# Prune package.json to only need packages
FROM base AS builder
WORKDIR /app
COPY . .
RUN npx turbo prune api-gateway --docker


# Run development script
FROM base AS development
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN npm ci
COPY --from=builder /app/out/full/ .
EXPOSE $PORT
CMD npm run dev:api


# Build project
FROM development AS installer
RUN npm run build:api


# Start build server
FROM base AS production
WORKDIR /app
COPY --from=installer /app/apps/api-gateway/dist .
EXPOSE $PORT
CMD node dist/main
