# Educação Física - Sistema de Gestão

Sistema de gestão para programas de educação física escolar, permitindo o gerenciamento de alunos, professores, turmas e modalidades esportivas.

## 📋 Descrição

Plataforma completa para administração de atividades de educação física, oferecendo:
- Cadastro e gestão de alunos
- Cadastro e gestão de professores
- Gerenciamento de modalidades esportivas
- Criação e controle de turmas
- API REST completa

## 🛠️ Tecnologias

- **Backend:** Python 3.12 + Django 5.0
- **API:** Django REST Framework
- **Database:** PostgreSQL 15
- **Container:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Code Quality:** Black, Flake8, ISort

## 📦 Estrutura do Projeto

```
educacao-fisica/
├── backend/               # Código Django
│   ├── core/              # Projeto Django principal
│   └── api/               # App principal
├── frontend/              # Frontend (futuro)
├── database/              # Scripts de banco de dados
├── docs/                  # Documentação
├── infra/                 # Configurações de infraestrutura
├── scripts/               # Scripts utilitários
├── .github/
│   └── workflows/         # GitHub Actions
├── requirements/          # Dependências Python
├── media/                 # Arquivos de mídia
├── static/                # Arquivos estáticos
├── manage.py              # Script Django
├── docker-compose.yml     # Orquestração Docker
├── Dockerfile             # Imagem Docker
└── .env.example           # Exemplo de variáveis de ambiente
```

## 🚀 Instalação

### Pré-requisitos
- Python 3.12+
- PostgreSQL 15+ (ou Docker)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/educacao-fisica.git
cd educacao-fisica
```

### 2. Crie o ambiente virtual
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# ou
venv\Scripts\Activate     # Windows
```

### 3. Instale as dependências
```bash
pip install -r requirements/dev.txt
```

### 4. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 5. Execute as migrações
```bash
cd backend
python manage.py migrate
```

### 6. Crie um superusuário
```bash
python manage.py createsuperuser
```

### 7. Execute o servidor
```bash
python manage.py runserver
```

Acesse: http://localhost:8000/admin/

## 🐳 Executando com Docker

### Usando Docker Compose
```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f web

# Parar serviços
docker-compose down
```

### Construção manual
```bash
# Build da imagem
docker build -t educacao-fisica .

# Executar
docker run -p 8000:8000 educacao-fisica
```

## 🌿 Fluxo de Branches

```
main                    ← Versão estável em produção
├── develop             ← Integração contínua
│   ├── feature/*       ← Novas funcionalidades
│   ├── hotfix/*        ← Correções urgentes
│   └── release/*       ← Preparação de release
```

### Padrão de Commits

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `refactor:` - Refatoração de código
- `chore:` - Tarefas diversas

Exemplo:
```bash
git commit -m "feat: adicionar modelo de turmas"
git commit -m "fix: corrigir validação de CPF"
```

## 📝 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|------------|
| GET/POST | `/api/alunos/` | Listar/Criar alunos |
| GET/PUT/DELETE | `/api/alunos/{id}/` | Detalhar/Atualizar/Excluir |
| GET/POST | `/api/professores/` | Listar/Criar professores |
| GET/POST | `/api/modalidades/` | Listar/Criar modalidades |
| GET/POST | `/api/turmas/` | Listar/Criar turmas |

## 🧪 Executando Testes

```bash
# Executar todos os testes
pytest

# Com coverage
pytest --cov=. --cov-report=html

# Testar apenas um app
pytest api/
```

## 👥 Equipe e Permissões

### Adicionar Colaboradores
1. Acesse o repositório no GitHub
2. Settings → Collaborators
3. Adicione o email ou usuário

### Configurar Proteção de Branch
1. Settings → Branches
2. Add rule → main
3. Require pull request reviews
4. Require status checks to pass

## 📄 Licença

MIT License - sinta-se livre para usar e modificar.

---

Desenvolvido com ❤️ para a comunidade educacional.