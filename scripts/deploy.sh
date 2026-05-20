#!/bin/bash
# Script de deploy - Educação Física

set -e

echo "🚀 Deploy em produção..."

# Build Docker
echo "📦 Construindo imagem Docker..."
docker build -t educacao-fisica:prod .

# Parar container antigo (se existir)
echo "🛑 Parando container antigo..."
docker stop educacao-fisica-prod 2>/dev/null || true
docker rm educacao-fisica-prod 2>/dev/null || true

# Executar novo container
echo "▶️ Iniciando novo container..."
docker run -d \
    --name educacao-fisica-prod \
    -p 8000:8000 \
    --env-file .env \
    educacao-fisica:prod

echo "✅ Deploy concluído!"
echo "Aplicação rodando em: http://localhost:8000"