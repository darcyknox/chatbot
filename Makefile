.PHONY: install dev docker-build

install:
    npm install

dev:
    npm run dev

docker-build:
    docker build -t chatbot:latest .