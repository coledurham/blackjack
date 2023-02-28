SHELL := bash

.PHONY: help

build-base: Dockerfile.build
	@docker build -t blackjack:base -f Dockerfile.build .

build-local: Dockerfile.build Dockerfile.local
	@docker build -t blackjack:local -f Dockerfile.local .

build-local-full:
	@docker context use default 
	@make build-base build-local start-local run-webpack

start-local:
	@docker-compose -f docker-compose-local.yml up -d

run-webpack:
	@docker exec -d $$(docker ps -aq --filter "label=project=blackjack") npm run webpack

remove-dangling:
	@# note: the double dollar-sign is required because Make substitues $variables
	@docker rmi $$(docker images -q --filter dangling=true)

down: docker-compose-local.yml
	@docker-compose -f docker-compose-local.yml down --remove-orphans  && docker volume rm blackjack_blackjack

down-local-full: docker-compose-local.yml
	@make down
	@docker rmi -f $$(docker images --filter "label=project=blackjack" -aq)

help:
	@echo "build-base           Build the base image used by prod and local."
	@echo "build-local          Build the local image for running blackjack app locally."
	@echo "build-local-full     Build and run local in full; including base images."
	@echo "start-local          Start the local instance and run it."
	@echo "remove-dangling      Remove dangling images."
	@echo "down                 Docker down and remove blackjack volume."
	@echo "down-local-full      Docker down and remove blackjack volume and all images including base."
	@echo "run-webpack          Run webpack in container."
