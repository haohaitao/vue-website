FROM node:18.20.3-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

WORKDIR /app

FROM base AS dependencies

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM node:18.20.3-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

RUN addgroup -S -g 10001 nuxt \
    && adduser -S -D -H -u 10001 -G nuxt nuxt

COPY --from=builder --chown=10001:10001 /app/.output ./.output

USER 10001:10001

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
