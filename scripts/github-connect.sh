#!/bin/bash
# Script para conectar ao GitHub Remoto
# Execute após criar o repositório no GitHub

echo "Conectando ao GitHub..."

# Substitua pelo seu usuário GitHub
GITHUB_USER="seu-usuario"

# Adicionar remote
git remote add origin https://github.com/${GITHUB_USER}/educacao-fisica.git

#推送 branches
echo "Enviando branches para o GitHub..."
git push -u origin main
git push -u origin develop

echo ""
echo "✅ Conectado ao GitHub!"
echo "Próximos passos:"
echo "  1. Configure proteção da branch main no GitHub"
echo "  2. Adicione colaboradores em Settings > Collaborators"