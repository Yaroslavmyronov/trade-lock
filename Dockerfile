FROM node:lts AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:lts-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 4000

CMD ["npm", "start"]

