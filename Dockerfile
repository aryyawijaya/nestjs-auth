# Builder stage
FROM node:16.19.0-alpine3.16 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Runner stage
FROM alpine:3.16
WORKDIR /app
RUN wget https://github.com/eficode/wait-for/releases/download/v2.2.4/wait-for &&\
    mv wait-for wait-for.sh &&\
    chmod +x wait-for.sh
COPY --from=builder /app/dist .
COPY .env .
COPY start.sh .
COPY prisma ./prisma

EXPOSE 3000
CMD [ "node", "/app/dist/main.js" ]
ENTRYPOINT [ "/app/start.sh" ]
