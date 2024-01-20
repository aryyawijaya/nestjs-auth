# Builder stage
FROM node:16.19.0-alpine3.16 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Runner stage
FROM node:16.19.0-alpine3.16 AS runner
WORKDIR /app
RUN wget https://github.com/eficode/wait-for/releases/download/v2.2.4/wait-for &&\
    mv wait-for wait-for.sh &&\
    chmod +x wait-for.sh
COPY --from=builder /app/dist ./dist
COPY .env .
COPY start.sh .
COPY prisma ./prisma
# Prune development dependencies
COPY package*.json .
RUN npm install --omit=dev

EXPOSE 3000
CMD [ "node", "/app/dist/main.js" ]
ENTRYPOINT [ "/app/start.sh" ]
