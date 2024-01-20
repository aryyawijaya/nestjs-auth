compose-up:
	docker compose up -d

compose-down:
	docker compose down

logs-api:
	docker logs -f nestjs_auth_api

delete-image:
	docker rmi nestjs-auth-api

.PHONY:
	compose-up \
	compose-down \
	logs-api \