# Stage 1: Install dependencies
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY prisma ./prisma
RUN npx prisma generate

# Stage 2: Build
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_PORT=3000

# Copy Nitro output
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules/.prisma ./.output/server/node_modules/.prisma
COPY --from=deps /app/node_modules/@prisma ./.output/server/node_modules/@prisma
COPY --from=deps /app/node_modules/prisma ./.output/server/node_modules/prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --skip-generate && node .output/server/index.mjs"]
