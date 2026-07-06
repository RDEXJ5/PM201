#!/bin/sh
set -e

echo "Esperando MySQL..."
until mysql -h db -uapi_user -p1234 coffee_manager -e "SELECT 1" >/dev/null 2>&1; do
  sleep 2
done

echo "Esperando tablas creadas por SQLAlchemy/FastAPI..."
until mysql -h db -uapi_user -p1234 coffee_manager -e "DESCRIBE usuarios" >/dev/null 2>&1; do
  sleep 2
done

echo "Insertando datos de prueba sin IDs manuales..."
mysql -h db -uapi_user -p1234 coffee_manager < /seed/seed_web_docker.sql

echo "Seed terminado."
