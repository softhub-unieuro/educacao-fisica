#!/bin/bash
# Script de Setup - Educação Física
# Execute: bash scripts/setup.sh

set -e

echo "🚀 Configurando ambiente de desenvolvimento..."

# Cria ambiente virtual
echo "📦 Criando ambiente virtual..."
python3 -m venv venv

# Ativa ambiente virtual
source venv/bin/activate

# Instala dependências
echo "📥 Instalando dependências..."
pip install --upgrade pip
pip install -r requirements/dev.txt

# Copia arquivo .env
echo "⚙️ Configurando variáveis de ambiente..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Arquivo .env criado. Configure suas variáveis!"
fi

# Migrações
echo "🗄️ Executando migrações..."
cd backend
python manage.py migrate

echo ""
echo "✅ Setup concluído!"
echo ""
echo "Próximos passos:"
echo "  1. Ative o ambiente virtual: source venv/bin/activate"
echo "  2. Configure o .env com suas credenciais"
echo "  3. Execute: python manage.py runserver"
echo "  4. Acesse: http://localhost:8000/admin/"
echo ""
echo "Com Docker:"
echo "  docker-compose up -d"