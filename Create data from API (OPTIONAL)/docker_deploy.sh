#!/bin/bash

echo "Starting CI/CD Process..."

echo "Stopping and removing old Docker containers..."
docker-compose down

echo "Building Docker images..."
docker-compose build

echo "Starting Docker containers..."
docker-compose up -d

echo "CI/CD Process Complete."
