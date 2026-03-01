FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install
RUN bunx prisma generate

COPY . .

FROM oven/bun:alpine AS runner
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 8000
CMD ["bun", "run", "start"]
