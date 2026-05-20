.PHONY: help install migrate test run clean docker-up docker-down

help:
	@echo "Educação Física - Comandos Disponíveis"
	@echo "======================================="
	@echo "make install    - Instalar dependências"
	@echo "make migrate   - Executar migrações"
	@echo "make test      - Executar testes"
	@echo "make run       - Executar servidor dev"
	@echo "make clean     - Limpar arquivos temporários"
	@echo "make docker-up - Iniciar containers Docker"
	@echo "make docker-down - Parar containers Docker"

install:
	pip install -r requirements/dev.txt

migrate:
	cd backend && python manage.py migrate

test:
	cd backend && pytest

run:
	cd backend && python manage.py runserver

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	rm -rf .pytest_cache
	rm -rf htmlcov
	rm -rf .coverage

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down