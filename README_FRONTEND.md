# EuroHealth 360 — frontend Django

Implementação do frontend do protótipo EuroHealth 360 para o repositório `softhub-unieuro/educacao-fisica`.

## Decisão de arquitetura

O repositório principal usa Python 3.12 + Django 5 + Django REST Framework. Por isso, este frontend foi implementado como **app Django server-rendered** (`backend/frontend`) com HTML/CSS e JavaScript vanilla apenas para interação de interface. Não há Node, npm, React ou build step adicional.

A estrutura atual do backend ainda expõe apenas Aluno, Professor, Modalidade e Turmas. Os fluxos mais novos do protótipo (Super Anamnese, Semáforo de Saúde, prescrição/aprovação de treino, feedback pós-treino) usam dados de demonstração no `frontend/views.py` e estado local no navegador até os respectivos modelos/endpoints existirem.

## Telas incluídas

- seleção de perfil;
- login e cadastro;
- beneficiário: resumo e execução do treino;
- coordenador: métricas, gráficos, usuários e feedbacks;
- professor: fila de aprovação, Semáforo de Saúde e avaliação de estagiários;
- estagiário: beneficiários, Semáforo e montagem de treino;
- Super Anamnese em 5 etapas.

## Design

A base visual preserva o protótipo, mas usa azul institucional, branco e cinzas como identidade principal; amarelo fica restrito a estados semânticos de atenção, junto de verde e vermelho. Foram reduzidos elementos com aparência de template/demo, padronizados espaçamentos, tipografia, bordas, responsividade e hierarquia de dashboards.

Tokens principais estão em `backend/frontend/static/frontend/css/app.css`.

## Integração no repositório

### Opção segura

1. Copie apenas o app novo:

```bash
cp -R backend/frontend /caminho/para/educacao-fisica/backend/frontend
```

2. Em `backend/core/settings.py`, adicione `frontend` em `INSTALLED_APPS`:

```python
# Local apps
'api',
'frontend',
```

3. Em `backend/core/urls.py`, adicione:

```python
path('', include('frontend.urls')),
```

4. Rode o projeto como já previsto pelo repositório:

```bash
cd backend
python manage.py runserver
```

A rota `/` passa a abrir o seletor de perfis.

### Snapshot pronto

A pasta `backend/core/` deste pacote contém `settings.py` e `urls.py` iguais à versão de `main` inspecionada em 06/10/2026, com somente essas integrações adicionadas. Use-os apenas se o seu checkout ainda estiver compatível com essa revisão; caso contrário, faça as duas alterações manuais acima.

## Rotas

| Rota | Tela |
|---|---|
| `/` | Seleção de perfil |
| `/login/` | Login |
| `/cadastro/` | Cadastro |
| `/demo/coordenador/` | Dashboard do coordenador |
| `/demo/professor/` | Dashboard do professor |
| `/demo/estagiario/` | Montagem de treino |
| `/demo/beneficiario/` | Resumo do beneficiário |
| `/demo/beneficiario/treino/` | Execução do treino |
| `/anamnese/1/` … `/anamnese/5/` | Super Anamnese |

## QA executado

- `python -m py_compile` em todos os módulos Python do app e nos snapshots de `core`;
- `node --check` em `app.js`;
- renderização estática de quatro superfícies representativas com Chromium/Playwright, nos tamanhos próximos às referências fornecidas:
  - login: 2048×1160;
  - coordenador: 1358×1420;
  - treino mobile: 602×1402;
  - anamnese: 1028×958;
- sem erros JavaScript no console durante esses previews;
- screenshots em `qa/screenshots/`.

Não foi possível executar `manage.py runserver` neste ambiente porque o pacote Django não está instalado localmente e a instalação externa está bloqueada por rede. A validação visual foi feita por um harness estático usando exatamente o CSS/JS da implementação.

## Próximo passo técnico

Antes de ligar as telas a dados reais, o backend precisa definir contratos/endpoints para: autenticação/perfis, anamnese, semáforo multidisciplinar, treino/exercícios/séries, aprovação do professor, check-in e feedback pós-treino. O frontend já separa esses fluxos para facilitar essa integração.

## Refinamento visual UniEuro (06/10/2026)

- Identidade UniEuro adicionada aos headers, autenticação, cadastro e Super Anamnese.
- Símbolo institucional recortado do logo UniEuro fornecido e acompanhado pelo wordmark `UNIEURO` integralmente em azul.
- Paleta simplificada: azul institucional + branco/cinzas como base; amarelo fica apenas em estados semânticos de atenção.
- Botões principais migrados para azul para reduzir poluição visual.
- Gradientes e sombras reduzidos para um aspecto mais institucional e menos “template/AI”.
- Telas de treino mantêm linguagem de app de exercício: hierarquia forte, métricas legíveis e controles grandes para toque.
- Responsividade revisada em 1440 px, 1200 px e 390 px. A tabela de usuários vira uma lista legível em telas pequenas, sem overflow horizontal.

### Logo

O lockup é implementado no partial `backend/frontend/templates/frontend/partials/unieuro_logo.html` e usa `static/frontend/img/unieuro-emblem-clean.png`, recortado diretamente do emblema azul do logo fornecido, sem louros ou fundo. Se a equipe disponibilizar o SVG oficial, basta substituir esse asset mantendo o mesmo partial.
