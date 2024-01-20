compose-up:
	docker compose up -d

compose-down:
	docker compose down

logs-api:
	docker logs -f 

.PHONY:
	compose-up \
	compose-down \
	logs-api \